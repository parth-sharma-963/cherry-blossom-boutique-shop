
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
    image: "/lovable-uploads/de57a08f-ef18-4f1d-a820-bdb80439b235.png",
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
    image: "/lovable-uploads/3a82a4f0-4508-4be5-a655-288f165bf009.png",
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
    image: "/lovable-uploads/ba53ffc3-66f9-43c4-9926-845aace8dcef.png",
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
    image: "/lovable-uploads/7f0f7727-1f90-4d1c-8515-e1cd84cce826.png",
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
    image: "/lovable-uploads/a84362f7-907c-4a86-986e-10cf65ad9ab4.png",
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
    image: "/lovable-uploads/0bd7e996-2729-4485-b1d0-f261992670b2.png",
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
    image: "/lovable-uploads/913abd34-70a0-48f3-8e21-c7a042c6be09.png",
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
    image: "/lovable-uploads/053b9d6e-b78e-4825-90ee-86d96c06f5a3.png",
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
    image: "/lovable-uploads/325019af-719a-4a54-8e0c-ff6c3cdef63b.png",
    productCount: 24
  },
  {
    id: 2,
    name: "Men's Clothing",
    image: "/lovable-uploads/eb3bee12-761e-4a4c-ba99-33d466502bcf.png",
    productCount: 18
  },
  {
    id: 3,
    name: "Kids' Clothing",
    image: "/lovable-uploads/ba53ffc3-66f9-43c4-9926-845aace8dcef.png",
    productCount: 15
  },
  {
    id: 4,
    name: "Shoes",
    image: "/lovable-uploads/a84362f7-907c-4a86-986e-10cf65ad9ab4.png",
    productCount: 12
  },
  {
    id: 5,
    name: "Ties",
    image: "/lovable-uploads/7f0f7727-1f90-4d1c-8515-e1cd84cce826.png",
    productCount: 8
  },
  {
    id: 6,
    name: "Accessories",
    image: "/lovable-uploads/0bd7e996-2729-4485-b1d0-f261992670b2.png",
    productCount: 20
  }
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
export const getProductById = (id: number) => products.find(product => product.id === id);
