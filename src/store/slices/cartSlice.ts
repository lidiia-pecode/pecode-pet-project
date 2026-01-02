import { Product } from "@/types/Product";
import { StateCreator } from "zustand";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];

  addToCart: (product: CartItem) => void;
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

      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  increaseQty: id =>
    set(state => ({
      cart: state.cart.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      ),
    })),

  decreaseQty: id =>
    set(state => ({
      cart: state.cart.map(p =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      ),
    })),

  removeFromCart: id =>
    set(state => ({
      cart: state.cart.filter(i => i.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
});
