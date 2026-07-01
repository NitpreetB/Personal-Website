import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Camera, MapPin, ArrowDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trips, Trip, TripPhoto } from '@/data/trips';

/**
 * One fluid page: every trip is a scroll "chapter" — no clicks, no modals.
 * A gold spine on the left fills as you travel down the timeline.
 */

function PhotoFrame({
  photo,
  y,
  tilt = 0,
  className = '',
  captionClass = '',
}: {
  photo: TripPhoto;
  y?: MotionValue<number>;
  tilt?: number;
  className?: string;
  captionClass?: string;
}) {
  if (!photo.src) {
    // "Wanted" slot — describes the shot to drop into photo-inbox/
    return (
      <motion.figure style={{ y }} className={className}>
        <div
          className="relative w-full h-full min-h-[16rem] border border-dashed border-secondary/50 bg-panel shadow-[0_16px_60px_-12px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center text-center p-8 gap-4"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          <Camera className="w-6 h-6 text-accent" />
          <p className="font-paragraph text-sm text-dark-gray leading-relaxed max-w-[16rem]">
            {photo.want}
          </p>
          <p className="eyebrow !text-accent-dim">
            photo-inbox / {photo.file}
          </p>
        </div>
        <figcaption className={`mt-3 eyebrow ${captionClass}`}>{photo.caption}</figcaption>
      </motion.figure>
    );
  }

  return (
    <motion.figure style={{ y }} className={className}>
      <div
        className="relative w-full overflow-hidden border border-light-gray group"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
        {photo.temp && (
          <span className="absolute top-3 right-3 px-2.5 py-1 font-paragraph text-[0.55rem] uppercase tracking-widestplus bg-background/80 text-secondary border border-light-gray">
            Stand-in
          </span>
        )}
      </div>
      <figcaption className={`mt-3 eyebrow ${captionClass}`}>{photo.caption}</figcaption>
    </motion.figure>
  );
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Moment({ moment }: { moment: Trip['moments'][number] }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow mb-4 !text-accent">{moment.day}</p>
      <h3 className="font-heading text-2xl md:text-4xl font-light text-foreground mb-5">
        {moment.heading}
      </h3>
      <p className="font-paragraph text-lg leading-relaxed text-dark-gray">
        {moment.body}
      </p>
    </Reveal>
  );
}

function TripChapter({ trip, index }: { trip: Trip; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  // Parallax: photos drift at different speeds while the chapter scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const driftSlow = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const driftFast = useTransform(scrollYProgress, [0, 1], [70, -70]);

  const [hero, street, detail, walk, candid, closing] = trip.photos;

  return (
    <section ref={ref} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Sticky trip rail */}
        <div className="md:col-span-3 relative">
          <div className="md:sticky md:top-32 space-y-4 pb-4">
            <p className="eyebrow !text-accent">
              Trip {String(index + 1).padStart(2, '0')}
            </p>
            <p className="font-heading italic text-2xl text-foreground leading-snug">
              {trip.dates}
            </p>
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

        {/* Flowing chapter body */}
        <div className="md:col-span-9 lg:col-span-8 space-y-20 md:space-y-28">
          {/* Title + intro */}
          <Reveal>
            <h2 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground">
              {trip.title.split(trip.accent)[0]}
              <em className="text-accent">{trip.accent}</em>
              {trip.title.split(trip.accent)[1]}
            </h2>
            <p className="mt-8 font-paragraph text-lg md:text-xl leading-relaxed text-dark-gray max-w-2xl">
              {trip.intro}
            </p>
          </Reveal>

          {/* Cluster A — hero wide + street shot overlapping */}
          <div className="relative">
            <Reveal>
              <PhotoFrame photo={hero} className="w-full [&_img]:aspect-[16/9]" />
            </Reveal>
            <Reveal delay={0.15} className="relative z-10 -mt-16 md:-mt-28 ml-auto w-2/3 md:w-[45%]">
              <PhotoFrame photo={street} y={driftFast} tilt={1.2} className="[&_img]:aspect-[4/5]" />
            </Reveal>
          </div>

          <Moment moment={trip.moments[0]} />

          {/* Cluster B — detail (wanted) + walk shot side by side, offset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            <Reveal>
              <PhotoFrame photo={detail} y={driftSlow} tilt={-1} className="[&_img]:aspect-square" />
            </Reveal>
            <Reveal delay={0.1} className="sm:mt-24">
              <PhotoFrame photo={walk} y={drift} className="[&_img]:aspect-[4/5]" />
            </Reveal>
          </div>

          <Moment moment={trip.moments[1]} />

          {/* Optional 3-up gallery row */}
          {trip.gallery && (
            <div>
              <Reveal>
                <p className="eyebrow mb-8 !text-accent">{trip.gallery.label}</p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {trip.gallery.photos.map((photo, i) => (
                  <Reveal key={photo.file} delay={i * 0.08} className={i === 1 ? 'sm:mt-12' : ''}>
                    <PhotoFrame
                      photo={photo}
                      y={i === 1 ? driftSlow : drift}
                      tilt={i === 0 ? -0.8 : i === 2 ? 0.8 : 0}
                      className="[&_img]:aspect-[3/4]"
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Cluster C — candid (wanted) small + closing wide */}
          <div className="relative">
            <Reveal>
              <PhotoFrame
                photo={closing}
                captionClass="text-right"
                className="w-full [&_img]:aspect-[16/9]"
              />
            </Reveal>
            <Reveal delay={0.15} className="relative z-10 -mt-14 md:-mt-24 mr-auto w-2/3 md:w-[38%]">
              <PhotoFrame photo={candid} y={driftFast} tilt={-1.5} />
            </Reveal>
          </div>

          <Moment moment={trip.moments[2]} />
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
