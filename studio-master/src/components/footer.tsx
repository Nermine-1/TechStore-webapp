import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Tech Store. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            prefetch={false}
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
