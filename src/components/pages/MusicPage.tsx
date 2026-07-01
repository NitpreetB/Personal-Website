import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Disc3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SegmentedControl from '@/components/SegmentedControl';

type Album = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  primaryColor: string;
  releaseDate: string; // YYYY-MM-DD
  rating: number; // 0-10
  review: string;
  link?: string;
};

type SortKey = 'releaseDate' | 'rating';
type SortDir = 'desc' | 'asc';

const albums: Album[] = [
  {
    id: 'after-hours',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl:
      'https://preview.redd.it/yn81w7k64vh41.jpg?width=1080&crop=smart&auto=webp&s=86eb7af0663416adb8d62ad7024fd21907c85fda',
    primaryColor: '#B71C1C',
    releaseDate: '2020-03-20',
    rating: 8.6,
    review: 'Review coming soon',
    link: 'https://open.spotify.com/',
  },
  {
    id: 'mns',
    title: 'Midnight Sun',
    artist: 'Zara Larsson',
    coverUrl:
      'https://shop.sonymusic.ca/cdn/shop/files/Zara_Larsson_Midnight_Sun_1500x1500_Cover.webp?v=1749065603&width=823',
    primaryColor: '#015290',
    releaseDate: '2025-09-25',
    rating: 7,
    review: 'Review coming soon.',
    link: 'https://open.spotify.com/',
  },
  {
    id: 'sctw',
    title: 'So Close To What',
    artist: 'Tate McRae',
    coverUrl:
      'https://m.media-amazon.com/images/I/81R1bBXjfZL._US972_BO54,255,255,255_FMjpg_QL100_.jpg',
    primaryColor: '#b89776',
    releaseDate: '2025-02-21',
    rating: 7.5,
    review: 'Review coming soon.',
    link: 'https://open.spotify.com/',
  },
  {
    id: 'p4',
    title: 'PARTYNEXTDOOR 4 (P4)',
    artist: 'PARTYNEXTDOOR',
    coverUrl:
      'https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F49fcbb2677486891d6b5a2f7e5f00f66.1000x1000x1.png',
    primaryColor: '#523d65',
    releaseDate: '2024-04-26',
    rating: 10,
    review: 'R&B classic',
    link: 'https://open.spotify.com/',
  },
  {
    id: 'sincerly',
    title: 'Sincerely,',
    artist: 'Kali Uchis',
    coverUrl:
      'https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F8642dc3f58c90b87c6d0a908cebaa723.1000x1000x1.png',
    primaryColor: '#b35a60',
    releaseDate: '2025-05-09',
    rating: 8.1,
    review: 'I really made the album that i needed to heal myself',
    link: 'https://open.spotify.com/',
  },
  {
    id: 'Hss',
    title: 'HEARTS SOLD SEPARATELY',
    artist: 'Mariah the Scientist',
    coverUrl:
      'https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F95d77506e0dbb7bb0c384174dd834ea8.1000x1000x1.png',
    primaryColor: '#cb8798',
    releaseDate: '2025-08-22',
    rating: 6.5,
    review: 'This is a warning: Your time is up',
    link: 'https://open.spotify.com/',
  },
  {
    id: 'TBWPTH',
    title: 'The Boy Who Played the Harp',
    artist: 'Dave',
    coverUrl:
      'https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F1587028290f87090ed228ed739522844.1000x1000x1.png',
    primaryColor: '#ada25f',
    releaseDate: '2025-10-24',
    rating: 7.5,
    review: "This is God's plan, he said it to me",
    link: 'https://open.spotify.com/',
  },
  {
    id: 'SD',
    title: 'Split Decision',
    artist: 'Dave & Central Cee',
    coverUrl:
      'https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2Fead251f5ac0af2956c25a6e935e0aaf3.1000x1000x1.png',
    primaryColor: '#ae2627',
    releaseDate: '2023-06-05',
    rating: 10,
    review: 'Forces from the UK',
    link: 'https://open.spotify.com/',
  },
];

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Spinning vinyl record that peeks out from behind the album cover. */
function Vinyl({ color, spinning }: { color: string; spinning: boolean }) {
  return (
    <motion.div
      aria-hidden
      animate={spinning ? { rotate: 360 } : undefined}
      transition={{ repeat: Infinity, ease: 'linear', duration: 6 }}
      className="absolute inset-[6%] rounded-full"
      style={{
        background:
          'repeating-radial-gradient(circle at 50% 50%, #0e0e13 0px, #0e0e13 2px, #1c1c24 3px, #0e0e13 5px)',
        boxShadow: '0 0 40px rgba(0,0,0,0.7)',
      }}
    >
      {/* label */}
      <div
        className="absolute inset-[36%] rounded-full border border-black/40"
        style={{ backgroundColor: color }}
      />
      <div className="absolute inset-[47%] rounded-full bg-background" />
      {/* light streak so the spin reads */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.07) 20deg, transparent 45deg, transparent 180deg, rgba(255,255,255,0.05) 200deg, transparent 225deg)',
        }}
      />
    </motion.div>
  );
}

