'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: `${product.name} added to cart!`,
      description: "You can view your cart or continue shopping.",
    });
  };

  const coverImage = product.images[product.coverImageIndex ?? 0] || 'https://placehold.co/600x400.png';

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={coverImage}
              alt={`Image of ${product.name}`}
              width={600}
              height={450}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              data-ai-hint={`${product.category.toLowerCase()} tech product`}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between p-4">
        <div>
          <Link href={`/products/${product.id}`} className="hover:underline">
            <CardTitle className="mb-2 text-xl font-semibold leading-tight">
              {product.name}
            </CardTitle>
          </Link>
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{product.shortDescription}</p>
        </div>
        <p className="text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button variant="outline" asChild className="w-full">
          <Link href={`/products/${product.id}`}>
            <Eye className="mr-2 h-4 w-4" /> View
          </Link>
        </Button>
        <Button onClick={handleAddToCart} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
