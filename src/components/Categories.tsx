
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const Categories = () => {
  return (
    <section className="py-12 md:py-16 bg-cherry-lighter">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our carefully curated categories to find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-center font-semibold text-gray-800 group-hover:text-cherry transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-center text-sm text-gray-500 mt-1">
                    {category.productCount} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
