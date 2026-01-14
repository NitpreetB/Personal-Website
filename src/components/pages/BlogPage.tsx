import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-12 text-foreground">Blog</h1>
            <div className="prose prose-lg max-w-none">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Welcome to my blog, where I share thoughts, insights, and stories about technology, creativity, and life.
              </p>
              <p className="font-paragraph text-lg text-foreground/80">
                Stay tuned for articles, tutorials, and reflections on topics that matter to me.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
