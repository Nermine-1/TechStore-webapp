'use client';

import Link from 'next/link';
import { ShoppingCart, Briefcase, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  const { totalItems } = useCart();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    function updateAuthState() {
      setIsLoggedIn(!!localStorage.getItem('userEmail'));
      const userName = localStorage.getItem('userName');
      setUserInitial(userName ? userName.charAt(0).toUpperCase() : null);
    }
    updateAuthState();
    window.addEventListener('storage', updateAuthState);
    window.addEventListener('authChange', updateAuthState);
    return () => {
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('authChange', updateAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    auth.logout();
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5" />, badge: totalItems > 0 ? totalItems : null },
    ...(!isLoggedIn
      ? [
          { href: '/login', label: 'Login', icon: <LogIn className="h-5 w-5" /> },
          { href: '/register', label: 'Register', icon: <UserPlus className="h-5 w-5" /> },
        ]
      : [
          { href: '/admin', label: 'Admin', icon: <Briefcase className="h-5 w-5" /> },
          { href: '#', label: 'Logout', icon: <LogIn className="h-5 w-5 rotate-180" />, onClick: handleLogout },
        ]),
  ];

  const NavContent = () => (
    <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
      {isLoggedIn && userInitial && (
        <button
          className="flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold w-8 h-8 mr-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          onClick={() => router.push('/profile')}
          title="View Profile"
        >
          {userInitial}
        </button>
      )}
      {navLinks.map((link) => (
        <Button
          key={link.label}
          variant="ghost"
          asChild={link.href !== '#'}
          className="text-sm font-medium text-foreground hover:text-primary relative w-full md:w-auto justify-start md:justify-center"
          onClick={link.onClick ? link.onClick : () => setMobileMenuOpen(false)}
        >
          {link.href !== '#' ? (
            <Link href={link.href} className="flex items-center gap-2">
              {link.icon && (
                <>
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {link.badge}
                    </span>
                  )}
                </>
              )}
              {!link.icon && link.label}
            </Link>
          ) : (
            <span className="flex items-center gap-2 cursor-pointer">
              {link.icon}
              <span>{link.label}</span>
            </span>
          )}
        </Button>
      ))}
      <ThemeToggle />
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
