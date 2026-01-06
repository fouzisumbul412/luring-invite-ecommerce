import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import ProcessSection from '@/components/home/ProcessSection';

export default function Process() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <ProcessSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
