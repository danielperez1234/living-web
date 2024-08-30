'use client'
import Carousel from "react-material-ui-carousel";
import Banner from "./banner";
import { Banner as BannerInterface} from "@/service/banners/interface";
import { useRouter } from "next/navigation";

export default function AppFlatBanner({banners}:{banners:BannerInterface[]}){
    const router = useRouter();
    console.log(banners)
    return(
    <Carousel >
     {banners.filter(banner => banner.assetUrl).map(banner=><Banner content={banner.assetUrl!} onClick={() => router.push("youtube.com")}></Banner>)
        
    }
    </Carousel>
    );
    
}