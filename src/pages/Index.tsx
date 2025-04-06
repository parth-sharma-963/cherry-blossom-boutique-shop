
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const Index = () => {
  const { addToCart, totalItems } = useCart();
  const [activeCategory, setActiveCategory] = useState<'men' | 'women' | 'kids'>('men');

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Fashion Store</h1>
        <Link to="/checkout" className="relative">
          <Button variant="outline" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2">
              {totalItems}
            </Badge>
          )}
        </Link>
      </header>

      <Tabs defaultValue="men" className="mb-6" onValueChange={(value) => setActiveCategory(value as 'men' | 'women' | 'kids')}>
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="men" className="flex-1">Men</TabsTrigger>
          <TabsTrigger value="women" className="flex-1">Women</TabsTrigger>
          <TabsTrigger value="kids" className="flex-1">Kids</TabsTrigger>
        </TabsList>
        
        {['men', 'women', 'kids'].map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(product => product.category === category)
                .map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          // Fallback image if product image fails to load
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-gray-500">{product.description}</p>
                      <p className="text-lg font-bold mt-2">₹{product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full" onClick={() => handleAddToCart(product.id)}>
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;
