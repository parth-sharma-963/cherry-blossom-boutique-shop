
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-cherry-light py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="w-32 h-32 absolute top-10 left-10 rounded-full bg-cherry animate-bounce-subtle" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-16 h-16 absolute top-20 right-40 rounded-full bg-cherry animate-bounce-subtle" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-24 h-24 absolute bottom-10 right-10 rounded-full bg-cherry animate-bounce-subtle" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-20 h-20 absolute bottom-20 left-40 rounded-full bg-cherry animate-bounce-subtle" style={{ animationDelay: '0.7s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Spring Collection is <span className="text-cherry">Here!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Discover our new cherry blossom inspired collection. Fresh styles for a fresh season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="btn-cherry text-lg px-8 py-6 rounded-full">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" className="btn-cherry-outline text-lg px-8 py-6 rounded-full">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main product image - using placeholder for now */}
              <div className="w-72 h-96 md:w-80 md:h-[28rem] bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
                <img 
                  src="/images/bbg-cherry-blossom-esplanade-kanzan-alison-engstrom-733x1098.jpg"
                  alt="Spring Collection Featured Item" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating discount badge */}
              <div className="absolute -top-5 -right-5 bg-cherry text-white text-lg font-bold rounded-full w-20 h-20 flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-center">
                  <div className="text-xs">UP TO</div>
                  <div className="text-xl">30%</div>
                  <div className="text-xs">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
