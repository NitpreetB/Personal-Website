import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl mb-8 text-foreground">My Story</h1>
            <div className="prose prose-lg max-w-none">
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Welcome to my story. This is where I share my journey, experiences, and the path that has shaped who I am today.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Every journey has a beginning, and mine started with a passion for learning and creating. Over the years, I've had the opportunity to work on diverse projects, collaborate with talented individuals, and continuously grow both personally and professionally.
              </p>
              <p className="font-paragraph text-lg text-foreground/80">
                This page is a reflection of my experiences, values, and the lessons I've learned along the way. Thank you for taking the time to learn more about my story.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
