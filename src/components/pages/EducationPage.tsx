import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EducationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-12 text-foreground">Education</h1>
            <div className="space-y-8">
              <div className="border-l-2 border-accent pl-8 pb-8">
                <p className="font-paragraph text-lg text-foreground/80">
                  My educational background and academic achievements will be displayed here.
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
