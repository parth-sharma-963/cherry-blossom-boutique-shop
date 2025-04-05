
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Bubbles } from '@/components/ui/bubbles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useScript } from '@/hooks/useScript';

// Define the schema for the checkout form
const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "ZIP code is required" }),
  saveInfo: z.boolean().default(false),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const scriptStatus = useScript('https://checkout.razorpay.com/v1/checkout.js');
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  // Initialize form with default values
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      saveInfo: false,
    },
  });
  
  const handleRazorpayPayment = (orderData: any, formData: CheckoutFormValues) => {
    if (scriptStatus !== 'ready') {
      toast.error("Payment system is loading. Please try again.");
      setIsSubmitting(false);
      setProcessingPayment(false);
      return;
    }
    
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Cherry Fashion",
      description: "Purchase of fashion items",
      order_id: orderData.orderId,
      handler: function(response: any) {
        // Store combined order info in session storage for retrieval after payment
        const fullOrderInfo = {
          ...orderData.orderInfo,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        };
        
        sessionStorage.setItem('orderInfo', JSON.stringify(fullOrderInfo));
        clearCart();
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
          setIsSubmitting(false);
          setProcessingPayment(false);
          toast.error("Payment cancelled. Please try again.");
        },
      },
    };
    
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };
  
  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setIsSubmitting(true);
      
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
      
      setProcessingPayment(true);
      
      // Create payment session with Razorpay
      const response = await supabase.functions.invoke('create-payment', {
        body: { orderInfo },
      });
      
      if (response.error) {
        throw new Error(response.error.message || 'Failed to create payment session');
      }
      
      // Process payment with Razorpay
      handleRazorpayPayment(response.data, data);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment processing failed. Please try again.");
      setIsSubmitting(false);
      setProcessingPayment(false);
    }
  };
  
  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }
  
  // Calculate tax
  const tax = cartTotal * 0.08;
  // Calculate grand total
  const grandTotal = cartTotal + tax;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="San Francisco" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="California" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="94103" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="saveInfo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Save this information for next time
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-cherry hover:bg-cherry/90 text-white py-6"
                        disabled={isSubmitting || scriptStatus !== 'ready'}
                      >
                        {processingPayment ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : isSubmitting ? (
                          "Processing..."
                        ) : (
                          "Proceed to Payment"
                        )}
                      </Button>
                      
                      {scriptStatus === 'loading' && (
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Loading payment system...
                        </p>
                      )}
                      
                      {scriptStatus === 'error' && (
                        <p className="text-sm text-red-500 mt-2 text-center">
                          Failed to load payment system. Please refresh the page.
                        </p>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative overflow-hidden">
                <Bubbles 
                  className="absolute inset-0 z-0 opacity-5" 
                  bubbleCount={8} 
                  colors={["#e1bee7", "#f8bbd0", "#ffcdd2"]} 
                  maxSize={80}
                  minSize={20}
                  speed={15}
                />
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-white rounded overflow-hidden mr-3 border border-gray-200">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-cherry/10 rounded-md border border-cherry/20">
                    <p className="text-sm text-gray-700">
                      You can edit your shipping address and other details in the form on the left.
                    </p>
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

export default Checkout;
