import { create } from "zustand";


// Cart Store
export const useCartStore = create((set, get) => ({
  items: [],
  
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((item) => item._id === product._id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity }] };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item._id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));

// Wishlist Store
export const useWishlistStore = create((set, get) => ({
  items: [],

  addToWishlist: (product) => {
    set((state) => {
      const exists = state.items.find((item) => item._id === product._id);
      if (exists) return state;
      return { items: [...state.items, product] };
    });
  },

  removeFromWishlist: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item._id !== productId),
    }));
  },

  isInWishlist: (productId) => {
    return get().items.some((item) => item._id === productId);
  },

  clearWishlist: () => set({ items: [] }),
}));
