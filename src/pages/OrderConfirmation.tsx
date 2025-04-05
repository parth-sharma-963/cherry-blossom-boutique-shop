
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Calendar, ArrowRight, CreditCard } from 'lucide-react';
import { Bubbles } from '@/components/ui/bubbles';
import Newsletter from '@/components/Newsletter';
import { useCart } from '@/context/CartContext';

type OrderInfoType = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: any[];
  total: number;
  orderNumber: string;
  orderDate: Date;
};

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<OrderInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { clearCart } = useCart();
  
  // Process the order on component mount
  useEffect(() => {
    const processOrder = async () => {
      try {
        // Check if we have a session_id from Stripe
        const sessionId = searchParams.get('session_id');
        
        if (sessionId) {
          // Get the order info from session storage
          const savedOrderInfo = sessionStorage.getItem('orderInfo');
          
          if (savedOrderInfo) {
            const parsedOrderInfo = JSON.parse(savedOrderInfo);
            setOrderInfo(parsedOrderInfo);
            
            // Clear the cart after successful payment
            clearCart();
            
            // Remove the order info from session storage
            sessionStorage.removeItem('orderInfo');
          } else {
            // If no order info is found, redirect to products
            navigate('/products');
          }
        } else if (location.state?.orderInfo) {
          // Fallback to the legacy approach using location state
          setOrderInfo(location.state.orderInfo);
          clearCart();
        } else {
          // If no order info is found, redirect to products
          navigate('/products');
        }
      } catch (error) {
        console.error('Error processing order:', error);
        navigate('/products');
      } finally {
        setIsLoading(false);
      }
    };
    
    processOrder();
  }, [location.state, navigate, searchParams, clearCart]);
  
  // Show loading or redirect if no order info
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-center">
            <h2 className="text-2xl font-semibold mb-4">Processing your order...</h2>
            <p className="text-gray-500">Please wait while we confirm your payment</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Redirect if no order info after loading
  if (!orderInfo) {
    return <Navigate to="/products" />;
  }
  
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
              <Bubbles 
                className="absolute inset-0 z-0 opacity-5" 
                bubbleCount={15} 
                colors={["#e1bee7", "#f8bbd0", "#ffcdd2"]} 
                maxSize={100}
                minSize={30}
                speed={20}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mr-4" />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
                    <p className="text-gray-600">Thank you for your purchase.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-semibold">#{orderInfo.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-semibold">
                        {new Date(orderInfo.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold">${(orderInfo.total + orderInfo.total * 0.08).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 p-4 border border-green-200 bg-green-50 rounded-lg flex items-start">
                  <CreditCard className="text-green-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Payment Successful</p>
                    <p className="text-sm text-green-700">
                      Your payment has been processed successfully
                    </p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <p className="font-medium">
                      {orderInfo.firstName} {orderInfo.lastName}
                    </p>
                    <p className="text-gray-600">{orderInfo.address}</p>
                    <p className="text-gray-600">
                      {orderInfo.city}, {orderInfo.state} {orderInfo.zipCode}
                    </p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {orderInfo.items.map((item) => (
                      <div 
                        key={item.product.id} 
                        className="flex items-center p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Delivery Timeline</h2>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="relative flex mb-6">
                      <div className="flex items-center justify-center w-8 h-8 bg-cherry rounded-full shrink-0 z-10">
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Order Processing</h3>
                        <p className="text-sm text-gray-500">Your order has been received and is being processed.</p>
                      </div>
                    </div>
                    
                    <div className="relative flex mb-6">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shrink-0 z-10">
                        <Truck className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Shipping</h3>
                        <p className="text-sm text-gray-500">Your order will be shipped within 1-2 business days.</p>
                      </div>
                    </div>
                    
                    <div className="relative flex">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full shrink-0 z-10">
                        <Calendar className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Estimated Delivery</h3>
                        <p className="text-sm text-gray-500">
                          {estimatedDelivery.toLocaleDateString(undefined, { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/products')}
                    className="bg-cherry hover:bg-cherry/90 text-white"
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-cherry text-cherry hover:bg-cherry/10"
                    onClick={() => navigate('/')}
                  >
                    Back to Home
                  </Button>
                </div>
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

export default OrderConfirmation;
