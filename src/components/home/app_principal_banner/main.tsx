'use client'
import Carousel from "react-material-ui-carousel";
import Banner from "./banner";
import { Banner as BannerInterface} from "@/service/banners/interface";
import { useRouter } from "next/navigation";

export default function AppPrincipalBanner({banners}:{banners:BannerInterface[]}){
    const router = useRouter();
    return(
    <Carousel >
    {banners?.filter(banner => banner.assetUrl).map(banner=><Banner content={banner.assetUrl!} onClick={banner.link ? () => router.push(banner.link!): undefined}></Banner>)
        
        }
    
    </Carousel>
    );
    
}