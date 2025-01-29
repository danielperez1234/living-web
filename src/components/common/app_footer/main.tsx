'use client'
import { AppColorsHex } from "@/const/colors";
import { Box, Divider, Grid, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MediaIcon from "./media_icon";
import TextButton from "./text_button";
import { useRouter } from "next/navigation";
import { basepath } from "@/const/utils";
import Image from "next/image";
const TikTokIcon: React.FC = () => (
    <Image
        src={`/${basepath}/svg/tiktok_icon.svg`} alt={"sadsa"} width={30} height={30}   
    />
  );
export default function AppFooter(){
    const router = useRouter();
    return(
        <Box height={{  xs: "50vh", md: "33vh" }} padding={5} bgcolor={AppColorsHex.black} marginTop={{sm:'20px',xs:'30px',md:'70px'}}>
            <Grid container xs={12} marginBottom={5} justifyContent={'center'}>
            <Grid container item rowSpacing={4} xs={6} justifyContent={{md:'space-evenly',xs:'start'}}>
                <MediaIcon onClick={()=>{
                    window.open('https://www.facebook.com/profile.php?id=100093796121369&mibextid=ZbWKwL', '_blank');
                }}>
                    <FacebookIcon fontSize="large"/>
                </MediaIcon>
                <MediaIcon onClick={()=>{
                    window.open('https://www.instagram.com/living.papeleria?igsh=MWJtOGZ5YTZmYXloZQ==', '_blank');
                }}>
                    <InstagramIcon fontSize="large"/>
                </MediaIcon>
                {/* <MediaIcon onClick={()=>{
                    window.open('https://www.facebook.com/profile.php?id=100093796121369&mibextid=ZbWKwL', '_blank');
                }}>
                    <WhatsAppIcon fontSize="large"/>
                </MediaIcon> */}
                <MediaIcon onClick={()=>{
                    window.open('https://youtube.com/@livingpapeleria?si=JaarBPCzAesDQpOE', '_blank');
                }}>
                    <YouTubeIcon fontSize="large"/>
                </MediaIcon>
                <MediaIcon onClick={()=>{
                    window.open('https://www.tiktok.com/@livingpapeleria?_t=8qSbjM2TA6n&_r=1', '_blank');
                }}>
                    <TikTokIcon />
                </MediaIcon>
            </Grid>
            </Grid>
            <Grid container xs={12} justifyContent={'center'}>
            <Grid container item rowSpacing={4} xs={10} justifyContent={{md:'space-evenly',xs:'start'}}>
                <TextButton onClick={()=>router.push('/home')} text={"Inicio"}/>
                <TextButton text={"Catálogo"}/>
                <TextButton text={"Contacto"}/>
                <TextButton text={"Quiénes somos"} onClick={()=>router.push('/quienes_somos')}/>
                <TextButton onClick={()=>router.push('/empresas')} text={"Empresas"}/>
            </Grid>
            
            </Grid>
            <Divider variant="middle" sx={{bgcolor:AppColorsHex.white,marginY:5}}/>
            <Typography variant="h6" width={'100%'} display={'flex'} justifyContent={'center'} color={AppColorsHex.white}>
            © Derechos Reservados - Living papelerias 2024
            </Typography>
        </Box>
        
    );
}