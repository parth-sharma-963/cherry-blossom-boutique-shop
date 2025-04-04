
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Would handle subscription in a real app
  };

  return (
    <footer className="bg-gray-50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-cherry">Cherry</span>
              <span className="text-2xl font-light text-gray-700">Boutique</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Quality clothing and accessories for everyone. Our mission is to provide stylish, comfortable, and affordable fashion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-cherry transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-cherry transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-cherry transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-cherry transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-cherry transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-cherry transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-cherry transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-cherry transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-cherry mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Cherry Lane, Fashion District<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-cherry mr-2" />
                <span className="text-gray-600">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-cherry mr-2" />
                <span className="text-gray-600">info@cherryboutique.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter and get 10% off your first purchase.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col space-y-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="rounded-md"
                />
                <Button type="submit" className="btn-cherry w-full">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Cherry Boutique. All rights reserved.
            </p>
            <div className="flex flex-wrap space-x-4">
              <a href="#" className="text-gray-600 hover:text-cherry text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-cherry text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-cherry text-sm transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
