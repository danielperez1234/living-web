'use client'
import Carousel from "react-material-ui-carousel";
import Banner from "./banner";

export default function AppPrincipalBanner(){
    return(
    <Carousel >
    <Banner content={"/mega_banner/megabanner_1.jpg"}></Banner>
    <Banner content={"/mega_banner/megabanner_2.mp4"}></Banner>
    <Banner content={"/mega_banner/megabanner_5.jpg"}></Banner>
    </Carousel>
    );
    
}