function AlbumSection({ album, index }: { album: Album; index: number }) {
  const isLeft = index % 2 === 0;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      layout
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className="relative w-full overflow-hidden border-b border-light-gray"
    >
      {/* per-album color wash over the dark background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(60rem 30rem at ${isLeft ? '20%' : '80%'} 50%, ${album.primaryColor}2e, transparent 70%)`,
        }}
      />

      <div className="relative max-w-site mx-auto px-[5%] py-20 md:py-28">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
            isLeft ? '' : ''
          }`}
        >
          {/* Cover + vinyl */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-5 ${isLeft ? 'lg:order-1' : 'lg:order-2 lg:col-start-8'}`}
          >
            <div className="group relative">
              {/* vinyl slides out on hover */}
              <div
                className={`absolute top-0 bottom-0 aspect-square transition-transform duration-700 ease-out ${
                  isLeft
                    ? 'left-0 group-hover:translate-x-[38%] translate-x-[22%]'
                    : 'right-0 group-hover:-translate-x-[38%] -translate-x-[22%]'
                }`}
              >
                <Vinyl color={album.primaryColor} spinning={!prefersReducedMotion} />
              </div>

              <motion.div
                whileHover={{ scale: 1.02, rotate: isLeft ? -0.5 : 0.5 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`relative w-[82%] aspect-square overflow-hidden border border-light-gray ${
                  isLeft ? '' : 'ml-auto'
                }`}
                style={{ boxShadow: `0 24px 80px -24px ${album.primaryColor}66` }}
              >
                <img
                  src={album.coverUrl}
                  alt={`${album.title} — ${album.artist} cover`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 ${isLeft ? 'lg:order-2' : 'lg:order-1 lg:col-start-1'}`}
          >
            <p className="eyebrow mb-5" style={{ color: album.primaryColor }}>
              <Disc3 className="inline w-3.5 h-3.5 mr-2 -mt-0.5" />
              {formatDate(album.releaseDate)}
            </p>

            <h2 className="font-heading text-4xl md:text-6xl font-light leading-[1.02] text-foreground">
              {album.title}
            </h2>
            <p className="mt-3 font-heading italic text-2xl md:text-3xl text-dark-gray">
              {album.artist}
            </p>

            {/* Animated rating meter */}
            <div className="mt-8 flex items-center gap-5 max-w-md">
              <div className="flex-1 h-[3px] bg-light-gray overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: album.rating / 10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full origin-left"
                  style={{ backgroundColor: album.primaryColor }}
                />
              </div>
              <span className="font-heading italic text-2xl text-foreground shrink-0">
                {album.rating.toFixed(1)}
                <span className="text-secondary text-base not-italic font-paragraph"> /10</span>
              </span>
            </div>

            <p className="mt-8 font-paragraph text-lg leading-relaxed text-dark-gray max-w-xl border-l-2 pl-6" style={{ borderColor: `${album.primaryColor}99` }}>
              {album.review}
            </p>

            {album.link && (
              <a
                href={album.link}
                target="_blank"
                rel="noreferrer"
                className="group/link mt-10 inline-flex items-center gap-3 font-paragraph text-xs uppercase tracking-widestplus text-foreground border-b border-accent pb-2 hover:text-accent transition-colors duration-300"
              >
                Listen
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export default function MusicPage() {
  const [sortKey, setSortKey] = useState<SortKey>('releaseDate');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sortedAlbums = useMemo(() => {
    const copy = [...albums];
    copy.sort((a, b) => {
      const av =
        sortKey === 'releaseDate' ? new Date(a.releaseDate).getTime() : a.rating;
      const bv =
        sortKey === 'releaseDate' ? new Date(b.releaseDate).getTime() : b.rating;
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return copy;
  }, [sortKey, sortDir]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Title + controls */}
        <section className="w-full max-w-site mx-auto px-[5%] pt-40 md:pt-48 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-6">The Takes — on rotation</p>
            <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground">
              Now <em className="text-accent">spinning</em>
            </h1>
            <p className="mt-8 font-paragraph text-lg md:text-xl text-dark-gray leading-relaxed max-w-2xl">
              Albums rated without mercy and revisited over time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-6"
          >
            <SegmentedControl
              id="music-sort"
              label="Sort by"
              value={sortKey}
              onChange={setSortKey}
              options={[
                { value: 'releaseDate', label: 'Release' },
                { value: 'rating', label: 'Rating' },
              ]}
            />
            <SegmentedControl
              id="music-dir"
              label="Direction"
              value={sortDir}
              onChange={setSortDir}
              options={[
                { value: 'desc', label: sortKey === 'rating' ? 'High → Low' : 'New → Old' },
                { value: 'asc', label: sortKey === 'rating' ? 'Low → High' : 'Old → New' },
              ]}
            />
            <p className="ml-auto font-paragraph text-sm text-secondary">
              {sortedAlbums.length} albums on the shelf
            </p>
          </motion.div>
        </section>

        {/* Albums */}
        <section className="w-full border-t border-light-gray">
          {sortedAlbums.map((album, idx) => (
            <AlbumSection key={album.id} album={album} index={idx} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
