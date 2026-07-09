#!/usr/bin/env node
/**
 * Google Photos Picker → local repo sync.
 *
 * First run:  prompts for OAuth Client ID/Secret, opens a browser for one-
 *             time authorization, saves refresh_token to
 *             .google-photos-credentials.json (gitignored).
 * Every run:  creates a Picker session, opens the picker in a browser,
 *             waits for you to select photos, downloads them at the
 *             requested size (Google's CDN handles the resize — no HEIC
 *             conversion needed), saves them into public/photos/<dest>/,
 *             prints a paste-ready snippet for trips.ts.
 *
 * Usage:
 *   npm run photos:sync -- --dest travel --prefix nyc
 *   npm run photos:sync -- --dest travel/italy-2026 --prefix italy --size 2400
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import readline from 'node:readline/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const CREDS_PATH = path.join(PROJECT_ROOT, '.google-photos-credentials.json');
const PHOTOS_ROOT = path.join(PROJECT_ROOT, 'public', 'photos');
const SCOPE =
  'https://www.googleapis.com/auth/photospicker.mediaitems.readonly';
const LOOPBACK_PORT = 8765;
const LOOPBACK_URI = `http://127.0.0.1:${LOOPBACK_PORT}`;

// ---------- CLI args ----------
const args = process.argv.slice(2);
function arg(flag, fallback) {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : args[i + 1];
}
const dest = arg('--dest');
const prefix = arg('--prefix', 'photo');
const size = arg('--size', '2000');

if (!dest) {
  console.error(
    'Usage: npm run photos:sync -- --dest <subfolder> [--prefix <name>] [--size <px>]',
  );
  console.error('Example: npm run photos:sync -- --dest travel --prefix nyc');
  process.exit(1);
}

// ---------- Small helpers ----------
const base64url = (buf) =>
  buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
const sha256 = (str) => crypto.createHash('sha256').update(str).digest();

function openInBrowser(url) {
  const platform = process.platform;
  try {
    if (platform === 'darwin') {
      spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
    } else if (platform === 'win32') {
      spawn('cmd', ['/c', 'start', '""', url], {
        detached: true,
        stdio: 'ignore',
      }).unref();
    } else {
      spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
    }
  } catch {
    // ignore — the URL is always printed as fallback
  }
}

async function ask(rl, question) {
  return (await rl.question(question)).trim();
}

// ---------- First-run OAuth (PKCE loopback) ----------
async function initialSetup() {
  console.log('\nFirst-time setup — Google Photos credentials.\n');
  const rl = readline.createInterface({ input, output });
  const clientId = await ask(rl, 'Paste your OAuth Client ID: ');
  const clientSecret = await ask(rl, 'Paste your OAuth Client Secret: ');
  rl.close();

  if (!clientId || !clientSecret) {
    throw new Error('Client ID and Client Secret are both required.');
  }

  const verifier = base64url(crypto.randomBytes(32));
  const challenge = base64url(sha256(verifier));
  const state = base64url(crypto.randomBytes(16));

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', LOOPBACK_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPE);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  const codePromise = new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const reqUrl = new URL(req.url ?? '/', LOOPBACK_URI);
      const code = reqUrl.searchParams.get('code');
      const returnedState = reqUrl.searchParams.get('state');
      const error = reqUrl.searchParams.get('error');
      const html = (title, body) =>
        `<html><body style="font-family:-apple-system,Segoe UI,sans-serif;background:#0B0B10;color:#EAE8E1;text-align:center;padding:80px 20px"><h1 style="font-weight:300">${title}</h1><p style="color:#B9B6C3">${body}</p></body></html>`;
      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(html('Authorization failed', error));
        server.close();
        reject(new Error('OAuth error: ' + error));
        return;
      }
      if (returnedState !== state) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(html('State mismatch', 'This should not happen. Try again.'));
        server.close();
        reject(new Error('OAuth state mismatch'));
        return;
      }
      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(html('No code returned', 'Try again.'));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html('Authorization complete', 'You can close this tab.'));
      server.close();
      resolve(code);
    });
    server.on('error', reject);
    server.listen(LOOPBACK_PORT);
  });

  console.log('\nOpening browser for Google authorization...');
  console.log("If it doesn't open, visit this URL manually:");
  console.log('  ' + authUrl.toString() + '\n');
  openInBrowser(authUrl.toString());

  const code = await codePromise;
  console.log('Received authorization code. Exchanging for tokens...');

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      code_verifier: verifier,
      grant_type: 'authorization_code',
      redirect_uri: LOOPBACK_URI,
    }),
  });
  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${await tokenRes.text()}`);
  }
  const tokens = await tokenRes.json();
  if (!tokens.refresh_token) {
    throw new Error(
      'No refresh_token returned. Revoke this app at https://myaccount.google.com/permissions and try again.',
    );
  }
  const creds = {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: tokens.refresh_token,
  };
  fs.writeFileSync(CREDS_PATH, JSON.stringify(creds, null, 2));
  fs.chmodSync(CREDS_PATH, 0o600);
  console.log(
    `Credentials saved to ${path.relative(PROJECT_ROOT, CREDS_PATH)} (mode 600).\n`,
  );
  return creds;
}

async function loadCreds() {
  if (!fs.existsSync(CREDS_PATH)) return initialSetup();
  const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));
  if (!creds.client_id || !creds.client_secret || !creds.refresh_token) {
    return initialSetup();
  }
  return creds;
}

// ---------- Access token refresh ----------
async function refreshAccessToken(creds) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: creds.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) {
    throw new Error(`Access token refresh failed: ${await res.text()}`);
  }
  const json = await res.json();
  return json.access_token;
}

// ---------- Picker API ----------
async function createSession(token) {
  const res = await fetch('https://photospicker.googleapis.com/v1/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: '{}',
  });
  if (!res.ok) throw new Error(`Session create failed: ${await res.text()}`);
  return await res.json();
}

async function pollUntilSelected(sessionId, token, pollIntervalMs) {
  while (true) {
    await new Promise((r) => setTimeout(r, pollIntervalMs));
    const res = await fetch(
      `https://photospicker.googleapis.com/v1/sessions/${sessionId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!res.ok) throw new Error(`Session poll failed: ${await res.text()}`);
    const session = await res.json();
    if (session.mediaItemsSet) return session;
    process.stdout.write('.');
  }
}

async function listMediaItems(sessionId, token) {
  const items = [];
  let pageToken;
  do {
    const url = new URL('https://photospicker.googleapis.com/v1/mediaItems');
    url.searchParams.set('sessionId', sessionId);
    url.searchParams.set('pageSize', '100');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`mediaItems failed: ${await res.text()}`);
    const json = await res.json();
    for (const it of json.mediaItems ?? []) items.push(it);
    pageToken = json.nextPageToken;
  } while (pageToken);
  return items;
}

async function deleteSession(sessionId, token) {
  await fetch(
    `https://photospicker.googleapis.com/v1/sessions/${sessionId}`,
    { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } },
  ).catch(() => {});
}

async function downloadOne(item, destPath, sizePx) {
  const baseUrl = item.mediaFile?.baseUrl;
  if (!baseUrl) throw new Error(`No baseUrl on item ${item.id}`);
  const downloadUrl = `${baseUrl}=w${sizePx}-h${sizePx}`;
  const res = await fetch(downloadUrl);
  if (!res.ok) {
    throw new Error(`Download failed (${res.status}): ${downloadUrl}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
}

function parseGoogleDuration(str, fallbackMs) {
  if (!str) return fallbackMs;
  const m = String(str).match(/^([\d.]+)s$/);
  if (!m) return fallbackMs;
  return Math.max(500, Math.round(parseFloat(m[1]) * 1000));
}

// ---------- Main ----------
async function main() {
  const creds = await loadCreds();
  const token = await refreshAccessToken(creds);

  console.log('Creating Picker session...');
  const session = await createSession(token);

  console.log(
    '\nOpen this URL in the browser signed into the account whose photos you want:\n  ' +
      session.pickerUri +
      '\n',
  );
  openInBrowser(session.pickerUri);

  const pollIntervalMs = parseGoogleDuration(
    session.pollingConfig?.pollInterval,
    2000,
  );
  process.stdout.write('Waiting for you to select photos');
  await pollUntilSelected(session.id, token, pollIntervalMs);
  console.log('\n');

  const items = await listMediaItems(session.id, token);
  if (items.length === 0) {
    console.log('No items selected. Nothing to do.');
    await deleteSession(session.id, token);
    return;
  }

  console.log(`Selected ${items.length} item(s). Downloading...\n`);

  const destDir = path.join(PHOTOS_ROOT, dest);
  fs.mkdirSync(destDir, { recursive: true });

  // Continue numbering after any existing prefix-NN.* files in the folder
  const existing = fs.readdirSync(destDir);
  const numberRegex = new RegExp(
    '^' + prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-(\\d+)\\.',
  );
  let n = 1;
  for (const f of existing) {
    const m = f.match(numberRegex);
    if (m) n = Math.max(n, parseInt(m[1], 10) + 1);
  }

  const saved = [];
  for (const item of items) {
    if (item.type && item.type !== 'PHOTO') {
      console.log(`  → (skipping ${item.type})`);
      continue;
    }
    const num = String(n).padStart(2, '0');
    const mime = item.mediaFile?.mimeType ?? '';
    const ext = mime.includes('png') ? 'png' : 'jpg';
    const filename = `${prefix}-${num}.${ext}`;
    const destPath = path.join(destDir, filename);
    const origName = item.mediaFile?.filename ?? item.id;
    console.log(`  → ${filename}  (from ${origName})`);
    await downloadOne(item, destPath, size);
    saved.push({ filename, origName });
    n++;
  }

  await deleteSession(session.id, token);

  console.log(
    `\nDone. Saved ${saved.length} photo(s) to ${path.relative(
      PROJECT_ROOT,
      destDir,
    )}/\n`,
  );

  console.log("Snippet for trips.ts (paste into a trip's photos[] array):\n");
  for (const s of saved) {
    const rel = ('/photos/' + dest + '/' + s.filename)
      .replace(/\\/g, '/')
      .replace(/\/+/g, '/');
    console.log(`    { src: '${rel}', alt: '' },`);
  }
  console.log('');
}

main().catch((err) => {
  console.error('\nError:', err?.message ?? err);
  process.exit(1);
});
