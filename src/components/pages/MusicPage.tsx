import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MusicPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-12 text-foreground">Music</h1>
            <div className="prose prose-lg max-w-none">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Music is a universal language that connects us all. Here I share my favorite artists, playlists, and musical discoveries.
              </p>
              <p className="font-paragraph text-lg text-foreground/80">
                From classic albums to new releases, explore the soundtracks that inspire my life.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
