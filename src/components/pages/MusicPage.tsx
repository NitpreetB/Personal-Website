import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";

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

type SortKey = "releaseDate" | "rating";
type SortDir = "desc" | "asc";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function textClassForBg(hex: string) {
  try {
    const { r, g, b } = hexToRgb(hex);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? "text-black" : "text-white";
  } catch {
    return "text-white";
  }
}

function subtleOverlayClass(hex: string) {
  return textClassForBg(hex) === "text-black" ? "bg-black/5" : "bg-white/10";
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d); // ✅ timezone-safe
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function MusicPage() {
  const albums: Album[] = [
    {
      id: "after-hours",
      title: "After Hours",
      artist: "The Weeknd",
      coverUrl:
        "https://preview.redd.it/yn81w7k64vh41.jpg?width=1080&crop=smart&auto=webp",
      primaryColor: "#B71C1C",
      releaseDate: "2020-03-20",
      rating: 8.6,
      review: "Review coming soon",
      link: "https://open.spotify.com/",
    },
    {
      id: "tbwpth",
      title: "The Boy Who Played the Harp",
      artist: "Dave",
      coverUrl:
        "https://t2.genius.com/unsafe/881x0/https%3A%2F%2Fimages.genius.com%2F1587028290f87090ed228ed739522844.1000x1000x1.png",
      primaryColor: "#ada25f",
      releaseDate: "2025-10-24",
      rating: 7.5,
      review: "This is God's plan, he said it to me",
      link: "https://open.spotify.com/",
    },
  ];

  const [sortKey, setSortKey] = useState<SortKey>("releaseDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sortedAlbums = useMemo(() => {
    const copy = [...albums];
    copy.sort((a, b) => {
      const av =
        sortKey === "releaseDate"
          ? new Date(a.releaseDate).getTime()
          : a.rating;
      const bv =
        sortKey === "releaseDate"
          ? new Date(b.releaseDate).getTime()
          : b.rating;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return copy;
  }, [albums, sortKey, sortDir]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="w-full max-w-[120rem] mx-auto px-6 pt-14 pb-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">
              Music
            </h1>
            <p className="mt-4 font-paragraph text-lg text-foreground/70">
              A curated collection of albums, rated and revisited over time.
            </p>
          </div>
        </section>

        {/* Albums */}
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
                <div className="max-w-[120rem] mx-auto px-6 py-12">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Cover */}
                    <div
                      className={`lg:col-span-5 ${
                        isLeft ? "lg:order-1" : "lg:order-2 lg:col-start-8"
                      }`}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={album.coverUrl}
                          alt={`${album.title} cover`}
                          width={1400}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${overlay}`} />
                      </div>
                    </div>

                    {/* Text */}
                    <div
                      className={`lg:col-span-7 ${
                        isLeft ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className={`${textClass} max-w-[90%]`}>
                        {/* Meta */}
                        <div className="flex gap-3 mb-6 text-xs uppercase tracking-wider">
                          <span>Release: {formatDate(album.releaseDate)}</span>
                          <span>Rating: {album.rating.toFixed(1)}/10</span>
                        </div>

                        {/* TITLE + ARTIST (ONE LINE TITLE) */}
                        <h2 className="font-display uppercase tracking-ultra">
                          <span
                            className="
                              block
                              whitespace-nowrap
                              overflow-hidden
                              text-ellipsis
                              leading-[0.95]
                              text-[clamp(2.25rem,5vw,4.5rem)]
                            "
                          >
                            {album.title}
                          </span>

                          <span
                            className="
                              block
                              mt-2
                              leading-tight
                              text-[clamp(1.25rem,3vw,2.25rem)]
                              opacity-90
                            "
                          >
                            {album.artist}
                          </span>
                        </h2>

                        {/* Review */}
                        <div className="mt-6 border border-black/10 bg-white/50 p-6">
                          <p className="font-paragraph text-base md:text-lg leading-relaxed">
                            {album.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/10 w-full" />
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
