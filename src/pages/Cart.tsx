
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Bubbles } from '@/components/ui/bubbles';
import Newsletter from '@/components/Newsletter';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg relative overflow-hidden">
              <Bubbles 
                className="absolute inset-0 z-0 opacity-10" 
                bubbleCount={15} 
                colors={["#f8bbd0", "#e1bee7", "#ffcdd2"]} 
                maxSize={100}
                minSize={30}
                speed={15}
              />
              <div className="relative z-10">
                <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Looks like you haven't added anything to your cart yet. Check out our featured products to get started.
                </p>
                <Button 
                  onClick={() => navigate('/products')}
                  className="bg-cherry hover:bg-cherry/90 text-white"
                >
                  Browse Products
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow sm:ml-2">
                      <h3 className="text-lg font-semibold">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-cherry"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="w-10 text-center font-medium">{item.quantity}</div>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-cherry"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right font-semibold w-24">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-500 hover:text-cherry"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-cherry hover:bg-cherry/90 text-white py-6"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
