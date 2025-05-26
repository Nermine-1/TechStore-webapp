'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { Minus, Plus, Trash2, XCircle } from 'lucide-react';
import { ChangeEvent } from 'react';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      updateQuantity(item.product.id, 1); 
    } else if (newQuantity > item.product.stock) {
      updateQuantity(item.product.id, item.product.stock);
      toast({
        title: `Limited Stock for ${item.product.name}`,
        description: `Maximum ${item.product.stock} units available.`,
        variant: "destructive",
      });
    }
    else {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemoveItem = () => {
    removeFromCart(item.product.id);
    toast({
      title: `${item.product.name} removed from cart.`,
      action: <XCircle className="text-red-500" />,
    });
  };

  const coverImageIndex =
    typeof item.product.coverImageIndex === 'number' &&
    item.product.coverImageIndex >= 0 &&
    item.product.coverImageIndex < item.product.images.length
      ? item.product.coverImageIndex
      : 0;
  const coverImage = item.product.images[coverImageIndex] || 'https://placehold.co/100x100.png';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleQuantityChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <Link href={`/products/${item.product.id}`} className="shrink-0">
        <Image
          src={coverImage}
          alt={item.product.name}
          width={100}
          height={100}
          className="h-24 w-24 rounded-md object-cover"
          data-ai-hint={`${item.product.category.toLowerCase()} cart item`}
        />
      </Link>
      <div className="flex-grow space-y-1">
        <Link href={`/products/${item.product.id}`} className="hover:underline">
          <h3 className="text-lg font-semibold">{item.product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">Price: ${item.product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={handleInputChange}
            className="h-8 w-14 text-center"
            min="1"
            max={item.product.stock}
            aria-label="Item quantity"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.product.stock}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
          {item.quantity > item.product.stock && (
            <p className="text-xs text-destructive mt-1">Max stock: {item.product.stock}</p>
          )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-lg font-semibold text-primary">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={handleRemoveItem}
          aria-label="Remove item from cart"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
