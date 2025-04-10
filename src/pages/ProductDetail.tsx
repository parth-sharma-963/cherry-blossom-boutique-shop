
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { getProductById, Product, fetchAndMergeProducts } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Star, 
  ArrowLeft,
  Minus, 
  Plus, 
  Heart 
} from 'lucide-react';
import { Bubbles } from '@/components/ui/bubbles';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const allProducts = await fetchAndMergeProducts();
        const foundProduct = allProducts.find(p => String(p.id) === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadProduct();
    }
  }, [id]);
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to your cart!`);
    }
  };
  
  const handleAddToWishlist = () => {
    toast.success(`${product?.name} added to your wishlist!`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cherry"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product && !loading) {
    return <Navigate to="/products" />;
  }
  
  const discountedPrice = product?.discount 
    ? product.price * (1 - product.discount / 100)
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-cherry">Home</a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <a href="/products" className="hover:text-cherry">Products</a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-700">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100 h-[400px] md:h-[500px]">
              <Bubbles 
                className="absolute inset-0 z-0 opacity-10" 
                bubbleCount={10} 
                colors={["#f8bbd0", "#e1bee7", "#ffcdd2"]} 
                maxSize={80}
                minSize={20}
                speed={20}
              />
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover relative z-10"
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-cherry text-white text-sm font-bold px-3 py-1 rounded-full z-20">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500">(24 reviews)</span>
              </div>
              
              <div className="mb-6">
                {discountedPrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-cherry mr-2">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded border ${
                          selectedSize === size
                            ? 'border-cherry bg-cherry/10 text-cherry'
                            : 'border-gray-300 text-gray-700 hover:border-cherry'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded border ${
                          selectedColor === color
                            ? 'border-cherry bg-cherry/10 text-cherry'
                            : 'border-gray-300 text-gray-700 hover:border-cherry'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded w-32">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-cherry"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex-1 text-center font-medium">{quantity}</div>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-cherry"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="bg-cherry hover:bg-cherry/90 text-white px-8 py-6 flex-1"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  className="border-cherry text-cherry hover:bg-cherry/10 px-4 py-6"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
