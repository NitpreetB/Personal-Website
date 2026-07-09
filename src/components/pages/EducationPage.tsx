import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';
import { education } from '@/data/experience';

export default function EducationPage() {
  return (
    <PageShell
      eyebrow="Education"
      title={
        <>
          Where I've <em className="text-accent">studied</em>
        </>
      }
    >
      <div className="relative border-l border-light-gray pl-8 md:pl-10 max-w-4xl space-y-16">
        {education.map((entry, i) => (
          <motion.div
            key={entry.school}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[calc(2rem+5px)] md:-left-[calc(2.5rem+5px)] top-2 w-[9px] h-[9px] rounded-full bg-accent" />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">
                {entry.school}
              </h2>
              <div className="font-paragraph text-xs uppercase tracking-widestplus text-secondary">
                {entry.period}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <p className="font-paragraph text-lg text-accent">{entry.degree}</p>
              <span className="font-paragraph text-sm text-secondary">
                · {entry.location}
              </span>
            </div>

            {entry.program && (
              <p className="mt-6 font-paragraph text-base text-dark-gray leading-relaxed">
                {entry.program}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
