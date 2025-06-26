'use client';

import type { Product, CartItem } from '@/lib/types';
import React, { createContext, useReducer, useContext, type ReactNode, useEffect } from 'react';
import { cart as cartApi } from '@/lib/api';
import { getProductById } from '@/lib/mock-data';

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
    // Only load cart from backend if user is logged in
    async function loadCart() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('userEmail');
        if (email) {
          try {
            const result = await cartApi.get(email);
            if (result.cart && Array.isArray(result.cart.items)) {
              // Use getProductById to get real product info
              const items = result.cart.items.map((item: any) => {
                const product = getProductById(item.productId);
                if (product) {
                  return { product, quantity: item.quantity };
                }
                // fallback if product not found
                return {
                  product: {
                    id: item.productId,
                    name: item.name,
                    price: item.price,
                    stock: item.quantity,
                    images: [],
                    shortDescription: '',
                    description: '',
                    category: '',
                    coverImageIndex: 0,
                    categoryIconName: '',
                  },
                  quantity: item.quantity,
                };
              });
              dispatch({ type: 'LOAD_CART', items });
              return;
            }
          } catch (err) {
            // If backend fails, start with empty cart
            dispatch({ type: 'LOAD_CART', items: [] });
          }
        } else {
          // No user logged in, start with empty cart
          dispatch({ type: 'LOAD_CART', items: [] });
        }
      }
    }
    loadCart();
    // Listen for authChange to reload cart after login/logout
    function handleAuthChange() {
      loadCart();
    }
    window.addEventListener('authChange', handleAuthChange);
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const addToCart = async (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
    // Persist to backend if user is logged in
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      if (email) {
        await cartApi.addProductToDb(email, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
        });
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      if (email) {
        await cartApi.removeItemFromDb(email, productId);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      if (email) {
        await cartApi.updateItemInDb(email, productId, quantity);
      }
    }
  };
  
  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      if (email) {
        await cartApi.clearDb(email);
      }
    }
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
