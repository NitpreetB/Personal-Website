import { motion } from 'framer-motion';
import {
  MapPin,
  Route,
  Gauge,
  Map,
  UserCheck,
  Globe,
} from 'lucide-react';
import PageShell from '@/components/PageShell';

const features = [
  {
    icon: MapPin,
    title: 'Plan from any address',
    description:
      'Type in a starting point and RouteGrade geocodes it, then plans routes around it with adjustable distance tolerance.',
  },
  {
    icon: Route,
    title: 'Generated loop routes',
    description:
      'Loop candidates are generated from the OpenStreetMap road graph and routed through OSRM, so every option follows real streets and trails.',
  },
  {
    icon: Gauge,
    title: 'Quality scoring',
    description:
      'Every route is graded across 8+ factors — traffic, lighting, sidewalk continuity, elevation, scenery, surface quality, intersections, and reported safety incidents.',
  },
  {
    icon: Map,
    title: 'Interactive map',
    description:
      'Candidates render on an interactive MapLibre GL map so you can compare shapes, elevation, and scores at a glance.',
  },
  {
    icon: UserCheck,
    title: 'Save your routes',
    description:
      'Sign in with Google or a magic link to save routes and revisit them any time from your account dashboard.',
  },
  {
    icon: Globe,
    title: 'Open to everyone',
    description:
      'The full route planning experience works without an account — no login required to explore.',
  },
];

const stackGroups: { label: string; items: string[] }[] = [
  {
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MapLibre GL'],
  },
  {
    label: 'Backend',
    items: ['FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'Supabase Auth'],
  },
  {
    label: 'Data & Providers',
    items: ['dbt', 'Nominatim', 'OSRM', 'Open-Elevation'],
  },
];

export default function RouteGradePage() {
  return (
    <PageShell
      eyebrow="Featured Build"
      title="RouteGrade"
      intro="A route quality platform for runners and walkers — it doesn't just find you a route, it tells you whether it's actually a good one."
    >
      {/* Logo — the gateway to the live app */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-24 md:mb-32"
      >
        <a
          href="https://routegrade-web.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="group block border border-light-gray hover:border-accent transition-colors duration-500 p-3"
          aria-label="Launch RouteGrade"
        >
          <img
            src="/routegrade-logo.svg"
            alt="RouteGrade logo"
            className="w-48 h-48 md:w-64 md:h-64 object-cover saturate-[0.85] group-hover:saturate-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
        </a>
      </motion.div>

      {/* What it is */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-24 md:mb-32"
      >
        <p className="eyebrow mb-6">01 — What it is</p>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <h2 className="md:col-span-5 font-heading text-3xl md:text-4xl font-light text-foreground leading-snug">
            Not every route is created equal.
          </h2>
          <div className="md:col-span-7 space-y-6 font-paragraph text-base md:text-lg text-dark-gray leading-relaxed">
            <p>
              Most mapping tools answer one question: how do I get from A to B?
              RouteGrade answers a different one — is this a route I&apos;d
              actually want to run? It assesses streets and trails for quality
              and safety, scoring each candidate on the things that matter when
              you&apos;re on foot: traffic, lighting, sidewalks, elevation,
              scenery, surface, intersections, and reported safety incidents.
            </p>
            <p>
              Give it a starting address and a target distance, and it
              generates loop routes from the real road network, grades each
              one, and lets you pick the best — then save it for next time.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <div className="mb-24 md:mb-32">
        <p className="eyebrow mb-10">02 — Key features</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-light-gray border border-light-gray">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-panel p-8 hover:bg-background transition-colors duration-500"
            >
              <feature.icon className="w-5 h-5 text-secondary group-hover:text-accent transition-colors duration-300" />
              <h3 className="mt-5 font-heading text-xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="mt-3 font-paragraph text-sm text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow mb-10">03 — Under the hood</p>
        <div className="space-y-8">
          {stackGroups.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline py-6 border-b border-light-gray"
            >
              <span className="md:col-span-3 font-heading italic text-lg text-secondary">
                {group.label}
              </span>
              <div className="md:col-span-9 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-paragraph text-[0.65rem] uppercase tracking-widestplus text-secondary border border-light-gray px-3 py-1 hover:border-accent hover:text-accent transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
