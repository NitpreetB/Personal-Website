import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, MapPin, ArrowDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trips, Trip, TripPhoto } from '@/data/trips';

/**
 * One fluid page: every trip scrolls as one chapter with photos interspersed
 * throughout the narrative. A gold spine on the left fills as you scroll.
 */

function PhotoFrame({
  photo,
  size = 'medium',
  className = '',
}: {
  photo: TripPhoto;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}) {
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
  };
  const sizeClass = sizeClasses[size];

  if (!photo.src) {
    // "Wanted" slot — describes the shot to drop into photo-inbox/
    return (
      <figure className={`${sizeClass} ${className}`}>
        <div className="relative w-full min-h-[16rem] border border-dashed border-secondary/50 bg-panel shadow-[0_16px_60px_-12px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center text-center p-8 gap-4">
          <Camera className="w-6 h-6 text-accent" />
          <p className="font-paragraph text-sm text-dark-gray leading-relaxed max-w-[16rem]">
            {photo.want}
          </p>
          <p className="eyebrow !text-accent-dim">photo-inbox / {photo.file}</p>
        </div>
        <figcaption className="mt-4 eyebrow text-secondary">{photo.caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`${sizeClass} ${className}`}>
      <div className="relative w-full overflow-hidden border border-light-gray group bg-panel aspect-video">
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
        />
      </div>
      <figcaption className="mt-4 eyebrow text-secondary">{photo.caption}</figcaption>
    </figure>
  );
}

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TripChapter({ trip, index }: { trip: Trip; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end end'],
  });

  return (
    <section ref={ref} className="relative">
      {/* Sticky trip metadata rail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-32 space-y-4">
            <p className="eyebrow !text-accent">Trip {String(index + 1).padStart(2, '0')}</p>
            <p className="font-heading italic text-2xl text-foreground leading-snug">{trip.dates}</p>
            <div className="space-y-1 font-paragraph text-sm text-secondary">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-dim" />
                {trip.location}
              </p>
              <p className="pl-[1.375rem]">{trip.coords}</p>
              <p className="pl-[1.375rem]">{trip.duration}</p>
            </div>
          </div>
        </div>

        {/* Main narrative content with photos interspersed */}
        <div className="md:col-span-9 lg:col-span-8 space-y-12">
          {/* Title + intro */}
          <Reveal>
            <h2 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground mb-6">
              {trip.title.split(trip.accent)[0]}
              <em className="text-accent">{trip.accent}</em>
              {trip.title.split(trip.accent)[1]}
            </h2>
            <p className="font-paragraph text-lg md:text-xl leading-relaxed text-dark-gray max-w-3xl">
              {trip.intro}
            </p>
          </Reveal>

          {/* Photo 1 - Hero (large) */}
          <Reveal>
            <PhotoFrame photo={trip.photos[0]} size="large" />
          </Reveal>

          {/* Moment 1 */}
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-3 !text-accent">{trip.moments[0].day}</p>
            <h3 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
              {trip.moments[0].heading}
            </h3>
            <p className="font-paragraph text-base md:text-lg leading-relaxed text-dark-gray">
              {trip.moments[0].body}
            </p>
          </Reveal>

          {/* Photo 2 - Street (medium) */}
          <Reveal>
            <PhotoFrame photo={trip.photos[1]} size="medium" />
          </Reveal>

          {/* Photo 3 - Detail (small) */}
          <Reveal>
            <PhotoFrame photo={trip.photos[2]} size="small" />
          </Reveal>

          {/* Moment 2 */}
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-3 !text-accent">{trip.moments[1].day}</p>
            <h3 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
              {trip.moments[1].heading}
            </h3>
            <p className="font-paragraph text-base md:text-lg leading-relaxed text-dark-gray">
              {trip.moments[1].body}
            </p>
          </Reveal>

          {/* Photo 4 - Walk (medium) */}
          <Reveal>
            <PhotoFrame photo={trip.photos[3]} size="medium" />
          </Reveal>

          {/* Optional gallery interlude */}
          {trip.gallery && (
            <div>
              <Reveal className="mb-8">
                <p className="eyebrow !text-accent">{trip.gallery.label}</p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {trip.gallery.photos.map((photo) => (
                  <Reveal key={photo.file}>
                    <PhotoFrame photo={photo} size="small" />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Photo 5 - Closing (large) */}
          <Reveal>
            <PhotoFrame photo={trip.photos[4]} size="large" />
          </Reveal>

          {/* Moment 3 */}
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-3 !text-accent">{trip.moments[2].day}</p>
            <h3 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
              {trip.moments[2].heading}
            </h3>
            <p className="font-paragraph text-base md:text-lg leading-relaxed text-dark-gray">
              {trip.moments[2].body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function TravelPage() {
  const spineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ['start 0.7', 'end end'],
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 w-full">
        {/* Page hero */}
        <section className="max-w-site mx-auto px-[5%] pt-40 md:pt-48 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-6">Field notes</p>
            <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground">
              Where the road <em className="text-accent">went</em>
            </h1>
            <p className="mt-8 font-paragraph text-lg md:text-xl text-dark-gray leading-relaxed max-w-2xl">
              Every trip, in the order it happened — one continuous scroll.
              No albums to click through; just keep going.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <ArrowDown className="w-4 h-4 animate-bounce text-accent" />
              <span className="eyebrow">Start in May 2026</span>
            </div>
          </motion.div>
        </section>

        {/* Timeline: gold spine + chapters */}
        <div ref={spineRef} className="relative max-w-site mx-auto px-[5%]">
          {/* spine track + scroll-driven fill (desktop) */}
          <div className="hidden md:block absolute left-[5%] top-0 bottom-0 w-px bg-light-gray" />
          <motion.div
            className="hidden md:block absolute left-[5%] top-0 bottom-0 w-px bg-accent origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="md:pl-12 space-y-40 pb-32">
            {trips.map((trip, i) => (
              <TripChapter key={trip.id} trip={trip} index={i} />
            ))}

            {/* Next chapter teaser */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border-t border-light-gray pt-16"
            >
              <p className="eyebrow mb-4">Next stop</p>
              <p className="font-heading italic text-4xl md:text-5xl text-secondary">
                To be determined<span className="text-accent">…</span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
