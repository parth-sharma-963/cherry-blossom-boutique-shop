
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { initPayment } = useRazorpay();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Start payment process
    const success = await initPayment({
      amount: totalPrice,
      name: "Your Fashion Store",
      description: `Payment for ${cartItems.length} items`,
      email: formData.email,
      contact: formData.phone,
      notes: {
        address: formData.address,
        order_items: JSON.stringify(cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })))
      }
    });

    if (success) {
      // Here you would typically send order details to your backend
      clearCart();
      // Redirect to success page or show success message
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">Add some products to your cart before checking out.</p>
        <Button onClick={() => window.location.href = '/'}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity}
                    {item.selectedSize && ` | Size: ${item.selectedSize}`}
                    {item.selectedColor && ` | Color: ${item.selectedColor}`}
                  </p>
                </div>
                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input 
                id="zipCode" 
                name="zipCode" 
                value={formData.zipCode} 
                onChange={handleInputChange} 
                required
              />
            </div>
            <Button type="submit" className="w-full mt-6">
              Pay ₹{totalPrice.toFixed(2)}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
