'use client'
import Carousel from "react-material-ui-carousel";
import Banner from "./banner";
import { Banner as BannerInterface} from "@/service/banners/interface";
import { useRouter } from "next/navigation";

export default function AppHalfBanner({banners}:{banners:BannerInterface[]}){
    const router = useRouter();
    return(
    <Carousel>
     {banners?.filter(banner => banner.assetUrl).map((banner,i)=><Banner key={`half_banner_${banner.location}_${i}`} content={banner.assetUrl!} onClick={banner.link ? () => router.push(banner.link!): undefined}></Banner>)
    }
    </Carousel>
    );
    
}