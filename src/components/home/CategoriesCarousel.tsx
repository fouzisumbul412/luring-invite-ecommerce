import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories, collections } from '@/data/products';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

export default function CategoriesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  // Get collections for each category
  const getCollectionsForCategory = (categorySlug: string) => {
    return collections.filter(c => c.category === categorySlug);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From AI-powered video invitations to elegant digital designs, find the perfect invitation for your special occasion.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link
                to={`/collections?category=${category.slug}`}
                className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden card-luxury"
              >
                <img
                  src={category.thumbnail}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="font-heading text-2xl md:text-3xl text-background mb-2">
                    {category.title}
                  </h3>
                  <p className="text-background/80 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>View Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Collections Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl text-foreground mb-8 text-center">
            Browse All Collections
          </h3>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex-none w-[280px] md:w-[320px]"
                >
                  <Link
                    to={`/collections/${collection.slug}`}
                    className="group block"
                  >
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4 card-luxury">
                      <img
                        src={collection.thumbnail}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-background text-sm font-medium">
                          {collection.productCount} templates
                        </span>
                        <ArrowRight className="w-5 h-5 text-background" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {collection.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {collection.description}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {collections.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === index
                    ? 'w-8 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
