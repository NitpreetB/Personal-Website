import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';

const chapters = [
  {
    year: '2003',
    title: 'Mississauga, Ontario',
    text: 'Born and raised in a city that thrives on its own diversity — the kind of place where every block sounds a little different.',
  },
  {
    year: '2021',
    title: 'University of Waterloo',
    text: 'Started Honours Mechatronics Engineering. Picked the degree that refuses to choose between mechanical, electrical, software, and control.',
  },
  {
    year: '2022 — 2024',
    title: 'The co-op years',
    text: 'GANs for phytoplankton at Blue Lion Labs, machine vision at ATS Life Sciences, MLOps pipelines at Arcturus Networks. Each term a different corner of the machine-intelligence world.',
  },
  {
    year: '2025',
    title: 'Super.com',
    text: 'Moved into data — pricing models, dbt pipelines, and dashboards that move real revenue. Currently finishing my final year at Waterloo.',
  },
];

export default function StoryPage() {
  return (
    <PageShell
      eyebrow="The Person"
      title={
        <>
          My <em className="text-accent">story</em>, so far
        </>
      }
      intro="I was born in Mississauga, Ontario in 2003. The rest is still being written — here's the plot so far."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7 space-y-14 max-w-3xl">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative border-l border-light-gray pl-8 md:pl-10"
            >
              <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-accent" />
              <p className="eyebrow mb-3">{chapter.year}</p>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-4">
                {chapter.title}
              </h2>
              <p className="font-paragraph text-base md:text-lg text-dark-gray leading-relaxed">
                {chapter.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 lg:sticky lg:top-32"
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden border border-light-gray">
            <img
              src="/photos/lantern.jpg"
              alt="Low light, good company"
              loading="lazy"
              className="w-full h-full object-cover saturate-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <p className="mt-4 eyebrow">Low light, good company</p>
        </motion.div>
      </div>
    </PageShell>
  );
}
