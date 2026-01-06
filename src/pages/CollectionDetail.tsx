import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { getCollectionBySlug, getProductsByCollection } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CollectionDetail() {
  const { slug } = useParams();
  const collection = getCollectionBySlug(slug || '');
  const products = getProductsByCollection(slug || '');

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <div className="container-custom section-padding">
          <Link to="/collections" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Collections
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">{collection.title}</h1>
            <p className="text-muted-foreground">{collection.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link to={`/product/${product.slug}`} className="group block card-luxury rounded-xl overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {product.bestSeller && <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Best Seller</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{product.title}</h3>
                    <p className="text-primary font-bold">Starting at ₹{product.priceFrom.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{product.deliveryTime} delivery</p>
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
