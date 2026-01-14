import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { ExternalLink } from "lucide-react";

/**
 * MoviesPage (distinct from MusicPage)
 *
 * Key differences vs Music:
 * ✅ Dark, cinematic “poster wall” vibe (black background + film-grain overlay)
 * ✅ Poster cards in a responsive grid (not alternating left/right)
 * ✅ Each movie opens into an expandable review panel (accordion-ish)
 * ✅ Filters: Sort by Year / Rating, plus Genre filter
 * ✅ Review panel uses a “ticket stub” / “screening card” layout
 *
 * Font usage:
 * - Keep your existing font-heading for the page title
 * - Optionally use `font-display` for movie titles (works well with Anton too)
 */

type Movie = {
  id: string;
  title: string;
  director?: string;
  year: number;
  rating: number; // 0-10
  genres: string[];
  posterUrl: string;
  accentColor: string; // used for hover / panel accents
  review: string;
  link?: string; // imdb/letterboxd/trailer/etc
};

type SortKey = "year" | "rating";
type SortDir = "desc" | "asc";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function MoviesPage() {
  // --- Replace with your real movies ---
  const movies: Movie[] = [
    {
      id: "inception",
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      rating: 9.0,
      genres: ["Sci-Fi", "Thriller"],
      posterUrl:
        "https://m.media-amazon.com/images/I/91z3w4w0rKL._AC_SL1500_.jpg",
      accentColor: "#3B82F6",
      review:
        "A blockbuster that still rewards repeat watches. The structure is ambitious but readable, and the sound/score + practical effects keep it grounded even when the concept goes fully abstract.",
      link: "https://www.imdb.com/title/tt1375666/",
    },
    {
      id: "parasite",
      title: "Parasite",
      director: "Bong Joon-ho",
      year: 2019,
      rating: 9.4,
      genres: ["Drama", "Thriller"],
      posterUrl:
        "https://m.media-amazon.com/images/I/81q1Kp9gGmL._AC_SL1500_.jpg",
      accentColor: "#22C55E",
      review:
        "Sharp, funny, and ruthless. The tonal shifts are controlled with insane precision. Every scene either tightens the theme or escalates the tension—nothing wasted.",
      link: "https://www.imdb.com/title/tt6751668/",
    },
    {
      id: "spirited-away",
      title: "Spirited Away",
      director: "Hayao Miyazaki",
      year: 2001,
      rating: 9.3,
      genres: ["Animation", "Fantasy"],
      posterUrl:
        "https://m.media-amazon.com/images/I/71Y6p9G5QDL._AC_SL1200_.jpg",
      accentColor: "#F59E0B",
      review:
        "A complete world—strange, beautiful, and emotionally direct. It’s one of those movies where the imagination feels endless, but the character beats still land cleanly.",
      link: "https://www.imdb.com/title/tt0245429/",
    },
  ];

  // Filters
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [genre, setGenre] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(movies[0]?.id ?? null);

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach((m) => m.genres.forEach((g) => set.add(g)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [movies]);

  const filteredSorted = useMemo(() => {
    const list = movies.filter((m) => genre === "All" || m.genres.includes(genre));

    const sorted = [...list].sort((a, b) => {
      const av = sortKey === "year" ? a.year : a.rating;
      const bv = sortKey === "year" ? b.year : b.rating;
      const diff = av - bv;
      return sortDir === "asc" ? diff : -diff;
    });

    return sorted;
  }, [movies, genre, sortKey, sortDir]);

  const activeMovie = useMemo(
    () => filteredSorted.find((m) => m.id === openId) ?? filteredSorted[0] ?? null,
    [filteredSorted, openId]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Cinematic header */}
        <section className="relative w-full bg-black text-white">
          {/* subtle “film grain” overlay */}
          <div
            className="absolute inset-0 opacity-[0.10] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />
          <div className="relative w-full max-w-[120rem] mx-auto px-6 pt-14 pb-10 md:pt-18">
            <div className="max-w-6xl mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl">Movies</h1>
              <p className="mt-4 font-paragraph text-lg text-white/75 max-w-3xl">
                Reviews with a cinematic layout: posters, quick stats, and a focused write-up.
                Filter by genre, then sort by year or rating.
              </p>

              {/* Controls */}
              <div className="mt-8 flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-paragraph text-xs uppercase tracking-widest text-white/60">
                    Genre
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="h-12 px-4 border border-white/15 bg-black text-white font-paragraph"
                  >
                    {allGenres.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-paragraph text-xs uppercase tracking-widest text-white/60">
                    Sort by
                  </label>
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="h-12 px-4 border border-white/15 bg-black text-white font-paragraph"
                  >
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-paragraph text-xs uppercase tracking-widest text-white/60">
                    Direction
                  </label>
                  <select
                    value={sortDir}
                    onChange={(e) => setSortDir(e.target.value as SortDir)}
                    className="h-12 px-4 border border-white/15 bg-black text-white font-paragraph"
                  >
                    <option value="desc">
                      {sortKey === "rating" ? "Highest → Lowest" : "Newest → Oldest"}
                    </option>
                    <option value="asc">
                      {sortKey === "rating" ? "Lowest → Highest" : "Oldest → Newest"}
                    </option>
                  </select>
                </div>

                <div className="md:ml-auto font-paragraph text-sm text-white/60">
                  Showing <span className="text-white">{filteredSorted.length}</span> movies
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main layout: poster grid (left) + review panel (right) */}
        <section className="w-full bg-black text-white">
          <div className="w-full max-w-[120rem] mx-auto px-6 pb-16 md:pb-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Poster grid */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredSorted.map((m) => {
                    const isActive = m.id === activeMovie?.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setOpenId(m.id)}
                        className={cn(
                          "group text-left border transition-all",
                          isActive ? "border-white/40" : "border-white/10 hover:border-white/25"
                        )}
                        style={{
                          boxShadow: isActive ? `0 0 0 1px ${m.accentColor} inset` : undefined,
                        }}
                        aria-label={`Open review for ${m.title}`}
                      >
                        <div className="relative w-full aspect-[2/3] overflow-hidden bg-white/5">
                          <Image
                            src={m.posterUrl}
                            alt={`${m.title} poster`}
                            width={900}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(180deg, transparent, rgba(0,0,0,0.55))` }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="text-xs uppercase tracking-widest text-white/70">
                              {m.year} • {m.rating.toFixed(1)}/10
                            </div>
                            <div className="mt-1 font-display text-lg leading-tight uppercase tracking-tight">
                              {m.title}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review panel */}
              <div className="lg:col-span-5">
                {activeMovie ? (
                  <div
                    className="border border-white/12"
                    style={{
                      boxShadow: `0 0 0 1px ${activeMovie.accentColor} inset`,
                    }}
                  >
                    {/* Ticket-stub header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-white/60">
                            {activeMovie.year} • {activeMovie.rating.toFixed(1)}/10
                          </div>
                          <h2 className="mt-3 font-display text-4xl leading-[0.95] uppercase tracking-tight">
                            {activeMovie.title}
                          </h2>
                          <div className="mt-2 font-paragraph text-white/70">
                            {activeMovie.director ? `Dir. ${activeMovie.director}` : null}
                          </div>
                        </div>

                        {activeMovie.link ? (
                          <a
                            href={activeMovie.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-paragraph text-white/80 hover:text-white underline underline-offset-4"
                            aria-label="Open external page"
                          >
                            Open <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : null}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {activeMovie.genres.map((g) => (
                          <span
                            key={g}
                            className="text-xs font-medium uppercase tracking-wider px-3 py-1 border border-white/15 text-white/75"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Review body */}
                    <div className="p-6">
                      <div className="max-h-[360px] overflow-y-auto pr-3">
                        <p className="font-paragraph text-base md:text-lg leading-relaxed text-white/85">
                          {activeMovie.review}
                        </p>
                      </div>

                      {/* Accent bar */}
                      <div
                        className="mt-6 h-1 w-full"
                        style={{ backgroundColor: activeMovie.accentColor }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border border-white/10 p-6 text-white/70 font-paragraph">
                    No movies match your filter.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
