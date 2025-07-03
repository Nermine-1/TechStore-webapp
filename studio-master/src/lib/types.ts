import type { LucideIcon } from 'lucide-react';

export type ProductReview = {
  id: string;
  author: string;
  avatar?: string; // URL to avatar image
  rating: number; // 1-5
  comment: string;
  date: string; // ISO string
};

export type ProductSpecification = {
  name: string;
  value: string;
  iconName?: string; // Changed from LucideIcon to string
};

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  images: string[]; // URLs
  coverImageIndex?: number; // Index of the image in 'images' array to be used as cover
  category: string;
  categoryIconName?: string; // Changed from LucideIcon to string
  featured?: boolean;
  specifications: ProductSpecification[];
  reviews: ProductReview[];
  stock: number; // Available stock
  sku?: string;
  tags?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  _id?: string;
  id?: string;
  customerName: string;
  total: number;
  createdAt: string;
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
};
