
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes?.some(size => selectedSizes.includes(size))
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, selectedSizes]);
  
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const toggleSizeSelection = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 200]);
    setSelectedSizes([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {selectedCategory || "All Products"}
            </h1>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            <div className="md:w-1/4 lg:w-1/5 hidden md:block">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  {(selectedCategory || priceRange[0] > 0 || priceRange[1] < 200 || selectedSizes.length > 0) && (
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={clearFilters} 
                      className="text-sm text-gray-500 hover:text-cherry"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`cursor-pointer py-1 px-2 rounded ${
                          selectedCategory === category.name 
                            ? 'bg-cherry-light text-cherry'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 200]}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    max={200}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Sizes */}
                <div>
                  <h3 className="font-medium mb-3">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <div 
                        key={size}
                        className={`
                          cursor-pointer border rounded-md px-3 py-1 text-sm
                          ${selectedSizes.includes(size) 
                            ? 'bg-cherry text-white border-cherry' 
                            : 'border-gray-300 hover:border-cherry'}
                        `}
                        onClick={() => toggleSizeSelection(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setShowFilters(false);
                        }}
                        className={`cursor-pointer py-1 px-2 rounded ${
                          selectedCategory === category.name 
                            ? 'bg-cherry-light text-cherry'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 200]}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    max={200}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Sizes */}
                <div className="mb-4">
                  <h3 className="font-medium mb-3">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <div 
                        key={size}
                        className={`
                          cursor-pointer border rounded-md px-3 py-1 text-sm
                          ${selectedSizes.includes(size) 
                            ? 'bg-cherry text-white border-cherry' 
                            : 'border-gray-300 hover:border-cherry'}
                        `}
                        onClick={() => toggleSizeSelection(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Apply Filters Button */}
                <Button 
                  className="w-full btn-cherry" 
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} className="btn-cherry">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
