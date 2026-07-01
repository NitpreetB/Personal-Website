import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';
import { education } from '@/data/experience';

export default function EducationPage() {
  return (
    <PageShell
      eyebrow="Education"
      title={
        <>
          Trained at <em className="text-accent">Waterloo</em>
        </>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative border-l border-light-gray pl-8 md:pl-10 max-w-4xl"
      >
        <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-accent" />

        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
          <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">
            {education.school}
          </h2>
          <div className="font-paragraph text-xs uppercase tracking-widestplus text-secondary">
            {education.period}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <p className="font-paragraph text-lg text-accent">{education.degree}</p>
          <span className="font-paragraph text-sm text-secondary">
            · {education.location}
          </span>
        </div>

        <p className="mt-6 font-paragraph text-base text-dark-gray leading-relaxed">
          {education.program}. Mechanical, electrical, software, and control
          systems in one degree — the deliberately greedy option, which is
          exactly why I picked it.
        </p>
      </motion.div>
    </PageShell>
  );
}
