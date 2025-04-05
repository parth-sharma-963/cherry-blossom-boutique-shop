
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    cartTotal, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-cherry-light">
              <ShoppingCart className="h-10 w-10 text-cherry" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="btn-cherry">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Calculate shipping cost (free above $50)
  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const orderTotal = cartTotal + shippingCost;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="hidden md:flex border-b p-4">
                  <div className="w-1/2 font-semibold">Product</div>
                  <div className="w-1/6 text-center font-semibold">Price</div>
                  <div className="w-1/6 text-center font-semibold">Quantity</div>
                  <div className="w-1/6 text-center font-semibold">Total</div>
                </div>
                
                {cartItems.map(item => (
                  <div key={item.product.id} className="border-b p-4">
                    {/* Mobile Layout */}
                    <div className="md:hidden flex flex-col">
                      <div className="flex mb-4">
                        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <p className="text-gray-600 text-sm mb-1">
                            Price: ${item.product.price.toFixed(2)}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Total: ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-md rounded-r-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="h-8 w-8 flex items-center justify-center border-t border-b">
                            {item.quantity}
                          </div>
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-md rounded-l-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center">
                      <div className="w-1/2 flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.product.name}</h3>
                          {item.product.category && (
                            <p className="text-gray-600 text-sm">{item.product.category}</p>
                          )}
                        </div>
                      </div>
                      <div className="w-1/6 text-center">
                        ${item.product.price.toFixed(2)}
                      </div>
                      <div className="w-1/6 flex justify-center">
                        <div className="flex items-center">
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-md rounded-r-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="h-8 w-8 flex items-center justify-center border-t border-b">
                            {item.quantity}
                          </div>
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-md rounded-l-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="w-1/6 text-center flex justify-center items-center space-x-2">
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    asChild
                    className="hover:bg-transparent hover:text-cherry"
                  >
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-red-500"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shippingCost === 0 
                        ? <span className="text-green-600">Free</span> 
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {cartTotal < 50 && (
                    <div className="text-sm text-green-600">
                      Add ${(50 - cartTotal).toFixed(2)} more to get free shipping!
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="promo"
                      placeholder="Enter promo code"
                      className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-cherry focus:border-cherry"
                    />
                    <Button className="rounded-l-none btn-cherry">
                      Apply
                    </Button>
                  </div>
                </div>
                
                {/* Checkout Button - Fixed: Now properly links to checkout */}
                <Button asChild className="w-full btn-cherry py-6 text-lg">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                {/* Payment Methods */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">We Accept</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
