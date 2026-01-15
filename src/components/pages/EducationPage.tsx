import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EducationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-12 text-foreground">
              Education
            </h1>

            <div className="space-y-10">
              <div className="border-l-2 border-accent pl-8 pb-2">
                <div className="mb-2">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                      University of Waterloo
                    </h2>

                    <div className="font-paragraph text-sm text-secondary">
                      Sep 2021 – May 2026
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <p className="font-paragraph text-lg text-accent">
                      Bachelor of Applied Sciences (BASc)
                    </p>
                    <span className="font-paragraph text-sm text-secondary">
                      • Waterloo, ON
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-paragraph text-base text-foreground/80 leading-relaxed">
                  Mechatronics Engineering, with a specialization in Artificial Intelligence
                  and Machine Learning. Coursework and projects focused on machine learning,
                  computer vision, control systems, robotics, and large-scale data systems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
