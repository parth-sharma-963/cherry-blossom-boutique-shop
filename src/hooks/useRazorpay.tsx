
import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export type PaymentOptions = {
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  orderId?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string>;
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

// This hook handles Razorpay payment integration
export const useRazorpay = () => {
  // Add Razorpay script to the document
  const loadRazorpayScript = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Razorpay script failed to load");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  });

  // Initialize payment
  const initPayment = useCallback(async (options: PaymentOptions) => {
    try {
      // First, load the Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast({
          title: "Payment Failed",
          description: "Could not load payment gateway. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Configure Razorpay options
      const paymentOptions = {
        key: "rzp_test_YOUR_KEY_HERE", // REPLACE WITH YOUR KEY FROM RAZORPAY DASHBOARD
        amount: options.amount * 100, // Razorpay expects amount in paisa (1 INR = 100 paisa)
        currency: options.currency || "INR",
        name: options.name,
        description: options.description || "Purchase Payment",
        order_id: options.orderId, // This should come from your backend
        prefill: {
          email: options.email || "",
          contact: options.contact || "",
        },
        notes: options.notes || {},
        theme: {
          color: "#3B82F6", // Primary blue color
        },
        handler: function (response: any) {
          // Payment successful
          console.log("Payment successful:", response);
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          // You would typically verify this payment on your backend
          return true;
        },
        modal: {
          ondismiss: function () {
            // Payment modal closed
            console.log("Payment modal closed by user");
            toast({
              title: "Payment Cancelled",
              description: "You closed the payment window. Try again when ready.",
              variant: "destructive",
            });
          },
        },
      };

      // Create Razorpay instance and open payment modal
      const razorpay = new window.Razorpay(paymentOptions);
      razorpay.open();
      
      return true;
    } catch (error) {
      console.error("Razorpay payment error:", error);
      toast({
        title: "Payment Failed",
        description: "An error occurred while processing your payment. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, []);

  return { initPayment };
};
