
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
    Stripe: any;
  }
}

// This hook handles Stripe payment integration
export const useStripe = () => {
  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RAxUwQ4859M5SqJjAiumjk8W5o62UhEcq4zEFbkKkXc5B2tqIStjOlNTvl5geHTQxTcHpCtlGDOd0gDi5xWvwPy00z5R8Y0Wo';
  
  // Add Stripe script to the document
  const loadStripeScript = useCallback(() => {
    return new Promise<boolean>((resolve, reject) => {
      if (window.Stripe) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Stripe script failed to load");
        reject(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  // Initialize payment
  const initPayment = useCallback(async (options: PaymentOptions) => {
    try {
      // First, load the Stripe script
      const isLoaded = await loadStripeScript();
      if (!isLoaded) {
        toast({
          title: "Payment Failed",
          description: "Could not load payment gateway. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Initialize Stripe with the publishable key
      const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
      
      // Save order details in localStorage for retrieval after payment
      localStorage.setItem('pendingPayment', JSON.stringify({
        amount: options.amount,
        description: options.description,
        email: options.email,
        contact: options.contact,
        notes: options.notes
      }));
      
      // Open Stripe Checkout
      const result = await stripe.redirectToCheckout({
        lineItems: [{
          price_data: {
            currency: options.currency || 'inr',
            product_data: {
              name: options.name,
              description: options.description || '',
            },
            unit_amount: Math.round(options.amount * 100), // Convert to smallest currency unit
          },
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/checkout?success=true`,
        cancelUrl: `${window.location.origin}/checkout?canceled=true`,
      });
      
      if (result.error) {
        console.error("Stripe checkout error:", result.error);
        toast({
          title: "Payment Failed",
          description: result.error.message || "An error occurred during checkout",
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Stripe payment error:", error);
      toast({
        title: "Payment Failed",
        description: "An error occurred while processing your payment. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [loadStripeScript]);

  return { initPayment };
};
