'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle, CheckCircle, ShoppingBag, CreditCard } from 'lucide-react';
import PayPalButton from '@/components/paypal-button';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from 'react';
import { orders } from '@/lib/api';

const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z.string().min(3, { message: "Postal code must be at least 3 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const { state, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    // Redirect to home if cart is empty.
    // This check is done in useEffect to prevent attempting to navigate during render.
    if (typeof window !== 'undefined' && state.items.length === 0) {
      router.push('/');
    }
  }, [state.items, router]);


  // If cart is empty, render nothing or a loading state while redirecting.
  // This prevents rendering the form momentarily before redirection.
  if (state.items.length === 0) {
    return <div className="py-12 text-center">Loading...</div>; // Or null, or a more specific loading component
  }

  const handlePlaceOrder = async (data: CheckoutFormValues) => {
    console.log('Submitting order form', data);
    try {
      // Prepare order data
      const orderPayload = {
        customerName: data.fullName,
        total: totalPrice,
        products: state.items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      };
      console.log('Order payload:', orderPayload);
      // Send order to backend
      const response = await orders.create(orderPayload);
      console.log('Order created response:', response);
      toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. Your order has been placed.',
        action: <CheckCircle className="text-green-500" />, 
      });
      await clearCart();
      router.push('/order-confirmation');
    } catch (err) {
      console.error('Order creation failed:', err);
      toast({
        title: 'Order Failed',
        description: 'There was a problem placing your order. Please try again.',
        action: <AlertTriangle className="text-red-500" />, 
      });
    }
  };

  const handleSuccessfulMockPayment = () => {
    // This function is called by PayPalButton on mock success
    // For now, it's similar to handlePlaceOrder but could be different in a real scenario
     toast({
      title: 'Payment Processed (Simulation)!',
      description: 'Thank you for your purchase via PayPal (mock).',
      action: <CheckCircle className="text-green-500" />,
    });
    clearCart();
    router.push('/order-confirmation');
  }

  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Enter your shipping details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePlaceOrder)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                   <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Anytown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full mt-6">
                  <CreditCard className="mr-2 h-5 w-5" /> Place Order
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
         <Separator />
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Or pay with PayPal</h3>
            <PayPalButton onSuccessfulMockPayment={handleSuccessfulMockPayment} />
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-700 shadow-sm">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
          <p>
            This is a demo checkout. No real payment will be processed or personal data stored beyond this session.
          </p>
        </div>
      </div>

      <div className="space-y-8 md:sticky md:top-24">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between gap-4 border-b pb-2 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-md object-cover"
                    data-ai-hint={`${item.product.category.toLowerCase()} checkout summary`}
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
             <Button variant="outline" asChild className="w-full">
               <Link href="/cart">
                 Back to Cart
               </Link>
             </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
