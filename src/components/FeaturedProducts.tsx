
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { getFeaturedProducts, Product, fetchAndMergeProducts } from '@/data/products';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>(getFeaturedProducts());
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await fetchAndMergeProducts();
        setProducts(allProducts.filter(product => product.featured));
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-2">Our most popular items handpicked for you</p>
          </div>
          
          <Button asChild variant="link" className="text-cherry flex items-center mt-2 md:mt-0">
            <Link to="/products">
              View All Products
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cherry"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
