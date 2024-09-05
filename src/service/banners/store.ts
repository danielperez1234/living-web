import { create } from "zustand";
import { Banner } from "./interface";
import {  GetBannersLocation} from "./service";

interface BannerState {
  mega_banners: Banner[];
  flat_banners: Banner[];
  squareOne_banners: Banner[];
  squareTwo_Banners: Banner[];
  errorMsg: string | undefined;
  loading: boolean;
  getBanners: () => void;
  clean: () => void;
}

const useBannerStore= create<BannerState>()((set) => ({
  mega_banners: [],
  flat_banners: [],
  squareOne_banners: [],
  squareTwo_Banners: [],
  errorMsg: undefined,
  loading: false,
  getBanners: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response_mege_banner = await GetBannersLocation('mega_banner');
    const response_flat_banner = await GetBannersLocation('flat_banner');
    const response_squareOne_banner = await GetBannersLocation('square_one_banner');
    const response_squareTwo_Banner = await GetBannersLocation('square_two_banner');
      
      set((state) => {
        return {
          ...state,
          loading: false,
          mega_banners: response_mege_banner.data ??[],
          flat_banners: response_flat_banner.data ??[],
          squareTwo_Banners: response_squareTwo_Banner.data ??[],
          squareOne_banners: response_squareOne_banner.data ??[],
        };
      });

      return;
    
    set((state) => {
      return {
        ...state,
        loading: false
      };
    });
  },
  clean: () => set((state) => ({ mega_banners: [] })),
 
  
}));
export default useBannerStore;