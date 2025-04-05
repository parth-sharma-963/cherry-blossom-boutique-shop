
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { BubbleGroup } from '@/components/ui/bubbles';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(Number(id)) : null;
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    if (product) {
      const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
      setRelatedProducts(related);
      
      // Reset selections when product changes
      setQuantity(1);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="btn-cherry">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }
    
    if (product.colors && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive"
      });
      return;
    }
    
    addToCart(product, quantity);
  };
  
  // Calculate discount price if available
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100)) 
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 relative">
        <BubbleGroup count={6} area="large" className="absolute right-0 top-0 opacity-30 pointer-events-none" />
        
        {/* Back button */}
        <div className="container mx-auto px-4 py-4 relative z-10">
          <Button 
            variant="ghost" 
            asChild 
            className="flex items-center text-gray-600 hover:text-cherry"
          >
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
          </Button>
        </div>
        
        {/* Product Detail Section */}
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Product Images */}
              <div className="md:w-1/2 p-4 md:p-8">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain max-h-[500px]"
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="md:w-1/2 p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                <div className="mb-4">
                  <span className="text-gray-600">
                    Category: <span className="text-cherry">{product.category}</span>
                  </span>
                </div>
                
                <div className="mb-6">
                  {discountedPrice ? (
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-cherry mr-3">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-3 bg-cherry text-white text-sm font-semibold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6">
                  {product.description}
                </p>
                
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <div 
                          key={size}
                          className={`
                            cursor-pointer border rounded-md px-4 py-2 
                            ${selectedSize === size 
                              ? 'bg-cherry text-white border-cherry' 
                              : 'border-gray-300 hover:border-cherry'}
                          `}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map(color => (
                        <div 
                          key={color}
                          className={`
                            cursor-pointer border rounded-md px-4 py-2 
                            ${selectedColor === color 
                              ? 'bg-cherry text-white border-cherry' 
                              : 'border-gray-300 hover:border-cherry'}
                          `}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <Button 
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-l-md rounded-r-none"
                      onClick={decrementQuantity}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="h-10 w-12 flex items-center justify-center border-t border-b">
                      {quantity}
                    </div>
                    <Button 
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-r-md rounded-l-none"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Button 
                    className="btn-cherry flex-1 py-6"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="btn-cherry-outline py-6"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
                
                {/* Stock Status */}
                <div className="flex items-center text-green-600">
                  {product.inStock ? (
                    <>
                      <Check className="h-5 w-5 mr-1" />
                      <span>In Stock</span>
                    </>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="container mx-auto px-4 py-10 relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
