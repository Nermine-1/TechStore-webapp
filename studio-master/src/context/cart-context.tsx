'use client';

import type { Product, CartItem } from '@/lib/types';
import React, { createContext, useReducer, useContext, type ReactNode, useEffect } from 'react';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  totalPrice: number;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.items };
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );
      const quantityToAdd = action.quantity || 1;
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantityToAdd;
        updatedItems[existingItemIndex].quantity = Math.min(newQuantity, action.product.stock); // Respect stock
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: Math.min(quantityToAdd, action.product.stock) }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: Math.min(action.quantity, item.product.stock) } // Respect stock
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Load cart from localStorage on initial render (client-side only)
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('techShowcaseCart');
      if (storedCart) {
        try {
          const parsedCart: CartItem[] = JSON.parse(storedCart);
          dispatch({ type: 'LOAD_CART', items: parsedCart });
        } catch (error) {
          console.error("Failed to parse cart from localStorage", error);
          localStorage.removeItem('techShowcaseCart');
        }
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('techShowcaseCart', JSON.stringify(state.items));
    }
  }, [state.items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId: string): number => {
    const item = state.items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
