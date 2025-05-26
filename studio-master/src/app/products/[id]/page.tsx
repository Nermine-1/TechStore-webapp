
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/mock-data';
import type { Product, ProductReview as ReviewType } from '@/lib/types';
import ProductImageGallery from '@/components/product-image-gallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, ShoppingCart, MessageSquare, Minus, Plus, CheckCircle,
  Smartphone, Laptop, Headphones, HardDrive, Cpu, MemoryStick, Palette, Zap, LucideIcon,
  Keyboard, Camera // Added Keyboard and Camera
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const iconComponents: Record<string, LucideIcon | undefined> = {
  Smartphone,
  Laptop,
  Headphones,
  HardDrive,
  Cpu,
  MemoryStick,
  Palette,
  Zap,
  MessageSquare,
  Keyboard, // Added Keyboard
  Camera,   // Added Camera
};

function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h1 className="mb-4 text-4xl font-bold">Product Not Found</h1>
      <p className="text-lg text-muted-foreground">
        Sorry, we couldn't find the product you're looking for.
      </p>
      <Button asChild className="mt-6">
        <a href="/">Go Back Home</a>
      </Button>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <Card className="mb-4 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarImage src={review.avatar} alt={review.author} data-ai-hint="user avatar" />
          <AvatarFallback>{review.author.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-md">{review.author}</CardTitle>
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`}
                />
              ))}
          </div>
        </div>
        <span className="ml-auto text-xs text-muted-foreground">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const [product, setProduct] = useState<Product | null | undefined>(undefined); // undefined for loading, null for not found
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getItemQuantity } = useCart();
  
  const currentCartQuantity = product ? getItemQuantity(product.id) : 0;

  useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      setProduct(fetchedProduct || null);
    }
  }, [id]);

  if (product === undefined) {
    // Optional: Add a loading spinner here
    return <div className="py-12 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: `${quantity} x ${product.name} added to cart!`,
      description: `Total in cart: ${currentCartQuantity + quantity}`,
      action: <CheckCircle className="text-green-500" />,
    });
    setQuantity(1); // Reset quantity input after adding
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) setQuantity(1);
    else if (newQuantity > product.stock) setQuantity(product.stock);
    else setQuantity(newQuantity);
  };

  const CategoryIconComponent = product.categoryIconName ? iconComponents[product.categoryIconName] : null;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <ProductImageGallery images={product.images} productName={product.name} />
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tight lg:text-4xl">{product.name}</CardTitle>
              {CategoryIconComponent && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  <CategoryIconComponent className="h-3.5 w-3.5" />
                  {product.category}
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{product.shortDescription}</p>
              <p className="text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
              <div className="text-sm text-green-600 font-medium">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || product.stock === 0}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value,10))}
                  className="w-16 text-center"
                  min="1"
                  max={product.stock}
                  disabled={product.stock === 0}
                  aria-label="Product quantity"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock || product.stock === 0}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                size="lg" 
                onClick={handleAddToCart} 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={product.stock === 0 || quantity > product.stock - currentCartQuantity}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
               {quantity > product.stock - currentCartQuantity && product.stock > 0 && (
                <p className="text-sm text-destructive">Not enough stock for desired quantity (in cart: {currentCartQuantity}).</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <p className="text-foreground leading-relaxed">{product.longDescription}</p>
      </div>

      {product.specifications && product.specifications.length > 0 && (
        <>
          <Separator />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Specifications</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Feature</TableHead>
                      <TableHead>Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.specifications.map((spec, index) => {
                      const SpecIconComponent = spec.iconName ? iconComponents[spec.iconName] : null;
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium flex items-center gap-2">
                            {SpecIconComponent && <SpecIconComponent className="h-4 w-4 text-muted-foreground" />}
                            {spec.name}
                          </TableCell>
                          <TableCell>{spec.value}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {product.reviews && product.reviews.length > 0 && (
        <>
          <Separator />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Customer Reviews</h2>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                {product.reviews.length} reviews
              </span>
            </div>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

    