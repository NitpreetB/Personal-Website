import { motion } from 'framer-motion';
import { format } from 'date-fns';
import PageShell from '@/components/PageShell';
import { experiences, skillGroups } from '@/data/experience';

const formatDate = (date?: string) => {
  if (!date) return 'Present';
  try {
    return format(new Date(date), 'MMM yyyy');
  } catch {
    return 'Present';
  }
};

export default function WorkPage() {
  return (
    <PageShell
      eyebrow="Experience"
      title={
        <>
          Where I've <em className="text-accent">worked</em>
        </>
      }
      intro="Machine learning, Computer Vision, and Data."
    >
      <div className="space-y-14 max-w-4xl">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative border-l border-light-gray pl-8 md:pl-10 pb-2"
          >
            {/* timeline node */}
            <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-accent" />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">
                {exp.jobTitle}
              </h2>
              <div className="font-paragraph text-xs uppercase tracking-widestplus text-secondary">
                {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <p className="font-paragraph text-lg text-accent">{exp.companyName}</p>
              <span className="font-paragraph text-sm text-secondary">
                · {exp.location}
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  className="font-paragraph text-base text-dark-gray leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-2 before:h-px before:bg-accent-dim"
                >
                  {b}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="mt-24 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-paragraph text-xs uppercase tracking-widestplus text-secondary"
        >
          Skills
        </motion.h2>

        <div className="mt-8 space-y-10">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8"
            >
              <h3 className="font-heading text-xl md:text-2xl font-light text-foreground md:w-64 md:shrink-0">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-paragraph text-sm text-dark-gray border border-light-gray rounded-full px-4 py-1.5"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
