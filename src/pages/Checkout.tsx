
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import CheckoutForm, { CheckoutFormValues } from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useRazorpay } from '@/hooks/useRazorpay';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { 
    isSubmitting, 
    processingPayment, 
    scriptStatus,
    createPaymentSession,
    handleRazorpayPayment,
  } = useRazorpay();
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      // Generate order number
      const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      
      // Create order info object
      const orderInfo = {
        ...data,
        items: cartItems,
        total: cartTotal,
        orderNumber,
        orderDate: new Date(),
      };
      
      // Create payment session with Razorpay
      const paymentSession = await createPaymentSession(orderInfo);
      
      if (!paymentSession) {
        return;
      }
      
      // Process payment with Razorpay
      handleRazorpayPayment(paymentSession, data);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment processing failed. Please try again.");
    }
  };
  
  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm 
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                processingPayment={processingPayment}
                paymentSystemStatus={scriptStatus}
              />
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
