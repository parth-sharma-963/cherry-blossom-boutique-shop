
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing to our newsletter!");
      setEmail('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-cherry-lighter py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Join Our Newsletter</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-cherry hover:bg-cherry/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
