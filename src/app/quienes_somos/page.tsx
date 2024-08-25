"use client";
import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppCounter from "@/components/common/app_counter";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Divider, Fab, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
interface CatalogoProps {
  params: {
    category: string;
    subcategory: string;
  };
}
const boxCardStyle = {
  bgcolor: AppColorsHex.white,
  mb: 5,
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  borderRadius: "50px",
  width: "95%",
  padding: "5%",
  boxShadow:
    "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)"
};
export default function QuienesSomos({
  params: { category, subcategory }
}: CatalogoProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <AppBackgroundImage>
      <AppNavBar />
      <Box
        marginX={{ xs: "5%", md: "15%" }}
        mb={{ xs: "5%", md: "10%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Box mb={5}>
          <Typography variant="h1">Nosotros</Typography>
        </Box>
        <Box sx={boxCardStyle}>
          <Box width={"70%"} height={"100%"}></Box>
          <Box width={"100%"}>
            <Typography variant="h4" mb={2}>
              Living
            </Typography>
            <Typography variant="h2" mb={3}>
              Presentación
            </Typography>
            <Box>
              <Typography variant="body1" mb={2}>
                Nosotros somos Grupo Living, una empresa comprometida con la
                excelencia en la venta minorista de artículos de oficina,
                escolares y servicios de centro de copiado. Nos enorgullece
                ofrecer una amplia gama de productos de alta calidad que
                satisfacen sus necesidades.
              </Typography>
              <Typography variant="body1" mb={2}>
                En grupo Living, nos esforzamos cada día por ser una de las
                papelerías más reconocidas de León, Guanajuato y México a la
                posteridad. Creemos firmemente que la clave de nuestro éxito
                radica en calidad, atención al cliente, servicios y variedad de
                productos. Nuestra misión es proporcionar a nuestros clientes no
                sólo los mejores productos del mercado, sino tambien una
                experiencia de compra excepcional.
              </Typography>
              <Typography variant="body1">
                Aspiramos a seguir creciendo y mejorando, siempre con la vista
                puesta en la innovación y la excelencia. Queremos ser su primera
                opción cuando piense en artículos de oficina y escolares, y
                estamos aquí para servirle con dedicación y profesionalismo.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={boxCardStyle}>
          <Box width={"100%"}>
            <Typography variant="h2" mb={3}>
              Misión
            </Typography>
            <Box>
              <Typography variant="body1" mb={2}>
                En LIVING PAPELERIA nos dedicamos a ofrecer soluciones
                integrales en papelería, artículos de oficina, escolar y
                servicios de centro de copiado. Nuestra misión es brindar a
                nuestros clientes el mejor surtido de productos con la más alta
                calidad, siempre enfocados en la atención al cliente con calidez
                y respeto. Nos comprometemos a actuar con honestidad y
                transparencia en todas nuestras interacciones, fomentando una
                cultura de colaboración y aprendizaje entre nuestros
                colaboradores. Asimismo, asumimos la responsabilidad de cumplir
                con nuestros compromisos y adaptarnos constantemente a los
                cambios del entorno, para mantenernos a la vanguardia y seguir
                marcando la diferencia en la industria.
              </Typography>
            </Box>
          </Box>
          <Box width={"70%"} height={"100%"}></Box>
        </Box>
        <Box sx={boxCardStyle}>
          <Box width={"70%"} height={"100%"}></Box>
          <Box width={"100%"}>
            <Typography variant="h2" mb={3}>
              Visión
            </Typography>
            <Box>
              <Typography variant="body1" mb={2}>
                Nos esforzamos por ser la principal empresa minorista en el ramo
                papelero en México, destacando por nuestra excelencia en la
                atención al cliente y la calidad de nuestros productos y
                servicios. Nuestra visión incluye el desarrollo continuo de
                nuestros colaboradores, capacitándolos para que sean líderes en
                su campo y fomentando la innovación en cada aspecto de nuestro
                negocio. Guiados por nuestros valores fundamentales, nos
                apasiona ofrecer soluciones únicas y mejoradas en papelería,
                adaptándonos constantemente a las necesidades cambiantes de
                nuestros clientes y marcando la pauta en la industria con
                nuestra creatividad y enfoque en la mejora continua. Buscamos
                expandir de manera constante nuestra presencia geográfica,
                llegando a más comunidades y clientes satisfechos, siempre
                manteniendo nuestros valores como cimientos para el crecimiento
                y éxito sostenible de nuestra empresa.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={boxCardStyle}>
          <Box width={"100%"}>
            <Typography variant="h2" mb={3}>
              Valores
            </Typography>
            <Box>
              <Typography variant="body1" mb={2}>
                Respeto: En nuestra empresa, el respeto es un valor fundamental
                que se refleja en cómo tratamos a nuestros clientes, proveedores
                y colaboradores. Valoramos la diversidad y la dignidad de cada
                persona, fomentando un ambiente de trabajo inclusivo y
                respetuoso donde todas las voces son escuchadas y valoradas.
              </Typography>
            </Box>
          </Box>
          <Box width={"70%"} height={"100%"}></Box>
        </Box>
      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
