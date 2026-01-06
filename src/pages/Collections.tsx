import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { motion } from 'framer-motion';
import { collections, products, categories } from '@/data/products';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ArrowRight } from 'lucide-react';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const filteredCollections = categoryFilter 
    ? collections.filter(c => c.category === categoryFilter)
    : collections;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              Our Collections
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collections of premium digital invitations
            </p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <Link to="/collections">
              <Button variant={!categoryFilter ? 'default' : 'outline'}>All</Button>
            </Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/collections?category=${cat.slug}`}>
                <Button variant={categoryFilter === cat.slug ? 'default' : 'outline'}>
                  {cat.title}
                </Button>
              </Link>
            ))}
          </div>

          {/* Collections grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/collections/${collection.slug}`} className="group block card-luxury rounded-xl overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img src={collection.thumbnail} alt={collection.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-xl text-background mb-1">{collection.title}</h3>
                      <p className="text-background/70 text-sm">{collection.productCount} templates</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
