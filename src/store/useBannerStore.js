import { create } from 'zustand';

export const useBannerStore = create((set) => ({
  bannerText:
    'New Arrivals: Monsoon Collection | Crafted in Nagpur | Shipping PAN India | Custom Orders Open',
  setBannerText: (text) => set({ bannerText: text }),
}));
