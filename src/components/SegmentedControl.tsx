import { motion } from 'framer-motion';

/**
 * Pill-style segmented control with a sliding active indicator.
 * `id` must be unique per instance — it namespaces the layout animation.
 */
export default function SegmentedControl<T extends string>({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="eyebrow">{label}</span>
      <div className="flex flex-wrap gap-1 border border-light-gray p-1 w-fit">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`relative px-4 py-2 font-paragraph text-xs uppercase tracking-widestplus transition-colors duration-300 ${
                active ? 'text-background' : 'text-secondary hover:text-foreground'
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`segmented-${id}`}
                  className="absolute inset-0 bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
