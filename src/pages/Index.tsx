
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Categories />
        
        {/* Promotional Banner */}
        <div className="bg-cherry py-12 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer</h2>
            <p className="text-lg md:text-xl mb-6">
              Get free shipping on all orders over $50! Use code CHERRY at checkout.
            </p>
            <div className="inline-block border-2 border-white px-6 py-2 font-bold">
              CHERRY
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
