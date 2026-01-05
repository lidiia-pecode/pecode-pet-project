import { Product } from '@/types/Product';
import { StateCreator } from 'zustand';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  addMultipleToCart: (products: Product[]) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<CartState> = set => ({
  cart: [],

  addToCart: product =>
    set(state => {
      const existing = state.cart.find(i => i.id === product.id);

      if (existing) {
        return {
          cart: state.cart.map(i =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  addMultipleToCart: products =>
    set(state => {
      const map = new Map<number, CartItem>();

      state.cart.forEach(item => map.set(item.id, { ...item }));

      products.forEach(product => {
        const existing = map.get(product.id);

        map.set(
          product.id,
          existing
            ? { ...existing, quantity: existing.quantity + 1 }
            : { ...product, quantity: 1 }
        );
      });

      return { cart: [...map.values()] };
    }),

  increaseQty: id =>
    set(state => ({
      cart: state.cart.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      ),
    })),

  decreaseQty: id =>
    set(state => {
      const item = state.cart.find(p => p.id === id);
      if (!item) return state;

      if (item.quantity === 1) {
        return { cart: state.cart.filter(p => p.id !== id) };
      }

      return {
        cart: state.cart.map(p =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        ),
      };
    }),

  removeFromCart: id =>
    set(state => ({
      cart: state.cart.filter(i => i.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
});
