import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { ExternalLink } from "lucide-react";

type Movie = {
  id: string;
  title: string;
  director?: string;
  year: number;
  rating: number;
  genres: string[];
  posterUrl: string;
  accentColor: string;
  review: string;
  link?: string;
};

type SortKey = "year" | "rating";
type SortDir = "desc" | "asc";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function MoviesPage() {
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
        "A blockbuster that still rewards repeat watches. Ambitious structure, grounded execution.",
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
        "Sharp, funny, and ruthless. Every scene tightens the theme.",
      link: "https://www.imdb.com/title/tt6751668/",
    },
  ];

  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [genre, setGenre] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(movies[0]?.id ?? null);

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach((m) => m.genres.forEach((g) => set.add(g)));
    return ["All", ...Array.from(set)];
  }, [movies]);

  const filteredSorted = useMemo(() => {
    const list = movies.filter(
      (m) => genre === "All" || m.genres.includes(genre)
    );
    return [...list].sort((a, b) => {
      const av = sortKey === "year" ? a.year : a.rating;
      const bv = sortKey === "year" ? b.year : b.rating;
      return sortDir === "asc" ? av - bv : bv - av;
    });
  }, [movies, genre, sortKey, sortDir]);

  const activeMovie =
    filteredSorted.find((m) => m.id === openId) ?? filteredSorted[0];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="relative bg-neutral-950">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-12">
            <h1 className="font-heading text-5xl md:text-6xl">Movies</h1>
            <p className="mt-4 font-paragraph text-lg text-white/70 max-w-3xl">
              A small collection of films I return to. Sorted, filtered, and reviewed simply.
            </p>

            {/* Controls */}
            <div className="mt-8 flex flex-wrap gap-4">
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="h-11 px-4 bg-neutral-900 border border-white/15"
              >
                {allGenres.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>

              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="h-11 px-4 bg-neutral-900 border border-white/15"
              >
                <option value="rating">Rating</option>
                <option value="year">Year</option>
              </select>

              <select
                value={sortDir}
                onChange={(e) => setSortDir(e.target.value as SortDir)}
                className="h-11 px-4 bg-neutral-900 border border-white/15"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-neutral-950">
          <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Posters */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredSorted.map((m) => {
                const isActive = m.id === activeMovie?.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setOpenId(m.id)}
                    className={cn(
                      "border transition-all",
                      isActive
                        ? "border-white/40"
                        : "border-white/10 hover:border-white/25"
                    )}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900">
                      <Image
                        src={m.posterUrl}
                        alt={m.title}
                        width={900}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Review Panel */}
            <div className="lg:col-span-5">
              {activeMovie && (
                <div
                  className="bg-neutral-900 border border-white/10"
                  style={{
                    boxShadow: `0 0 0 1px ${activeMovie.accentColor} inset`,
                  }}
                >
                  <div className="p-6 border-b border-white/10">
                    <h2 className="font-display text-4xl uppercase">
                      {activeMovie.title}
                    </h2>
                    <p className="mt-2 text-white/70">
                      {activeMovie.year} • {activeMovie.rating.toFixed(1)}/10
                    </p>
                  </div>

                  <div className="p-6">
                    <p className="text-white/85 leading-relaxed">
                      {activeMovie.review}
                    </p>
                    <div
                      className="mt-6 h-1"
                      style={{ backgroundColor: activeMovie.accentColor }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
