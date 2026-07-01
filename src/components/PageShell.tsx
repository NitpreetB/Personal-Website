import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Standard interior-page frame: header, oversized serif title with an
 * eyebrow label, optional intro line, content, footer.
 */
export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 w-full">
        <section className="max-w-site mx-auto px-[5%] pt-40 md:pt-48 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24"
          >
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-foreground">
              {title}
            </h1>
            {intro && (
              <p className="mt-8 font-paragraph text-lg md:text-xl text-dark-gray leading-relaxed max-w-2xl">
                {intro}
              </p>
            )}
          </motion.div>

          {children}
        </section>
      </main>

      <Footer />
    </div>
  );
}
