'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle className="mb-6 h-20 w-20 text-green-500" />
      <h1 className="mb-4 text-4xl font-bold">Thank You For Your Order!</h1>
      <p className="mb-2 text-lg text-muted-foreground">
        Your (mock) order has been successfully placed.
      </p>
      <p className="mb-8 text-muted-foreground">
        This is a demonstration and no real products will be shipped.
      </p>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/#featured-products">View More Products</Link>
        </Button>
      </div>
      <div className="mt-12 w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <Package className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold">What's Next? (Simulated)</h3>
            <p className="text-sm text-muted-foreground">
              You would typically receive an email confirmation shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
