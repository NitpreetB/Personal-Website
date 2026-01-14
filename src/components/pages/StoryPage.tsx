import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-8 text-foreground">About Me</h1>
            <div className="prose prose-lg max-w-none">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
              I was born in Mississauga, Ontario in 2003
              </p>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
              /*
              I have one older brother, Sameep. 
              My mom, Geetika, and my father, Rupinder
               */
              </p>
              <p className="font-paragraph text-lg text-foreground/80">
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
