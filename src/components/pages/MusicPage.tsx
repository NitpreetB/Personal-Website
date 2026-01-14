import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { ExternalLink } from "lucide-react";

/**
 * MusicPage
 * - Alternating left/right sections (left aligned, then right, etc.)
 * - Each section background uses the album’s primary color
 * - Global filter controls: sort by Release Date or Rating (asc/desc)
 * - Optional per-album “View” link
 *
 * NOTE:
 *  - For “primary color of the album cover”, the most reliable approach is to store it
 *    with each album (hex). Auto-extraction from images is often blocked by CORS.
 */

type Album = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  primaryColor: string; // hex (e.g., "#4B2E83")
  releaseDate: string; // YYYY-MM-DD
  rating: number; // 0-10
  blurb: string; // one-liner
  review: string; // longer text
  link?: string; // optional external link
};

type SortKey = "releaseDate" | "rating";
type SortDir = "desc" | "asc";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Simple contrast heuristic (YIQ). Returns "text-white" or "text-black"
function textClassForBg(hex: string) {
  try {
    const { r, g, b } = hexToRgb(hex);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? "text-black" : "text-white";
  } catch {
    return "text-white";
  }
}

// Light border/overlay class to keep things readable
function subtleOverlayClass(hex: string) {
  const text = textClassForBg(hex);
  return text === "text-black" ? "bg-black/5" : "bg-white/10";
}

