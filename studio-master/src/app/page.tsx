'use client';

import ProductCard from '@/components/product-card';
import { getFeaturedProducts, products as allProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, LifeBuoy, Truck } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

export default function HomePage() {
  const featuredProducts: Product[] = getFeaturedProducts();
  const [userName, setUserName] = useState<string | null>(null);
  // Search/filter/sort state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sort, setSort] = useState('relevance');

  // Get all unique categories
  const categories = useMemo(() => Array.from(new Set(allProducts.map(p => p.category))), []);
  // Get min/max price
  const minPrice = useMemo(() => Math.min(...allProducts.map(p => p.price)), []);
  const maxPrice = useMemo(() => Math.max(...allProducts.map(p => p.price)), []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(p =>
      (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDescription.toLowerCase().includes(search.toLowerCase())) &&
      (!category || p.category === category) &&
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (sort === 'price-asc') filtered = filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered = filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'name-asc') filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'name-desc') filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    return filtered;
  }, [search, category, priceRange, sort]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('userName');
      if (name) {
        setUserName(name);
      } else {
        setUserName(null);
      }
    }
  }, []);

  return (
    <div className="space-y-12">
      <section className="animate-fade-in-down rounded-lg bg-gradient-to-r from-primary via-primary/80 to-accent p-8 text-center shadow-lg md:p-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
          Welcome <span style={{color: 'purple'}}>{userName}</span> to Tech Store
        </h1>
        <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
          Discover the latest and greatest in technology. High-quality products, expertly curated for you.
        </p>
        <Button size="lg" asChild className="bg-background text-foreground hover:bg-background/90">
          <Link href="#products">Explore Products</Link>
        </Button>
      </section>

      {/* Search, filter, sort UI */}
      <section className="max-w-6xl mx-auto px-4" id="products">
        <div className="mb-8 rounded-lg bg-card/80 shadow-sm p-4 flex flex-col md:flex-row md:items-end gap-4 border border-muted">
          <div className="flex-1 min-w-[180px]">
            <label className="block mb-1 font-medium text-muted-foreground">Search</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-muted rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
            />
          </div>
          <div className="min-w-[140px]">
            <label className="block mb-1 font-medium text-muted-foreground">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-muted rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
            >
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="min-w-[180px]">
            <label className="block mb-1 font-medium text-muted-foreground">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={minPrice}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-20 border border-muted rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="number"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-20 border border-muted rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
              />
            </div>
          </div>
          <div className="min-w-[140px]">
            <label className="block mb-1 font-medium text-muted-foreground">Sort By</label>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-full border border-muted rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No products found. Try adjusting your search or filters.</p>
        )}
      </section>

      <section className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Why Choose Us?</h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="animate-slide-in-left rounded-lg border bg-card p-6 shadow-sm">
            <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-medium text-primary">Quality Guaranteed</h3>
            <p className="text-muted-foreground">Only the best tech, thoroughly vetted.</p>
          </div>
          <div className="animate-slide-in-up rounded-lg border bg-card p-6 shadow-sm">
            <LifeBuoy className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-medium text-primary">Expert Support</h3>
            <p className="text-muted-foreground">Knowledgeable team ready to assist you.</p>
          </div>
          <div className="animate-slide-in-right rounded-lg border bg-card p-6 shadow-sm">
            <Truck className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-medium text-primary">Fast Shipping</h3>
            <p className="text-muted-foreground">Get your tech delivered quickly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
