import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clapperboard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SegmentedControl from '@/components/SegmentedControl';

type Movie = {
  id: string;
  title: string;
  director?: string;
  year: number;
  rating: number; // 0-10
  genres: string[];
  posterUrl: string;
  accentColor: string;
  review: string;
  link?: string;
};

type SortKey = 'year' | 'rating';
type SortDir = 'desc' | 'asc';

const movies: Movie[] = [
  {
    id: 'inception',
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    rating: 9.0,
    genres: ['Sci-Fi', 'Thriller'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
    accentColor: '#3B82F6',
    review: 'Review coming soon.',
    link: 'https://www.imdb.com/title/tt1375666/',
  },
  {
    id: 'scarface',
    title: 'Scarface',
    director: 'Brian De Palma',
    year: 1983,
    rating: 8.3,
    genres: ['Crime', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/I/61luAu5kqTL._AC_UF894,1000_QL80_.jpg',
    accentColor: '#DC2626',
    review: 'Review coming soon.',
    link: 'https://www.imdb.com/title/tt0086250/',
  },
  {
    id: 'pulp-fiction',
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: 1994,
    rating: 9.0,
    genres: ['Crime', 'Drama'],
    posterUrl: 'https://m.media-amazon.com/images/I/71c05lTE03L._AC_SL1200_.jpg',
    accentColor: '#FACC15',
    review: 'Review coming soon.',
    link: 'https://www.imdb.com/title/tt0110912/',
  },
];

export default function MoviesPage() {
  const [sortKey, setSortKey] = useState<SortKey>('rating');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [genre, setGenre] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(movies[0]?.id ?? null);

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach((m) => m.genres.forEach((g) => set.add(g)));
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredSorted = useMemo(() => {
    const list = movies.filter((m) => genre === 'All' || m.genres.includes(genre));
    return [...list].sort((a, b) => {
      const av = sortKey === 'year' ? a.year : a.rating;
      const bv = sortKey === 'year' ? b.year : b.rating;
      return sortDir === 'asc' ? av - bv : bv - av;
    });
  }, [genre, sortKey, sortDir]);

  const activeMovie = useMemo(
    () => filteredSorted.find((m) => m.id === openId) ?? filteredSorted[0] ?? null,
    [filteredSorted, openId]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Cinematic backdrop: the active poster, blurred into the dark */}
        <AnimatePresence>
          {activeMovie && (
            <motion.div
              key={activeMovie.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 pointer-events-none"
            >
              <img
                src={activeMovie.posterUrl}
                alt=""
                aria-hidden
                className="w-full h-full object-cover blur-3xl scale-125 opacity-[0.14] saturate-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {/* Title + controls */}
          <section className="w-full max-w-site mx-auto px-[5%] pt-40 md:pt-48 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow mb-6">The Takes — late showings</p>
              <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground">
                The <em className="text-accent">screening</em> room
              </h1>
              <p className="mt-8 font-paragraph text-lg md:text-xl text-dark-gray leading-relaxed max-w-2xl">
                Films rated and revisited — the good, the bad, and the rewatched.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-6"
            >
              <SegmentedControl
                id="movies-genre"
                label="Genre"
                value={genre}
                onChange={setGenre}
                options={allGenres.map((g) => ({ value: g, label: g }))}
              />
              <SegmentedControl
                id="movies-sort"
                label="Sort by"
                value={sortKey}
                onChange={setSortKey}
                options={[
                  { value: 'rating', label: 'Rating' },
                  { value: 'year', label: 'Year' },
                ]}
              />
              <SegmentedControl
                id="movies-dir"
                label="Direction"
                value={sortDir}
                onChange={setSortDir}
                options={[
                  { value: 'desc', label: sortKey === 'rating' ? 'High → Low' : 'New → Old' },
                  { value: 'asc', label: sortKey === 'rating' ? 'Low → High' : 'Old → New' },
                ]}
              />
              <p className="ml-auto font-paragraph text-sm text-secondary">
                {filteredSorted.length} films on the marquee
              </p>
            </motion.div>
          </section>

          {/* Poster wall + review panel */}
          <section className="w-full max-w-site mx-auto px-[5%] pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Poster wall */}
              <div className="lg:col-span-7">
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {filteredSorted.map((m) => {
                      const isActive = m.id === activeMovie?.id;
                      return (
                        <motion.button
                          key={m.id}
                          layout
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          whileHover={{ y: -8, rotate: -0.75 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                          onClick={() => setOpenId(m.id)}
                          aria-label={`Open review for ${m.title}`}
                          className={`group relative text-left border transition-colors duration-300 ${
                            isActive ? 'border-transparent' : 'border-light-gray hover:border-secondary'
                          }`}
                          style={{
                            boxShadow: isActive
                              ? `0 0 0 1px ${m.accentColor}, 0 12px 50px -12px ${m.accentColor}66`
                              : '0 0 0 0 transparent',
                          }}
                        >
                          <div className="relative w-full aspect-[2/3] overflow-hidden bg-panel">
                            <img
                              src={m.posterUrl}
                              alt={`${m.title} poster`}
                              loading="lazy"
                              className={`w-full h-full object-cover transition-all duration-500 ${
                                isActive
                                  ? 'saturate-100'
                                  : 'saturate-[0.55] group-hover:saturate-100'
                              }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

                            {/* "now playing" badge */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.span
                                  initial={{ opacity: 0, y: -8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1 font-paragraph text-[0.6rem] uppercase tracking-widestplus text-background"
                                  style={{ backgroundColor: m.accentColor }}
                                >
                                  <Clapperboard className="w-3 h-3" />
                                  Now showing
                                </motion.span>
                              )}
                            </AnimatePresence>

                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="eyebrow !text-[0.6rem]">
                                {m.year} · {m.rating.toFixed(1)}/10
                              </div>
                              <div className="mt-1 font-heading text-xl leading-tight text-foreground">
                                {m.title}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Review panel */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <AnimatePresence mode="wait">
                  {activeMovie ? (
                    <motion.div
                      key={activeMovie.id}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative border border-light-gray bg-panel/80 backdrop-blur-md overflow-hidden"
                    >
                      {/* accent glow */}
                      <div
                        className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-25 pointer-events-none"
                        style={{
                          background: `radial-gradient(closest-side, ${activeMovie.accentColor}, transparent)`,
                        }}
                      />

                      <div className="relative p-8 border-b border-light-gray">
                        <p className="eyebrow mb-4">
                          {activeMovie.year}
                          {activeMovie.director ? ` · dir. ${activeMovie.director}` : ''}
                        </p>
                        <h2 className="font-heading text-4xl md:text-5xl font-light leading-[1.02] text-foreground">
                          {activeMovie.title}
                        </h2>

                        {/* Animated rating meter */}
                        <div className="mt-7 flex items-center gap-5">
                          <div className="flex-1 h-[3px] bg-light-gray overflow-hidden">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: activeMovie.rating / 10 }}
                              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full w-full origin-left"
                              style={{ backgroundColor: activeMovie.accentColor }}
                            />
                          </div>
                          <span className="font-heading italic text-2xl text-foreground shrink-0">
                            {activeMovie.rating.toFixed(1)}
                            <span className="text-secondary text-base not-italic font-paragraph"> /10</span>
                          </span>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {activeMovie.genres.map((g, i) => (
                            <motion.span
                              key={g}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + i * 0.07 }}
                              className="font-paragraph text-[0.65rem] uppercase tracking-widestplus text-secondary border border-light-gray px-3 py-1"
                            >
                              {g}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="relative p-8">
                        <p className="font-paragraph text-lg leading-relaxed text-dark-gray">
                          {activeMovie.review}
                        </p>

                        {activeMovie.link && (
                          <a
                            href={activeMovie.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group/link mt-8 inline-flex items-center gap-3 font-paragraph text-xs uppercase tracking-widestplus text-foreground border-b border-accent pb-2 hover:text-accent transition-colors duration-300"
                          >
                            Full credits
                            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-light-gray p-8 font-paragraph text-dark-gray"
                    >
                      No films match that filter.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
