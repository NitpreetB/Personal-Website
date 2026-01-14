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
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
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
  const text = textClassForBg(hex);
  return text === "text-black" ? "bg-black/5" : "bg-white/10";
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function MusicPage() {
  // --- Replace with your real albums ---
  const albums: Album[] = [
    {
      id: "after-hours",
      title: "After Hours",
      artist: "The Weeknd",
      coverUrl:
        "https://preview.redd.it/yn81w7k64vh41.jpg?width=1080&crop=smart&auto=webp&s=86eb7af0663416adb8d62ad7024fd21907c85fda",
      primaryColor: "#B71C1C",
      releaseDate: "2020-03-20",
      rating: 8.6,
      review:
        "A polished, immersive listen with sharp songwriting and a consistent visual/sonic world. It’s one of those albums where the production does half the storytelling—glossy synths, dramatic transitions, and a mood that stays coherent without feeling flat.",
      link: "https://open.spotify.com/",
    },
    {
      id: "mns",
      title: "Midnight Sun",
      artist: "Zara Larsson",
      coverUrl:
        "https://shop.sonymusic.ca/cdn/shop/files/Zara_Larsson_Midnight_Sun_1500x1500_Cover.webp?v=1749065603&width=823",
      primaryColor: "#dc8884",
      releaseDate: "2025-09-25",
      rating: 7.5,
      review:
        "This album is very special to me. It was introduced to me by a friend who thought I would like Kaytranada and looking back, he could not have been more right. As a debut, it nails a signature sound—tight, side-chained four-on-the-floor energy—while still experimenting with texture, swing, and mood. Standouts hit hard, but the sequencing is what makes it feel effortless: you can let it run front-to-back and it just works.",
      link: "https://open.spotify.com/",
    },
    {
      id: "sctw",
      title: "So Close To What",
      artist: "Tate McRae",
      coverUrl:
        "https://m.media-amazon.com/images/I/81R1bBXjfZL._US972_BO54,255,255,255_FMjpg_QL100_.jpg",
      primaryColor: "#b89776",
      releaseDate: "2025-02-21",
      rating: 8.5,
      review:
        "A masterclass in restraint and craft. It’s playful, expensive-sounding, and intentionally paced. The best moments feel like a celebration of musicianship without losing the electronic DNA that makes it Daft Punk.",
      link: "https://open.spotify.com/",
    },
  ];

  // --- Sort controls ---
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
        {/* Title + controls */}
        <section className="w-full max-w-[120rem] mx-auto px-6 pt-14 pb-10 md:pt-18">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground">Music</h1>
            <p className="mt-4 font-paragraph text-lg text-foreground/70 max-w-3xl">
              Albums I keep coming back to. Sort by release date or rating.
            </p>

            <div className="mt-8 flex flex-col md:flex-row md:items-end gap-4">
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

            const chipBase =
              textClass === "text-black"
                ? "border-black/20 text-black/80"
                : "border-white/25 text-white/90";

            const boxBg = textClass === "text-black" ? "bg-white/55" : "bg-black/15";
            const boxBorder = textClass === "text-black" ? "border-black/15" : "border-white/20";
            const bodyText = textClass === "text-black" ? "text-black/80" : "text-white/90";

            return (
              <div key={album.id} className="w-full" style={{ backgroundColor: album.primaryColor }}>
                <div className="w-full max-w-[120rem] mx-auto px-6 py-10 md:py-12">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
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
                        {/* TOP CHIPS (release/rating) */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span
                            className={[
                              "text-xs font-medium uppercase tracking-wider px-3 py-1 border",
                              chipBase,
                            ].join(" ")}
                          >
                            Release: {formatDate(album.releaseDate)}
                          </span>
                          <span
                            className={[
                              "text-xs font-medium uppercase tracking-wider px-3 py-1 border",
                              chipBase,
                            ].join(" ")}
                          >
                            Rating: {album.rating.toFixed(1)}/10
                          </span>
                        </div>

                        {/* LINKED TITLE + ARTIST (no "Open") */}
                        {album.link ? (
                          <a
                            href={album.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-block"
                          >
                            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-ultra uppercase">
                              {album.title}
                              <span className="block">{album.artist}</span>
                            </h2>
                            <span className="mt-3 inline-block font-paragraph text-sm underline underline-offset-4 opacity-90 group-hover:opacity-100 transition-opacity">
                              Listen
                            </span>
                          </a>
                        ) : (
                          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-ultra uppercase">
                            {album.title}
                            <span className="block">{album.artist}</span>
                          </h2>
                        )}

                        {/* NO ONE-LINER: go straight into text box */}
                        <div className={["mt-6 border", boxBorder, "backdrop-blur-sm"].join(" ")}>
                          <div className={["p-5 md:p-6", boxBg].join(" ")}>
                            <div className="max-h-[200px] md:max-h-[240px] overflow-y-auto pr-4">
                              <p className={["font-paragraph text-base md:text-lg leading-relaxed", bodyText].join(" ")}>
                                {album.review}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
