
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Json } from '@/integrations/supabase/types'; // Import the Json type from Supabase

type OrderDetails = {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
    phone: string;
  };
};

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get the order ID from the location state or fallback to URL params
  const orderId = location.state?.orderId;
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      
      try {
        // Get the order details
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();
          
        if (error) {
          throw error;
        }
        
        // Fix: Cast the data to OrderDetails and ensure shipping_address has the expected structure
        if (data && data.shipping_address) {
          const shippingAddress = data.shipping_address as {
            firstName: string;
            lastName: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            email: string;
            phone: string;
          };
          
          setOrder({
            id: data.id,
            created_at: data.created_at,
            status: data.status,
            total_amount: data.total_amount,
            shipping_address: shippingAddress
          });
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded w-full max-w-md mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!orderId || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    );
  }
  
  // Format date to be more readable
  const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>
        
        <div className="border-t border-b py-4 my-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order Number:</span>
            <span className="text-gray-700">{order.id.substring(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Date:</span>
            <span className="text-gray-700">{orderDate}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Status:</span>
            <span className="text-gray-700 capitalize">{order.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="text-gray-700">${order.total_amount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-3">Shipping Information</h2>
          <div className="text-gray-700">
            <p>{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
            <p>{order.shipping_address.address}</p>
            <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zipCode}</p>
            <p>{order.shipping_address.email}</p>
            <p>{order.shipping_address.phone}</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">We've sent a confirmation email to {order.shipping_address.email}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate('/account/orders')}>
              View All Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
