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

  // Animated gradient background
  // You can move this <style> to your global layout for all pages!
  // This is for demonstration on this page only.
  // Remove if already in your global layout.
  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(-45deg, #a18cd1, #fbc2eb, #fad0c4, #ffd6e0);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>
      {state.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart className="mb-6 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-4 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Your Cart is Empty
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Looks like you haven't added any products yet.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold shadow-lg hover:from-pink-400 hover:to-yellow-300 transition-all duration-300 rounded-xl">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
          <div className="space-y-6 lg:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
            <div className="space-y-4">
              {state.items.map((item) => (
                <CartItemCard key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <Card className="shadow-2xl rounded-3xl border-0 bg-white/90 backdrop-blur-md transition-transform hover:scale-105 duration-300">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button size="lg" asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold shadow-lg hover:from-pink-400 hover:to-yellow-300 transition-all duration-300 rounded-xl">
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" onClick={clearCart} className="w-full rounded-xl">
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
      )}
    </>
  );
}