function formatDate(dateStr: string) {
  // Keep it simple + stable
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function MusicPage() {
  // --- Replace these with your real albums ---
  const albums: Album[] = [
    {
      id: "kaytranada-99-9",
      title: "99.9%",
      artist: "KAYTRANADA",
      coverUrl:
        "https://i.scdn.co/image/ab67616d0000b2731f0d2a2e4e8f6b0b47e5db3a", // swap if needed
      primaryColor: "#4B2E83", // purple vibe like your screenshot
      releaseDate: "2016-05-06",
      rating: 9.9,
      blurb: "Groove perfection — crisp drums, warm samples, instant replay.",
      review:
        "This album is very special to me. It was introduced to me by a friend who thought I would like Kaytranada and looking back, he could not have been more right. As a debut, it nails a signature sound—tight, side-chained four-on-the-floor energy—while still experimenting with texture, swing, and mood. Standouts hit hard, but the sequencing is what makes it feel effortless: you can let it run front-to-back and it just works.",
      link: "https://open.spotify.com/album/6JD4Qerb3vQy2zE4i1Z0H1",
    },
    {
      id: "album-2",
      title: "After Hours",
      artist: "The Weeknd",
      coverUrl: "https://i.scdn.co/image/ab67616d0000b2730a9c1c6e7d3d4f3cdb1d5b1d",
      primaryColor: "#B71C1C",
      releaseDate: "2020-03-20",
      rating: 8.6,
      blurb: "Cinematic pop with a dark glow — huge hooks, tight atmosphere.",
      review:
        "A polished, immersive listen with sharp songwriting and a consistent visual/sonic world. It’s one of those albums where the production does half the storytelling—glossy synths, dramatic transitions, and a mood that stays coherent without feeling flat.",
      link: "https://open.spotify.com/",
    },
    {
      id: "album-3",
      title: "Random Access Memories",
      artist: "Daft Punk",
      coverUrl: "https://i.scdn.co/image/ab67616d0000b273b9b6b63a9d6d1fda3e64d9b7",
      primaryColor: "#F9A825",
      releaseDate: "2013-05-17",
      rating: 9.1,
      blurb: "Analog luxury — immaculate arrangements and timeless bounce.",
      review:
        "A masterclass in restraint and craft. It’s playful, expensive-sounding, and intentionally paced. The best moments feel like a celebration of musicianship without losing the electronic DNA that makes it Daft Punk.",
      link: "https://open.spotify.com/",
    },
    {
      id: "album-4",
      title: "Channel Orange",
      artist: "Frank Ocean",
      coverUrl: "https://i.scdn.co/image/ab67616d0000b273e9d7f1d31e5e8e5a9e7f1b2c",
      primaryColor: "#FF6F00",
      releaseDate: "2012-07-10",
      rating: 9.4,
      blurb: "Storytelling with warmth — soulful, sharp, and endlessly replayable.",
      review:
        "It balances vulnerability and precision—every track feels intentional. The writing is vivid, the melodies stick, and the production supports the narrative without stealing the spotlight.",
      link: "https://open.spotify.com/",
    },
  ];

  // Global filters
  const [sortKey, setSortKey] = useState<SortKey>("releaseDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sortedAlbums = useMemo(() => {
    const copy = [...albums];
    copy.sort((a, b) => {
      let av = 0;
      let bv = 0;

      if (sortKey === "releaseDate") {
        av = new Date(a.releaseDate).getTime();
        bv = new Date(b.releaseDate).getTime();
      } else {
        av = a.rating;
        bv = b.rating;
      }

      const diff = av - bv;
      return sortDir === "asc" ? diff : -diff;
    });
    return copy;
  }, [albums, sortKey, sortDir]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Top header + filters */}
        <section className="w-full max-w-[120rem] mx-auto px-6 pt-14 pb-10 md:pt-20">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Music</h1>
            <p className="mt-4 font-paragraph text-lg text-foreground/70 max-w-3xl">
              Albums I keep coming back to. Sort by release date or rating and browse each review.
            </p>

            <div className="mt-10 flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-paragraph text-xs uppercase tracking-widest text-secondary">
                  Sort by
                </label>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="h-12 px-4 border border-light-gray bg-background text-foreground font-paragraph"
                >
                  <option value="releaseDate">Release Date</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-paragraph text-xs uppercase tracking-widest text-secondary">
                  Direction
                </label>
                <select
                  value={sortDir}
                  onChange={(e) => setSortDir(e.target.value as SortDir)}
                  className="h-12 px-4 border border-light-gray bg-background text-foreground font-paragraph"
                >
                  <option value="desc">
                    {sortKey === "rating" ? "Highest → Lowest" : "Newest → Oldest"}
                  </option>
                  <option value="asc">
                    {sortKey === "rating" ? "Lowest → Highest" : "Oldest → Newest"}
                  </option>
                </select>
              </div>

              <div className="md:ml-auto font-paragraph text-sm text-foreground/60">
                Showing <span className="text-foreground">{sortedAlbums.length}</span> albums
              </div>
            </div>
          </div>
        </section>

        {/* Album sections */}
        <section className="w-full">
          {sortedAlbums.map((album, idx) => {
            const isLeft = idx % 2 === 0;
            const textClass = textClassForBg(album.primaryColor);
            const overlay = subtleOverlayClass(album.primaryColor);

            return (
              <div
                key={album.id}
                className="w-full"
                style={{ backgroundColor: album.primaryColor }}
              >
                <div className="w-full max-w-[120rem] mx-auto px-6 py-14 md:py-20">
                  <div
                    className={[
                      "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start",
                      isLeft ? "" : "",
                    ].join(" ")}
                  >
                    {/* Cover */}
                    <div
                      className={[
                        "lg:col-span-5",
                        isLeft ? "lg:order-1" : "lg:order-2 lg:col-start-8",
                      ].join(" ")}
                    >
                      <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                          src={album.coverUrl}
                          alt={`${album.title} — ${album.artist} cover`}
                          width={1400}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${overlay}`} />
                      </div>
                    </div>

                    {/* Text */}
                    <div
                      className={[
                        "lg:col-span-7",
                        isLeft ? "lg:order-2" : "lg:order-1 lg:col-start-1",
                      ].join(" ")}
                    >
                      <div className={textClass}>
                        {/* Header */}
                        <div className="flex flex-col gap-3">
                          <div className="font-paragraph text-xs uppercase tracking-widest opacity-80">
                            {formatDate(album.releaseDate)} • {album.rating.toFixed(1)}/10
                          </div>

                          <h2 className="font-heading text-4xl md:text-6xl leading-[0.95] tracking-tight font-bold">
                            {album.title}
                          </h2>

                          <div className="flex items-center gap-3">
                            <p className="font-paragraph text-lg md:text-xl opacity-90">
                              {album.artist}
                            </p>

                            {album.link ? (
                              <a
                                href={album.link}
                                target="_blank"
                                rel="noreferrer"
                                className={[
                                  "inline-flex items-center gap-2 text-sm font-paragraph underline underline-offset-4 opacity-90",
                                  "hover:opacity-100 transition-opacity",
                                ].join(" ")}
                              >
                                Open <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : null}
                          </div>
                        </div>

                        {/* Blurb */}
                        <p className="mt-6 font-paragraph text-lg md:text-xl leading-relaxed opacity-95">
                          {album.blurb}
                        </p>

                        {/* Review box (scrollable like your screenshot) */}
                        <div
                          className={[
                            "mt-8 border",
                            textClass === "text-black" ? "border-black/15" : "border-white/20",
                            "backdrop-blur-sm",
                          ].join(" ")}
                        >
                          <div
                            className={[
                              "p-6 md:p-8",
                              textClass === "text-black" ? "bg-white/55" : "bg-black/15",
                            ].join(" ")}
                          >
                            <div className="max-h-[260px] md:max-h-[320px] overflow-y-auto pr-4">
                              <p
                                className={[
                                  "font-paragraph text-base md:text-lg leading-relaxed",
                                  textClass === "text-black" ? "text-black/80" : "text-white/90",
                                ].join(" ")}
                              >
                                {album.review}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Small meta row */}
                        <div className="mt-6 flex flex-wrap gap-3">
                          <span
                            className={[
                              "text-xs font-medium uppercase tracking-wider px-3 py-1 border",
                              textClass === "text-black"
                                ? "border-black/20 text-black/80"
                                : "border-white/25 text-white/90",
                            ].join(" ")}
                          >
                            Release: {formatDate(album.releaseDate)}
                          </span>
                          <span
                            className={[
                              "text-xs font-medium uppercase tracking-wider px-3 py-1 border",
                              textClass === "text-black"
                                ? "border-black/20 text-black/80"
                                : "border-white/25 text-white/90",
                            ].join(" ")}
                          >
                            Rating: {album.rating.toFixed(1)}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider line between sections (subtle) */}
                <div className="h-px w-full bg-black/10" />
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
