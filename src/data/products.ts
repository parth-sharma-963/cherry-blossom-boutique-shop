
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
    image: "/lovable-uploads/9e79cbb8-ea95-48c5-bafe-8c84bde5c4e6.png", // Updated to cherry blossom sundress
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
    image: "/lovable-uploads/fba3c47d-55aa-4e20-8e4d-de3ac0faa47a.png", // Updated to classic men's blazer
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
    image: "/lovable-uploads/50022c16-0d98-4d14-aa68-58b5ae1ab2ff.png", // Updated to kids' cherry print t-shirt
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
    image: "/lovable-uploads/e3a3f086-99b1-40f8-8dff-39c1d77fac6b.png", // Updated to elegant silk tie
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
    image: "/lovable-uploads/b35878f5-8c18-49cc-9ef1-b66ddd05425a.png", // Updated to luxe leather shoes
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
    image: "/lovable-uploads/2c144658-d23c-4d27-94dc-7b5664fb6282.png", // Updated to pearl cherry earrings
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
    image: "/lovable-uploads/61830f9a-c631-4a2b-875e-db06336e8868.png", // Updated to women's denim jacket
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
    image: "/lovable-uploads/6c4bfd25-29d9-4495-b7da-167631f6604e.png", // Updated to men's casual chinos
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    discount: 5,
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    colors: ["Khaki", "Navy", "Olive", "Gray"]
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Women's Clothing",
    image: "/lovable-uploads/39c2ae81-b861-4d9f-b990-69f6407bdd89.png", // Updated to women's clothing category
    productCount: 24
  },
  {
    id: 2,
    name: "Men's Clothing",
    image: "/lovable-uploads/1e696a7f-694a-4021-a21a-ed24e64d61e2.png", // Updated to men's clothing category
    productCount: 18
  },
  {
    id: 3,
    name: "Kids' Clothing",
    image: "/lovable-uploads/55041c0e-4648-4321-96e8-13b021280a80.png", // Updated to kids' clothing category
    productCount: 15
  },
  {
    id: 4,
    name: "Shoes",
    image: "/lovable-uploads/703f16f4-ca7e-43de-8b77-73bf5a382c98.png", // Updated to shoes category
    productCount: 12
  },
  {
    id: 5,
    name: "Ties",
    image: "/lovable-uploads/8cc7db8c-ab39-444b-bcb5-06e6cddd8f4d.png", // Updated to ties category
    productCount: 8
  },
  {
    id: 6,
    name: "Accessories",
    image: "/lovable-uploads/2c83b99e-4de7-4164-a3cc-ba92bcf01b31.png", // Updated to accessories category
    productCount: 20
  }
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
export const getProductById = (id: number) => products.find(product => product.id === id);
