import { create } from "zustand";
import { Banner } from "./interface";
import {  GetBannersLocation} from "./service";

interface BannerState {
  mega_banners: Banner[];
  flat_banners: Banner[];
  squareOne_banners: Banner[];
  squareTwo_Banners: Banner[];
  ofertas: Banner[];
  square_banner_ofertas: Banner[];
  quarter_one_banner: Banner[];
  quarter_two_banner: Banner[];
  sandbox_catalogo_banners: Banner[];
  quienes_somos_banners: Banner[];
  fondo_web: Banner[];
  errorMsg: string | undefined;
  loading: boolean;
  getBannersHome: () => void;
  getBannersOfertas: () => void;
  getBannersSandbox: () => void;
  getBannersQuienesSomos: () => void;
  getFondoWeb: () => Promise<void>;
  clean: () => void;
}

const useBannerStore= create<BannerState>()((set) => ({
  //Banners home
  mega_banners: [],
  flat_banners: [],
  squareOne_banners: [],
  squareTwo_Banners: [],
  //Banners Ofertas
  ofertas: [],
  square_banner_ofertas: [],
  quarter_one_banner: [],
  quarter_two_banner: [],
  //sandbox catalogo
  sandbox_catalogo_banners: [],
  quienes_somos_banners: [],
  fondo_web: [],
  // indicadores
  errorMsg: undefined,
  loading: false,
  getBannersHome: async () => {
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
  getBannersOfertas: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response_ofertas = await GetBannersLocation('ofertas');
    const response_square_banner_ofertas = await GetBannersLocation('square_banner_ofertas');
    const response_quarter_one_banner= await GetBannersLocation('quarter_one_banner');
    const response_quarter_two_banner = await GetBannersLocation('quarter_two_banner');
      
      set((state) => {
        return {
          ...state,
          loading: false,
          ofertas: response_ofertas.data ??[],
          square_banner_ofertas: response_square_banner_ofertas.data ??[],
          quarter_one_banner: response_quarter_one_banner.data ??[],
          quarter_two_banner: response_quarter_two_banner.data ??[],
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
  getBannersSandbox: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response_sandbox_catalogo = await GetBannersLocation('sandbox_catalogo');
      
      set((state) => {
        return {
          ...state,
          loading: false,
          sandbox_catalogo_banners: response_sandbox_catalogo.data ??[],
         
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
  getBannersQuienesSomos: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const response_quienes_somos = await GetBannersLocation('quienes_somos');
      
      set((state) => {
        return {
          ...state,
          loading: false,
          quienes_somos_banners: response_quienes_somos.data ??[],
         
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
  getFondoWeb: async () => {
    set((state) => ({
      ...state,
      loading: true
    }));
    const fondo_web = await GetBannersLocation('fondo_web');
      
      set((state) => {
        return {
          ...state,
          loading: false,
          fondo_web: fondo_web.data ??[],
         
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