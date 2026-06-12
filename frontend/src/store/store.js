import { create } from "zustand";
import api from "../utils/api";

// Auth Store
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api("/api/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      set({ user: data.user, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      set({ user: data.user, isAuthenticated: true, loading: false });
      return data;
    } catch (error) {
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  fetchProfile: async () => {
    try {
      const data = await api("/api/auth/me");
      set({ user: data.user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },

  updateProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const data = await api("/api/auth/profile", {
        method: "PUT",
        body: profileData,
      });
      set({ user: data.user, loading: false });
      return data;
    } catch (error) {
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // logout even if server call fails
    }
    set({ user: null, isAuthenticated: false });
  },
}));

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
