"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go back to the homepage</Link>
      </Button>
    </div>
  );
}
