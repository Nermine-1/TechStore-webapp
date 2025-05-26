'use client';

import Link from 'next/link';
import { ShoppingCart, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5" />, badge: totalItems > 0 ? totalItems : null },
  ];

  const NavContent = () => (
    <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className="text-sm font-medium text-foreground hover:text-primary relative w-full md:w-auto justify-start md:justify-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Link href={link.href} className="flex items-center gap-2">
            {link.icon && link.label === "Cart" ? (
              <>
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                {link.badge && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {link.badge}
                  </span>
                )}
              </>
            ) : (
              link.label
            )}
          </Link>
        </Button>
      ))}
    </nav>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Briefcase className="h-6 w-6" />
          <span>Tech Store</span>
        </Link>

        {isMobile ? (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6">
              <div className="mb-6 flex items-center gap-2 text-lg font-semibold text-primary">
                <Briefcase className="h-6 w-6" />
                <span>Tech Store</span>
              </div>
              <NavContent />
            </SheetContent>
          </Sheet>
        ) : (
          <NavContent />
        )}
      </div>
    </header>
  );
}
