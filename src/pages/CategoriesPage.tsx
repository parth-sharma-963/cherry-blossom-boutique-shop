
import React from 'react';
import Navbar from '@/components/Navbar';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              All Categories
            </h1>
          </div>
        </div>
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
