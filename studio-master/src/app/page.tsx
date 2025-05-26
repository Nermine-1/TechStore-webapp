import ProductCard from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, LifeBuoy, Truck } from 'lucide-react';

export default function HomePage() {
  const featuredProducts: Product[] = getFeaturedProducts();

  return (
    <div className="space-y-12">
      <section className="rounded-lg bg-gradient-to-r from-primary via-primary/80 to-accent p-8 text-center shadow-lg md:p-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
          Welcome to Tech Store
        </h1>
        <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
          Discover the latest and greatest in technology. High-quality products, expertly curated for you.
        </p>
        <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90">
          <Link href="#featured-products">Explore Products</Link>
        </Button>
      </section>

      <section id="featured-products">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight md:text-left">
          Featured Products
        </h2>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No featured products available at the moment. Check back soon!</p>
        )}
      </section>

      <section className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Why Choose Us?</h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-medium text-primary">Quality Guaranteed</h3>
            <p className="text-muted-foreground">Only the best tech, thoroughly vetted.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <LifeBuoy className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-medium text-primary">Expert Support</h3>
            <p className="text-muted-foreground">Knowledgeable team ready to assist you.</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Truck className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-medium text-primary">Fast Shipping</h3>
            <p className="text-muted-foreground">Get your tech delivered quickly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
