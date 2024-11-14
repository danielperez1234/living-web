"use client";
import AppButton from "@/components/common/app_button";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppTextField from "@/components/common/app_text_field";
import AppBackgroundImage from "@/components/common/background_image";
import Valor from "@/components/quienes_somos/valor";
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import useBannerStore from "@/service/banners/store";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  borderRadius: { xs: "30px", md: "50px" },
  width: "95%",
  padding: "5%",
  boxShadow:
    "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)",
};
export default function QuienesSomos({
  params: { category, subcategory },
}: CatalogoProps) {
  const getBanners = useBannerStore((state) => state.getBannersQuienesSomos);

  const bannersQS = useBannerStore((state) => state.quienes_somos_banners);

  /// Popup: Formulario de mayorista
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getBanners();
  }, []);

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
          <Box
            width={"100%"}
            sx={{ aspectRatio: { xs: 1, sm: 1 / 1.5 } }}
            position={"relative"}
            borderRadius={{ xs: "25px", md: "45px" }}
            overflow={"hidden"}
          >
            <Image
              fill
              src={
                bannersQS.length > 0
                  ? bannersQS[0].assetUrl ?? ""
                  : `/${basepath}/marca/default.png`
              }
              alt={"image nf"}
              style={{ objectFit: "cover", objectPosition: "10% 50%" }}
            ></Image>
          </Box>
          <Box width={"100%"} ml={3}>
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
          <Box width={"100%"} mr={3}>
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
          <Box
            width={"100%"}
            sx={{
              aspectRatio: {
                xs: 1,
                sm: 1 / 1.3,
              },
            }}
            position={"relative"}
            borderRadius={{ xs: "25px", md: "45px" }}
            overflow={"hidden"}
          >
            <Image
              fill
              src={
                bannersQS.length > 1
                  ? bannersQS[1].assetUrl ?? ""
                  : `/${basepath}/marca/default.png`
              }
              alt={"image nf"}
              style={{ objectFit: "cover", objectPosition: "10% 50%" }}
            ></Image>
          </Box>
        </Box>
        <Box sx={boxCardStyle}>
          <Box
            width={"100%"}
            sx={{ aspectRatio: { xs: 1, sm: 1 / 1.5 } }}
            position={"relative"}
            borderRadius={{ xs: "25px", md: "45px" }}
            overflow={"hidden"}
          >
            <Image
              fill
              src={
                bannersQS.length > 2
                  ? bannersQS[2].assetUrl ?? ""
                  : `/${basepath}/marca/default.png`
              }
              alt={"image nf"}
              style={{ objectFit: "cover", objectPosition: "10% 50%" }}
            ></Image>
          </Box>
          <Box width={"100%"} ml={3}>
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
          <Box>
            <Typography variant="h2" mb={3}>
              Valores
            </Typography>
            <Grid
              container
              width={"100%"}
              spacing={3}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Valor
                text={
                  "En nuestra empresa, el respeto es un valor fundamental que se refleja en cómo tratamos a nuestros clientes, proveedores y colaboradores. Valoramos la diversidad y la dignidad de cada persona, fomentando un ambiente de trabajo inclusivo y respetuoso donde todas las voces son escuchadas y valoradas."
                }
                valor={"respeto"}
              />
              <Valor
                text={
                  "La honestidad es la base de nuestra cultura empresarial. Nos comprometemos a actuar con integridad y transparencia en todas nuestras interacciones y transacciones. Mantenemos una comunicación abierta y sincera con nuestros clientes y colaboradores, construyendo relaciones basadas en la confianza."
                }
                valor={"honestidad"}
              />
              <Valor
                text={
                  "Reconocemos que el trabajo en equipo es esencial para alcanzar nuestros objetivos. Fomentamos un ambiente colaborativo donde se valora la contribución de cada miembro del equipo y se promueve el intercambio de ideas y conocimientos para lograr soluciones creativas y eficientes."
                }
                valor={"colaboracion"}
              />
              <Valor
                text={
                  "En nuestra empresa, el aprendizaje continuo es clave para mantenernos a la vanguardia en nuestra industria. Incentivamos el desarrollo profesional y personal de nuestros colaboradores, brindando oportunidades de capacitación y crecimiento que les permitan alcanzar su máximo potencial."
                }
                valor={"aprendizaje"}
              />
              <Valor
                text={
                  "Asumimos la responsabilidad de nuestras acciones y decisiones. Cumplimos con nuestros compromisos hacia nuestros clientes, colaboradores y la sociedad en general. Buscamos siempre la excelencia en nuestro trabajo y asumimos la responsabilidad de contribuir al bienestar de las comunidades donde operamos."
                }
                valor={"responsabilidad"}
              />
              <Valor
                text={
                  "En nuestra empresa, promovemos la transparencia en nuestras operaciones y procesos. Mantenemos a nuestros clientes y colaboradores informados sobre nuestras políticas, prácticas y resultados, de manera clara y comprensible."
                }
                valor={"transparencia"}
              />
              <Valor
                text={
                  "Reconocemos que el entorno empresarial está en constante cambio. Por lo tanto, nos esforzamos por ser ágiles y flexibles, adaptándonos a las nuevas circunstancias y desafíos para mantenernos competitivos y relevantes en el mercado."
                }
                valor={"adaptabilidad"}
              />
            </Grid>
          </Box>
        </Box>
        <AppButton
          label="¿Eres mayorista?"
          onClick={() => setShowPopup(true)}
        />
        {showPopup && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              onClick={() => setShowPopup(false)}
              sx={{
                width: "100%",
                height: "100%",
                background: AppColorsHex.blue,
                opacity: 0.4,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            ></Box>
            <Box
              sx={{
                transform: "translate(-50%, -50%)",
                position: "fixed",
                top: "50%",
                left: "50%",
                bgcolor: "white",
                padding: 4,
                borderRadius: "10px",
                boxShadow: 3,
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                width: "60%",
              }}
            >
              <Typography
                variant="h1"
                sx={{ color: AppColorsHex.blue, letterSpacing: "3px" }}
              >
                ¿Buscas mayoreo?
              </Typography>
              <AppTextField label="Nombre"></AppTextField>
              <AppTextField label="Correo"></AppTextField>
              <AppTextField label="Teléfono"></AppTextField>
              <Box>
                <AppButton
                  label="Enviar"
                  onClick={() => setShowPopup(false)}
                  sx={{ width: "20%" }}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
