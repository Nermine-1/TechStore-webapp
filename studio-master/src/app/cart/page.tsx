'use client';

import { useCart } from '@/hooks/use-cart';
import CartItemCard from '@/components/cart-item-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ShoppingCart, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { state, totalItems, totalPrice, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingCart className="mb-6 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-4 text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Looks like you haven't added any products yet.
        </p>
        <Button asChild size="lg">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
      <div className="space-y-6 lg:col-span-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Shopping Cart</h1>
        <div className="space-y-4">
          {state.items.map((item) => (
            <CartItemCard key={item.product.id} item={item} />
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-24"> {/* Make summary sticky on larger screens */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">FREE</span> {/* Example, can be dynamic */}
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button size="lg" asChild className="w-full">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" onClick={clearCart} className="w-full">
              Clear Cart
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-700 shadow-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
          <p>
            This is a demo store. No real payments will be processed or orders fulfilled.
          </p>
        </div>
      </div>
    </div>
  );
}
