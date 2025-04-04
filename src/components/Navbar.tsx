
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-cherry">Cherry</span>
            <span className="text-2xl font-light">Boutique</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200 focus:border-cherry focus:ring-cherry"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-cherry transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-cherry transition-colors">
              Shop
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-cherry transition-colors">
              Categories
            </Link>
            <Link to="/login" className="flex items-center text-gray-700 hover:text-cherry transition-colors">
              <User className="h-5 w-5 mr-1" />
              <span>Login</span>
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-cherry transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cherry text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cherry text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - visible when menu is open */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-3">
            <Link to="/" className="block py-2 text-gray-700 hover:text-cherry transition-colors" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/products" className="block py-2 text-gray-700 hover:text-cherry transition-colors" onClick={toggleMenu}>
              Shop
            </Link>
            <Link to="/categories" className="block py-2 text-gray-700 hover:text-cherry transition-colors" onClick={toggleMenu}>
              Categories
            </Link>
            <Link to="/login" className="flex items-center py-2 text-gray-700 hover:text-cherry transition-colors" onClick={toggleMenu}>
              <User className="h-5 w-5 mr-2" />
              <span>Login</span>
            </Link>
          </div>
        )}
      </div>

      {/* Cherry colored line at bottom */}
      <div className="h-1 cherry-gradient"></div>
    </nav>
  );
};

export default Navbar;
