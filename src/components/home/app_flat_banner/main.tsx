'use client'
import Carousel from "react-material-ui-carousel";
import Banner from "./banner";
import { Banner as BannerInterface} from "@/service/banners/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppFlatBanner({banners}:{banners:BannerInterface[]}){
    const router = useRouter();
    const [carouselKey, setCarouselKey] = useState(Date.now());

    useEffect(() => {
        function handleResize() {
            // Forzar una actualización del carrusel
            //setCarouselKey(Date.now());
        }

        // Añadir el event listener para resize
        window.addEventListener('resize', handleResize);

        // Llamar a handleResize al montar el componente para ajustar el tamaño
        handleResize();

        // Limpiar el event listener al desmontar el componente
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
    <Carousel key={carouselKey}>
     {banners.filter(banner => banner.assetUrl).map((banner, i)=><Banner key={`flat_banner_${i}`} content={banner.assetUrl!} onClick={() => window.open('https://www.youtube.com', '_blank', 'noopener,noreferrer')}></Banner>)
        
    }
    </Carousel>
    );
    
}