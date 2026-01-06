import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="section-padding hero-gradient relative">
          <div className="absolute inset-0 hero-overlay" />
          <div className="container-custom relative z-10 text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl text-primary-foreground mb-6">
              About Us
            </motion.h1>
          </div>
        </section>
        
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-xl leading-relaxed mb-8">
                Welcome to <span className="text-primary font-semibold">Outright's Luring Invite</span>, where dreams meet innovation, and every occasion becomes a cherished memory.
              </p>
              <p className="leading-relaxed mb-8">
                Founded under the visionary leadership of our Director, <span className="text-foreground font-medium">Ms. Gurleen Kaur</span>, Outright's Luring Invite is more than just a digital invitation service — it's a reflection of passion, creativity, and a commitment to making your special moments truly unforgettable.
              </p>
              <p className="leading-relaxed mb-8">
                Driven by Gurleen's personal dedication to infuse every event with warmth and personalized touch, Outright's Luring Invite embodies a mission to redefine the art of celebration. We believe that every invitation should tell a story, capture emotions, and set the perfect tone for your special day.
              </p>
              <p className="leading-relaxed">
                From AI-powered video invitations to elegant digital designs, we combine cutting-edge technology with artistic excellence to deliver invitations that leave a lasting impression.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
