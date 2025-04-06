
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
  // Add Stripe script to the document
  const loadStripeScript = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      if (window.Stripe) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Stripe script failed to load");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  });

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
      
      // Redirect to Stripe OAuth flow
      const stripeOAuthUrl = 'https://connect.stripe.com/oauth/authorize?redirect_uri=https://connect.stripe.com/hosted/oauth&client_id=ca_S56WMSIRv0ouWSvWKVwSTUbvsr16LDfY&state=onbrd_S56XyjvrJzUHmipKlxlxC4JJts&response_type=code&scope=read_write&stripe_user[country]=US';
      
      // Create temporary data in localStorage to remember cart items
      localStorage.setItem('pendingPayment', JSON.stringify({
        amount: options.amount,
        description: options.description,
        email: options.email,
        contact: options.contact,
        notes: options.notes
      }));
      
      // Redirect to Stripe OAuth page
      window.location.href = stripeOAuthUrl;
      
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
  }, []);

  return { initPayment };
};
