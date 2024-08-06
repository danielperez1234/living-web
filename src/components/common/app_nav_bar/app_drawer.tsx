import { Box, Divider, Drawer, Typography } from "@mui/material";
import NavBarTextButton from "./nav_bar_text_button";
interface PropsAppDrawer{
drawerOpen: boolean;
setDrawerOpen:  (x:boolean)=> void,
}
export default function AppDrawer({drawerOpen,setDrawerOpen}:PropsAppDrawer){

    return(
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          
        <Box display={{sm:'flex',md:'none',xs:'flex'}} padding={5} minWidth={'30vw'}  flexDirection={'column'}>
          <NavBarTextButton title={"Catalogo"} onClick={() => {}} />
          <NavBarTextButton title={"Ofertas"} onClick={() => {}} />
          <NavBarTextButton title={"Servicios"} onClick={() => {}} />
          <NavBarTextButton title={"Quiénes Somos"} onClick={() => {}} />
        </Box>
        <Box display={{sm:'none',md:'flex',xs:'none'}} padding={5} minWidth={'20vw'}  flexDirection={'column'}>
          <Box>
            <Typography variant="h6" color='info'>
              Manualidades
            </Typography>
            <Divider/>
          </Box>
        </Box>
      </Drawer>
    )
}