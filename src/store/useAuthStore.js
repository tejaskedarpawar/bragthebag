import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAdmin: false,
      error: '',

      login: (email, password) => {
        if (email === 'example@gmail.com' && password === '123456789') {
          set({ isAdmin: true, error: '' });
          return true;
        } else {
          set({ error: 'Invalid credentials. Please try again.' });
          return false;
        }
      },

      logout: () => set({ isAdmin: false, error: '' }),
      clearError: () => set({ error: '' }),
    }),
    { name: 'btb-auth' }
  )
);
