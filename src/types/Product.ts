
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women' | 'kids';
  description: string;
  image: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
