import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { ExternalLink } from "lucide-react";


type Book = {
  id: string;
  title: string;
  author?: string;
  year: number; // publication year
  rating: number; // 0-10
  genres: string[];
  coverUrl: string;
  accentColor: string; // used for hover / panel accents
  review: string;
  link?: string; // goodreads/amazon/author page/etc
  format?: "Print" | "Ebook" | "Audiobook";
  status?: "Read" | "Reading" | "Want to Read";
};

type SortKey = "year" | "rating";
type SortDir = "desc" | "asc";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function BooksPage() {
  // --- Replace with your real books ---
  const books: Book[] = [
    {
      id: "ob",
      title: "Option B",
      author: "Sheryl Sandberg",
      year: 2017,
      rating: 1,
      genres: ["Nonfiction", "Self-Improvement"],
      coverUrl:
        "https://m.media-amazon.com/images/I/61Y9bGTj2mL._SL1500_.jpg",
      accentColor: "#10B981",
      format: "Print",
      status: "Reading",
      review:
        "Facing Adversity, Building Resilience, and Finding Joy",
      link: "https://www.goodreads.com/book/show/32938155-option-b?from_search=true&from_srp=true&qid=r4QpV3vuVK&rank=1",
    },
  ];

  // Filters
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [genre, setGenre] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(books[0]?.id ?? null);

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => b.genres.forEach((g) => set.add(g)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [books]);

  const allStatuses = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => b.status && set.add(b.status));
    return ["All", ...Array.from(set)];
  }, [books]);

  const filteredSorted = useMemo(() => {
    const list = books.filter((b) => {
      const genreOk = genre === "All" || b.genres.includes(genre);
      const statusOk = status === "All" || b.status === status;
      return genreOk && statusOk;
    });

    const sorted = [...list].sort((a, b) => {
      const av = sortKey === "year" ? a.year : a.rating;
      const bv = sortKey === "year" ? b.year : b.rating;
      const diff = av - bv;
      return sortDir === "asc" ? diff : -diff;
    });

    return sorted;
  }, [books, genre, status, sortKey, sortDir]);

  const activeBook = useMemo(
    () => filteredSorted.find((b) => b.id === openId) ?? filteredSorted[0] ?? null,
    [filteredSorted, openId]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Library header */}
        <section className="relative w-full bg-[#0B0F0E] text-white">
          {/* subtle paper texture */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />
          <div className="relative w-full max-w-[120rem] mx-auto px-6 pt-14 pb-10 md:pt-18">
            <div className="max-w-6xl mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl">Books</h1>
              <p className="mt-4 font-paragraph text-lg text-white/75 max-w-3xl">
                Personal bookshelf
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
                    className="h-12 px-4 border border-white/15 bg-[#0B0F0E] text-white font-paragraph"
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
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-12 px-4 border border-white/15 bg-[#0B0F0E] text-white font-paragraph"
                  >
                    {allStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
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
                    className="h-12 px-4 border border-white/15 bg-[#0B0F0E] text-white font-paragraph"
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
                    className="h-12 px-4 border border-white/15 bg-[#0B0F0E] text-white font-paragraph"
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
                  Showing{" "}
                  <span className="text-white">{filteredSorted.length}</span> books
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main layout: “shelf” grid (left) + reading card (right) */}
        <section className="w-full bg-[#0B0F0E] text-white">
          <div className="w-full max-w-[120rem] mx-auto px-6 pb-16 md:pb-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Shelf grid */}
              <div className="lg:col-span-7">
                {/* shelf line */}
                <div className="mb-4 h-px w-full bg-white/10" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredSorted.map((b) => {
                    const isActive = b.id === activeBook?.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => setOpenId(b.id)}
                        className={cn(
                          "group text-left border transition-all",
                          isActive ? "border-white/40" : "border-white/10 hover:border-white/25"
                        )}
                        style={{
                          boxShadow: isActive ? `0 0 0 1px ${b.accentColor} inset` : undefined,
                        }}
                        aria-label={`Open review for ${b.title}`}
                      >
                        <div className="relative w-full aspect-[2/3] overflow-hidden bg-white/5">
                          <Image
                            src={b.coverUrl}
                            alt={`${b.title} cover`}
                            width={900}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                "linear-gradient(180deg, transparent, rgba(0,0,0,0.60))",
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="text-xs uppercase tracking-widest text-white/70">
                              {b.year} • {b.rating.toFixed(1)}/10
                              {b.status ? ` • ${b.status}` : ""}
                            </div>
                            <div className="mt-1 font-display text-lg leading-tight tracking-tight">
                              {b.title}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 h-px w-full bg-white/10" />
              </div>

              {/* Reading card */}
              <div className="lg:col-span-5">
                {activeBook ? (
                  <div
                    className="border border-white/12 bg-black/20"
                    style={{ boxShadow: `0 0 0 1px ${activeBook.accentColor} inset` }}
                  >
                    {/* Bookplate header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-white/60">
                            {activeBook.year} • {activeBook.rating.toFixed(1)}/10
                            {activeBook.status ? ` • ${activeBook.status}` : ""}
                          </div>
                          <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight">
                            {activeBook.title}
                          </h2>
                          <div className="mt-2 font-paragraph text-white/70">
                            {activeBook.author ? `by ${activeBook.author}` : null}
                            {activeBook.format ? ` • ${activeBook.format}` : null}
                          </div>
                        </div>

                        {activeBook.link ? (
                          <a
                            href={activeBook.link}
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
                        {activeBook.genres.map((g) => (
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
                          {activeBook.review}
                        </p>
                      </div>

                      {/* Accent bar */}
                      <div
                        className="mt-6 h-1 w-full"
                        style={{ backgroundColor: activeBook.accentColor }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border border-white/10 p-6 text-white/70 font-paragraph">
                    No books match your filter.
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
