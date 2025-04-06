
import { Product } from '@/types/Product';

// Products data organized by category
export const products: Product[] = [
  // Men's Category
  {
    id: 'm1',
    name: 'Classic Fit Shirt',
    price: 1299,
    category: 'men',
    description: 'A comfortable classic fit shirt for everyday wear.',
    image: '/images/products/men-shirt-1.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Black'],
    inStock: true,
  },
  {
    id: 'm2',
    name: 'Slim Fit Jeans',
    price: 1499,
    category: 'men',
    description: 'Comfortable slim fit jeans perfect for casual occasions.',
    image: '/images/products/men-jeans-1.jpg',
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    inStock: true,
  },
  {
    id: 'm3',
    name: 'Sport Running Shoes',
    price: 2499,
    category: 'men',
    description: 'Lightweight running shoes with excellent cushioning.',
    image: '/images/products/men-shoes-1.jpg',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black/White', 'Blue/Gray'],
    inStock: true,
  },
  
  // Women's Category
  {
    id: 'w1',
    name: 'Summer Floral Dress',
    price: 1699,
    category: 'women',
    description: 'A beautiful floral dress perfect for summer days.',
    image: '/images/products/women-dress-1.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Pink', 'Floral Blue'],
    inStock: true,
  },
  {
    id: 'w2',
    name: 'High-Waist Leggings',
    price: 999,
    category: 'women',
    description: 'Comfortable high-waist leggings for workouts or casual wear.',
    image: '/images/products/women-leggings-1.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true,
  },
  {
    id: 'w3',
    name: 'Elegant Handbag',
    price: 1899,
    category: 'women',
    description: 'An elegant handbag to complement any outfit.',
    image: '/images/products/women-bag-1.jpg',
    colors: ['Brown', 'Black', 'Tan'],
    inStock: true,
  },
  
  // Kids' Category
  {
    id: 'k1',
    name: 'Cartoon Print T-shirt',
    price: 599,
    category: 'kids',
    description: 'Fun cartoon print t-shirt for kids.',
    image: '/images/products/kids-tshirt-1.jpg',
    sizes: ['2T', '3T', '4T', '5T'],
    colors: ['Blue', 'Red', 'Yellow'],
    inStock: true,
  },
  {
    id: 'k2',
    name: 'Kids Denim Shorts',
    price: 699,
    category: 'kids',
    description: 'Comfortable denim shorts for active kids.',
    image: '/images/products/kids-shorts-1.jpg',
    sizes: ['2T', '3T', '4T', '5T'],
    colors: ['Blue', 'Light Blue'],
    inStock: true,
  },
  {
    id: 'k3',
    name: 'Kids Sneakers',
    price: 899,
    category: 'kids',
    description: 'Lightweight and comfortable sneakers for active kids.',
    image: '/images/products/kids-shoes-1.jpg',
    sizes: ['5', '6', '7', '8', '9'],
    colors: ['Blue/Orange', 'Red/Black'],
    inStock: true,
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category: 'men' | 'women' | 'kids'): Product[] => {
  return products.filter(product => product.category === category);
};

// Helper function to get a product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
