
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  // Calculate discount price if available
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100)) 
    : null;
  
  return (
    <div className="product-card-hover bg-white rounded-lg overflow-hidden shadow">
      <Link to={`/product/${product.id}`} className="block relative">
        {/* Product image */}
        <div className="h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Discount badge */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-cherry text-white text-sm font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </Link>
      
      {/* Product details */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-cherry transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-3 flex items-center">
          {discountedPrice ? (
            <>
              <span className="text-cherry font-bold text-lg mr-2">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {product.category}
          </span>
          
          <Button 
            onClick={handleAddToCart} 
            size="sm" 
            className="btn-cherry"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
