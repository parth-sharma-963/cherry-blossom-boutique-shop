
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Bubbles } from '@/components/ui/bubbles';
import { CheckCircle, ShoppingBag } from 'lucide-react';

type OrderInfo = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: any[];
  total: number;
  orderNumber: string;
  orderDate: string;
  paymentId?: string;
  signature?: string;
};

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const paymentId = searchParams.get('payment_id');
  
  useEffect(() => {
    // Retrieve order info from session storage
    const storedOrderInfo = sessionStorage.getItem('orderInfo');
    if (storedOrderInfo) {
      setOrderInfo(JSON.parse(storedOrderInfo));
    }
  }, []);
  
  if (!orderInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Information Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn't find your order information. This might happen if you refreshed the page or accessed it directly.
            </p>
            <Link to="/">
              <Button className="bg-cherry hover:bg-cherry/90">Return to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Calculate tax and total
  const tax = orderInfo.total * 0.08;
  const grandTotal = orderInfo.total + tax;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
              <Bubbles 
                className="absolute inset-0 z-0 opacity-5" 
                bubbleCount={12} 
                colors={["#e1bee7", "#f8bbd0", "#ffcdd2"]} 
                maxSize={100}
                minSize={20}
                speed={15}
              />
              
              <div className="p-6 md:p-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                  <p className="text-gray-600">
                    Thank you for your purchase. Your order has been received and is being processed.
                  </p>
                </div>
                
                <div className="border-t border-b border-gray-200 py-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="font-semibold text-gray-900 mb-2">Order Information</h2>
                      <p className="text-gray-600">Order Number: <span className="font-medium">{orderInfo.orderNumber}</span></p>
                      <p className="text-gray-600">Date: <span className="font-medium">{new Date(orderInfo.orderDate).toLocaleDateString()}</span></p>
                      <p className="text-gray-600">Payment ID: <span className="font-medium">{paymentId || orderInfo.paymentId || "N/A"}</span></p>
                    </div>
                    
                    <div>
                      <h2 className="font-semibold text-gray-900 mb-2">Shipping Details</h2>
                      <p className="text-gray-600">{orderInfo.firstName} {orderInfo.lastName}</p>
                      <p className="text-gray-600">{orderInfo.address}</p>
                      <p className="text-gray-600">{orderInfo.city}, {orderInfo.state} {orderInfo.zipCode}</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {orderInfo.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${orderInfo.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t border-gray-200 text-lg font-bold">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/">
                    <Button className="w-full bg-cherry hover:bg-cherry/90">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
              <p className="text-gray-700 mb-2">
                A confirmation email has been sent to <span className="font-medium">{orderInfo.email}</span>
              </p>
              <p className="text-gray-600 text-sm">
                If you don't receive it within a few minutes, please check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
