
import { useState } from 'react';
import { useScript } from './useScript';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface OrderData {
  keyId: string;
  amount: number;
  currency: string;
  orderId: string;
  orderInfo: any;
}

export const useRazorpay = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const scriptStatus = useScript('https://checkout.razorpay.com/v1/checkout.js');
  const navigate = useNavigate();

  const createPaymentSession = async (orderInfo: any) => {
    try {
      setIsSubmitting(true);
      setProcessingPayment(true);
      
      console.log("Creating payment session for order:", orderInfo);
      
      // Create payment session with Razorpay
      const response = await supabase.functions.invoke('create-payment', {
        body: { orderInfo },
      });
      
      if (response.error) {
        console.error("Payment session error:", response.error);
        throw new Error(response.error.message || 'Failed to create payment session');
      }
      
      console.log("Payment session created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment processing failed. Please try again.");
      setIsSubmitting(false);
      setProcessingPayment(false);
      return null;
    }
  };

  const handleRazorpayPayment = (orderData: OrderData, formData: any) => {
    if (scriptStatus !== 'ready') {
      toast.error("Payment system is loading. Please try again.");
      setIsSubmitting(false);
      setProcessingPayment(false);
      return;
    }
    
    console.log("Initializing Razorpay payment with order data:", orderData);
    
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Cherry Fashion",
      description: "Purchase of fashion items",
      order_id: orderData.orderId,
      handler: function(response: any) {
        console.log("Payment successful, response:", response);
        
        // Store combined order info in session storage for retrieval after payment
        const fullOrderInfo = {
          ...orderData.orderInfo,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        };
        
        sessionStorage.setItem('orderInfo', JSON.stringify(fullOrderInfo));
        navigate('/order-confirmation?payment_id=' + response.razorpay_payment_id);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#e91e63",
      },
      modal: {
        ondismiss: function() {
          console.log("Payment modal dismissed");
          setIsSubmitting(false);
          setProcessingPayment(false);
          toast.error("Payment cancelled. Please try again.");
        },
      },
    };
    
    try {
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error opening Razorpay:", error);
      toast.error("Failed to open payment window. Please try again.");
      setIsSubmitting(false);
      setProcessingPayment(false);
    }
  };

  return {
    isSubmitting,
    setIsSubmitting,
    processingPayment,
    setProcessingPayment,
    scriptStatus,
    createPaymentSession,
    handleRazorpayPayment,
  };
};
