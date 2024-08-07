'use client'
import Carousel from "react-material-ui-carousel";
import Banner from "./banner";

export default function AppFlatBanner(){
    return(
    <Carousel >
    <Banner content={"/mega_banner/megabanner_4.jpg"}></Banner>
    <Banner content={"/mega_banner/megabanner_2.jpg"}></Banner>
    </Carousel>
    );
    
}