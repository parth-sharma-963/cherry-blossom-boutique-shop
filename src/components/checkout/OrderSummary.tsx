
import React from 'react';
import { Bubbles } from '@/components/ui/bubbles';
import { CartItem } from '@/context/CartContext';

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, cartTotal }) => {
  // Calculate tax
  const tax = cartTotal * 0.08;
  // Calculate grand total
  const grandTotal = cartTotal + tax;

  return (
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
  );
};

export default OrderSummary;
