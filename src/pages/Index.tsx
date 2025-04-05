
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';
import { Bubbles } from '@/components/ui/bubbles';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Bubbles background for top section */}
        <div className="relative overflow-hidden">
          <Bubbles 
            className="absolute inset-0 z-0" 
            bubbleCount={20} 
            colors={["#ffcdd2", "#f8bbd0", "#e1bee7"]} 
            maxSize={120}
            minSize={20}
            speed={30}
          />
          <div className="relative z-10">
            <Hero />
          </div>
        </div>
        
        <FeaturedProducts />
        <Categories />
        
        {/* Promotional Banner with bubbles */}
        <div className="bg-cherry py-12 text-white text-center relative overflow-hidden">
          <Bubbles 
            className="absolute inset-0 z-0 opacity-10" 
            bubbleCount={15} 
            colors={["#ffffff"]} 
            maxSize={100}
            minSize={20}
            speed={15}
          />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer</h2>
            <p className="text-lg md:text-xl mb-6">
              Get free shipping on all orders over $50! Use code CHERRY at checkout.
            </p>
            <div className="inline-block border-2 border-white px-6 py-2 font-bold animate-pulse">
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
