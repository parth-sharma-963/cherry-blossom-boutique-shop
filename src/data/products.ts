
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
  // Original products
  {
    id: 1,
    name: "Cherry Blossom Sundress",
    description: "A beautiful floral sundress with cherry blossom pattern, perfect for spring and summer days.",
    price: 59.99,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    discount: 5,
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    colors: ["Khaki", "Navy", "Olive", "Gray"]
  },
  
  // New products - Women's Clothing
  {
    id: 9,
    name: "Bohemian Maxi Dress",
    description: "A flowing bohemian maxi dress with intricate patterns, perfect for summer days and beach outings.",
    price: 89.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: false,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Teal", "Coral", "Ivory"]
  },
  {
    id: 10,
    name: "Tailored Women's Blazer",
    description: "A professionally tailored blazer that adds sophistication to any office or formal ensemble.",
    price: 119.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: false,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"]
  },
  {
    id: 11,
    name: "Floral Midi Skirt",
    description: "A versatile midi skirt with beautiful floral patterns that transitions seamlessly from day to night.",
    price: 65.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: false,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Lavender", "Sage", "Blush"]
  },
  {
    id: 12,
    name: "Cashmere Sweater",
    description: "A luxuriously soft cashmere sweater that provides warmth and elegance during colder months.",
    price: 149.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: true,
    inStock: true,
    discount: 8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Camel", "Gray"]
  },
  {
    id: 13,
    name: "High-Waisted Jeans",
    description: "Flattering high-waisted jeans that combine comfort and style for everyday wear.",
    price: 79.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: false,
    inStock: true,
    sizes: ["24", "26", "28", "30", "32", "34"],
    colors: ["Medium Wash", "Dark Wash", "Black"]
  },
  {
    id: 14,
    name: "Satin Blouse",
    description: "An elegant satin blouse with a luxurious sheen, suitable for both office wear and evening events.",
    price: 59.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: false,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Blush", "Emerald"]
  },
  {
    id: 15,
    name: "Linen Summer Pants",
    description: "Breathable linen pants perfect for hot summer days, combining comfort with effortless style.",
    price: 69.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: false,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Dusty Rose"]
  },
  {
    id: 16,
    name: "Cherry Print Wrap Dress",
    description: "A flattering wrap dress with a playful cherry print, perfect for summer gatherings and casual dates.",
    price: 74.99,
    image: "/placeholder.svg",
    category: "Women's Clothing",
    featured: true,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red/White", "Navy/White"]
  },
  
  // New products - Men's Clothing
  {
    id: 17,
    name: "Slim Fit Oxford Shirt",
    description: "A timeless Oxford shirt with a modern slim fit, suitable for both business and casual settings.",
    price: 59.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"]
  },
  {
    id: 18,
    name: "Wool Dress Pants",
    description: "Premium wool dress pants with a tailored fit, essential for professional wardrobes.",
    price: 89.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Charcoal", "Navy", "Black"]
  },
  {
    id: 19,
    name: "Casual Denim Shirt",
    description: "A versatile denim shirt that can be dressed up or down for various occasions.",
    price: 54.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Light Wash", "Medium Wash"]
  },
  {
    id: 20,
    name: "Merino Wool Sweater",
    description: "A soft, breathable Merino wool sweater that provides warmth without bulk.",
    price: 79.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Forest Green", "Burgundy"]
  },
  {
    id: 21,
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with just the right amount of stretch for comfort and style.",
    price: 69.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: true,
    inStock: true,
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Dark Wash", "Black", "Medium Wash"]
  },
  {
    id: 22,
    name: "Performance Polo Shirt",
    description: "A moisture-wicking polo shirt designed for comfort during active days or casual outings.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Gray", "Black", "White"]
  },
  {
    id: 23,
    name: "Linen Summer Shirt",
    description: "A lightweight linen shirt that keeps you cool and stylish during hot summer days.",
    price: 64.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Sky Blue", "Beige"]
  },
  {
    id: 24,
    name: "Cherry Embroidered Polo",
    description: "A premium cotton polo with subtle cherry embroidery, adding a touch of uniqueness to your casual style.",
    price: 59.99,
    image: "/placeholder.svg",
    category: "Men's Clothing",
    featured: true,
    inStock: true,
    discount: 5,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Navy", "Burgundy"]
  },
  
  // New products - Kids' Clothing
  {
    id: 25,
    name: "Dinosaur Print Pajamas",
    description: "Soft and comfortable pajamas with fun dinosaur prints that kids will love.",
    price: 32.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: false,
    inStock: true,
    sizes: ["2T", "3T", "4T", "5T", "6T"],
    colors: ["Blue", "Green"]
  },
  {
    id: 26,
    name: "Girls' Tulle Party Dress",
    description: "A magical tulle dress that's perfect for birthday parties and special occasions.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: true,
    inStock: true,
    sizes: ["2T", "3T", "4T", "5T", "6T"],
    colors: ["Pink", "Lavender", "Mint"]
  },
  {
    id: 27,
    name: "Boys' Graphic Hoodie",
    description: "A cozy hoodie with cool graphic designs that offers both style and warmth.",
    price: 39.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: false,
    inStock: true,
    sizes: ["2T", "3T", "4T", "5T", "6T", "7", "8"],
    colors: ["Navy", "Red", "Gray"]
  },
  {
    id: 28,
    name: "Overall Shorts Set",
    description: "Adorable overall shorts set with a matching t-shirt, perfect for playground adventures.",
    price: 44.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: false,
    inStock: true,
    sizes: ["12M", "18M", "2T", "3T", "4T"],
    colors: ["Denim/White", "Denim/Striped"]
  },
  {
    id: 29,
    name: "Kids' Rain Jacket",
    description: "A waterproof rain jacket with fun patterns to keep kids dry during rainy days.",
    price: 36.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: false,
    inStock: true,
    discount: 10,
    sizes: ["2T", "3T", "4T", "5T", "6T", "7", "8"],
    colors: ["Yellow", "Blue", "Rainbow"]
  },
  {
    id: 30,
    name: "School Uniform Polo",
    description: "Durable, comfortable polo shirts that meet most school uniform requirements.",
    price: 22.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: false,
    inStock: true,
    sizes: ["4", "5", "6", "7", "8", "10", "12"],
    colors: ["White", "Navy", "Light Blue"]
  },
  {
    id: 31,
    name: "Cherry Pattern Swimsuit",
    description: "A playful cherry-patterned swimsuit for kids that's perfect for beach days and pool parties.",
    price: 29.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: true,
    inStock: true,
    sizes: ["2T", "3T", "4T", "5T", "6T", "7", "8"],
    colors: ["Red/White", "Blue/Red"]
  },
  {
    id: 32,
    name: "Cozy Winter Beanie",
    description: "A soft, warm beanie to keep little heads warm during winter adventures.",
    price: 19.99,
    image: "/placeholder.svg",
    category: "Kids' Clothing",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Blue", "Gray", "Red"]
  },
  
  // New products - Shoes
  {
    id: 33,
    name: "Women's Leather Ankle Boots",
    description: "Stylish leather ankle boots with a comfortable heel, perfect for fall and winter outfits.",
    price: 149.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: false,
    inStock: true,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["Black", "Brown", "Tan"]
  },
  {
    id: 34,
    name: "Men's Derby Dress Shoes",
    description: "Classic derby dress shoes crafted from premium leather, suitable for formal occasions.",
    price: 129.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: false,
    inStock: true,
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["Black", "Brown"]
  },
  {
    id: 35,
    name: "Kids' Light-Up Sneakers",
    description: "Fun sneakers with light-up soles that kids will love wearing for play and casual outings.",
    price: 39.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: true,
    inStock: true,
    sizes: ["10C", "11C", "12C", "13C", "1Y", "2Y", "3Y"],
    colors: ["Blue/Red", "Pink/Purple", "Black/Green"]
  },
  {
    id: 36,
    name: "Women's Ballet Flats",
    description: "Elegant ballet flats that offer comfort and style for everyday wear or special occasions.",
    price: 69.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: false,
    inStock: true,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["Black", "Nude", "Red", "Navy"]
  },
  {
    id: 37,
    name: "Men's Leather Loafers",
    description: "Sophisticated leather loafers that can be dressed up or down for various occasions.",
    price: 119.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: false,
    inStock: true,
    discount: 10,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Brown", "Black", "Tan"]
  },
  {
    id: 38,
    name: "Women's Running Shoes",
    description: "Performance running shoes designed for comfort and support during your workouts.",
    price: 109.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: true,
    inStock: true,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["Black/Pink", "Gray/Teal", "White/Purple"]
  },
  {
    id: 39,
    name: "Men's Canvas Sneakers",
    description: "Casual canvas sneakers that add a relaxed touch to any casual outfit.",
    price: 54.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: false,
    inStock: true,
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["White", "Black", "Navy", "Red"]
  },
  {
    id: 40,
    name: "Cherry Blossom Embroidered Flats",
    description: "Delicate flats featuring beautiful cherry blossom embroidery, adding a touch of spring to any outfit.",
    price: 79.99,
    image: "/placeholder.svg",
    category: "Shoes",
    featured: true,
    inStock: true,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["Blush", "White", "Black"]
  },
  
  // New products - Ties
  {
    id: 41,
    name: "Paisley Pattern Silk Tie",
    description: "A luxurious silk tie with a classic paisley pattern for timeless elegance.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: false,
    inStock: true,
    colors: ["Navy/Gold", "Burgundy/Silver", "Green/Blue"]
  },
  {
    id: 42,
    name: "Striped Silk Tie",
    description: "A refined striped silk tie that adds sophistication to any formal outfit.",
    price: 47.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: true,
    inStock: true,
    colors: ["Navy/Red", "Black/Silver", "Burgundy/Gold"]
  },
  {
    id: 43,
    name: "Polka Dot Tie",
    description: "A playful yet elegant polka dot tie that adds character to business and formal attire.",
    price: 42.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: false,
    inStock: true,
    colors: ["Navy/White", "Black/White", "Burgundy/White"]
  },
  {
    id: 44,
    name: "Solid Color Knit Tie",
    description: "A textured knit tie that adds depth and interest to simple shirt and suit combinations.",
    price: 39.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: false,
    inStock: true,
    colors: ["Navy", "Black", "Burgundy", "Forest Green"]
  },
  {
    id: 45,
    name: "Novelty Print Tie",
    description: "A conversation-starting tie with unique, subtle prints that express personality while remaining professional.",
    price: 44.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: false,
    inStock: true,
    colors: ["Blue/Anchor Print", "Gray/Bicycle Print", "Navy/Constellation Print"]
  },
  {
    id: 46,
    name: "Skinny Solid Tie",
    description: "A modern skinny tie in solid colors for a contemporary, sleek look.",
    price: 38.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: false,
    inStock: true,
    colors: ["Black", "Navy", "Burgundy", "Gray"]
  },
  {
    id: 47,
    name: "Wide Striped Tie",
    description: "A bold wide-striped tie that makes a confident statement with formal attire.",
    price: 46.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: false,
    inStock: true,
    colors: ["Navy/Red", "Black/Gray", "Burgundy/Navy"]
  },
  {
    id: 48,
    name: "Cherry Blossom Print Tie",
    description: "A unique tie featuring an elegant cherry blossom print, perfect for spring events.",
    price: 52.99,
    image: "/placeholder.svg",
    category: "Ties",
    featured: true,
    inStock: true,
    discount: 5,
    colors: ["Navy/Pink", "Black/Pink", "White/Pink"]
  },
  
  // New products - Accessories
  {
    id: 49,
    name: "Leather Wallet",
    description: "A premium leather wallet with multiple card slots and compartments for organization.",
    price: 59.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: false,
    inStock: true,
    colors: ["Brown", "Black", "Tan"]
  },
  {
    id: 50,
    name: "Silk Scarf",
    description: "A versatile silk scarf that adds elegance and color to any outfit.",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: false,
    inStock: true,
    colors: ["Floral Print", "Geometric Print", "Animal Print"]
  },
  {
    id: 51,
    name: "Beaded Bracelet Set",
    description: "A set of three coordinating beaded bracelets that can be worn together or separately.",
    price: 29.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: false,
    inStock: true,
    colors: ["Gold/Neutral", "Silver/Blue", "Rose Gold/Pink"]
  },
  {
    id: 52,
    name: "Leather Belt",
    description: "A high-quality leather belt with a classic buckle for everyday wear.",
    price: 45.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Black", "Tan"]
  },
  {
    id: 53,
    name: "Statement Necklace",
    description: "A bold statement necklace that elevates simple outfits to eye-catching ensembles.",
    price: 42.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: true,
    inStock: true,
    colors: ["Gold/Crystal", "Silver/Blue", "Rose Gold/Pink"]
  },
  {
    id: 54,
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses that provide style and UV protection.",
    price: 69.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: false,
    inStock: true,
    colors: ["Gold/Green", "Silver/Gray", "Black/Black"]
  },
  {
    id: 55,
    name: "Leather Gloves",
    description: "Elegant leather gloves that keep hands warm while adding sophistication to winter outfits.",
    price: 54.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L"],
    colors: ["Black", "Brown", "Burgundy"]
  },
  {
    id: 56,
    name: "Cherry Blossom Hair Pins",
    description: "Delicate cherry blossom-shaped hair pins that add a touch of spring to any hairstyle.",
    price: 24.99,
    image: "/placeholder.svg",
    category: "Accessories",
    featured: true,
    inStock: true,
    colors: ["Silver/Pink", "Gold/Pink", "Rose Gold/Pink"]
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Women's Clothing",
    image: "/placeholder.svg",
    productCount: 24
  },
  {
    id: 2,
    name: "Men's Clothing",
    image: "/placeholder.svg",
    productCount: 18
  },
  {
    id: 3,
    name: "Kids' Clothing",
    image: "/placeholder.svg",
    productCount: 15
  },
  {
    id: 4,
    name: "Shoes",
    image: "/placeholder.svg",
    productCount: 12
  },
  {
    id: 5,
    name: "Ties",
    image: "/placeholder.svg",
    productCount: 8
  },
  {
    id: 6,
    name: "Accessories",
    image: "/placeholder.svg",
    productCount: 20
  }
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
export const getProductById = (id: number) => products.find(product => product.id === id);
