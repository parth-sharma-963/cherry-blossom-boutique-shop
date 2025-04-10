
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
  discount?: number;
  sizes?: string[];
  colors?: string[];
};

export type Category = {
  id: number;
  name: string;
  image: string;
  productCount: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Cherry Blossom Sundress",
    description: "A beautiful floral sundress with cherry blossom pattern, perfect for spring and summer days.",
    price: 59.99,
    image: "/images/cherry_blossom_sundress.jpg",
    category: "Women's Clothing",
    featured: true,
    inStock: true,
    discount: 10,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "White", "Light Blue"]
  },
  {
    id: 2,
    name: "Classic Men's Blazer",
    description: "A sophisticated blazer for men that works well for both formal occasions and casual outings.",
    price: 129.99,
    image: "/images/classic_mens_blazer.jpg",
    category: "Men's Clothing",
    featured: true,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Black", "Gray"]
  },
  {
    id: 3,
    name: "Kids' Cherry Print T-shirt",
    description: "A cute and comfortable t-shirt for kids featuring a playful cherry print design.",
    price: 24.99,
    image: "/images/kids_cherry_print.jpg",
    category: "Kids' Clothing",
    featured: false,
    inStock: true,
    sizes: ["3T", "4T", "5T", "6T"],
    colors: ["Red", "White"]
  },
  {
    id: 4,
    name: "Elegant Silk Tie",
    description: "A premium silk tie with subtle pattern, adding sophistication to any formal outfit.",
    price: 45.99,
    image: "/images/elegant_silk_tie.jpg",
    category: "Ties",
    featured: false,
    inStock: true,
    colors: ["Burgundy", "Navy", "Forest Green"]
  },
  {
    id: 5,
    name: "Luxe Leather Shoes",
    description: "Handcrafted leather shoes that combine style, comfort, and durability for everyday wear.",
    price: 159.99,
    image: "/images/luxe_leather_shoes.jpg",
    category: "Shoes",
    featured: true,
    inStock: true,
    discount: 15,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Brown", "Black"]
  },
  {
    id: 6,
    name: "Pearl Cherry Earrings",
    description: "Delicate cherry-shaped earrings with pearl accents, a perfect accessory for any occasion.",
    price: 34.99,
    image: "/images/pearl_cherry_earrings.jpg",
    category: "Accessories",
    featured: true,
    inStock: true,
    colors: ["Silver/Pearl", "Gold/Pearl"]
  },
  {
    id: 7,
    name: "Women's Denim Jacket",
    description: "A versatile denim jacket that adds a cool, casual layer to any outfit throughout the seasons.",
    price: 79.99,
    image: "/images/womens_denim_jacket.jpg",
    category: "Women's Clothing",
    featured: false,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Wash", "Medium Wash", "Dark Wash"]
  },
  {
    id: 8,
    name: "Men's Casual Chinos",
    description: "Comfortable and stylish chinos that work well for both office and weekend wear.",
    price: 69.99,
    image: "/images/men_casual_chinos.jpg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    discount: 5,
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    colors: ["Khaki", "Navy", "Olive", "Gray"]
  },
  {
    id: 9,
    name: "Cherry Blossom Perfume",
    description: "A light and floral fragrance inspired by cherry blossoms in full bloom. Perfect for spring and summer.",
    price: 85.99,
    image: "/images/photo-1618160702438-9b02ab6515c9",
    category: "Accessories",
    featured: true,
    inStock: true,
    discount: 0,
    colors: ["50ml", "100ml", "150ml"]
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Women's Clothing",
    image: "/images/womens_clothing.jpg",
    productCount: 24
  },
  {
    id: 2,
    name: "Men's Clothing",
    image: "/images/mens_clothing.jpg",
    productCount: 18
  },
  {
    id: 3,
    name: "Kids' Clothing",
    image: "/images/kids_clothing.jpg",
    productCount: 15
  },
  {
    id: 4,
    name: "Shoes",
    image: "/images/shoes.jpg",
    productCount: 12
  },
  {
    id: 5,
    name: "Ties",
    image: "/images/ties.jpg",
    productCount: 8
  },
  {
    id: 6,
    name: "Accessories",
    image: "/images/accessories.jpg",
    productCount: 20
  }
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
export const getProductById = (id: number) => products.find(product => product.id === id);

