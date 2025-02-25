"use client";

import { Box, Typography } from "@mui/material"; // Librerías externas

import { AppColorsHex } from "@/const/colors"; // Constantes y configuraciones

import AppBackgroundImage from "@/components/common/background_image"; // Componentes comunes
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppFooter from "@/components/common/app_footer/main";

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
        <Box sx={boxCardStyle}>
          <Box width={"100%"} ml={3}>
            <Typography variant="h4" mb={2}>
              Aviso de privacidad
            </Typography>

            <Box>
              <Typography variant="h5" mb={2}>
                IDENTIDAD Y DOMICILIO DEL RESPONSABLE
              </Typography>
              <Typography variant="body1" mb={4}>
                {` De conformidad con lo establecido en los Artículos 17 fracción
                II, 3 fracción VI, 9, 12, 15, 16 y demás relativos y aplicables
                de la Ley Federal de Protección de Datos Personales en Posesión
                de los Particulares le informamos que Grupo Living de soluciones
                empresariales S. de R. L. de C.V. (el “responsable”), con
                domicilio en Faro de Mallorca 131-A Colonia, El Faro., (la
                “Dirección de Contacto”) tratará los datos personales que recabe
                de Usted en los términos del presente aviso de privacidad.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                LAS FINALIDADES DEL TRATAMIENTO
              </Typography>
              <Typography variant="body1" mb={4}>
                Los datos personales que recabamos de usted, los utilizaremos
                para las siguientes finalidades que son necesarias para el
                servicio que solicita:
              </Typography>
              <Typography variant="h5" mb={2}>
                PRIMARIAS{" "}
              </Typography>
              <Typography variant="body1">
                · Identificarlo y registrarlo como cliente para permitirle el
                uso de nuestros portales.
              </Typography>
              <Typography variant="body1">
                · Tener actualizadas nuestras bases de datos.
              </Typography>
              <Typography variant="body1">
                · Brindarle atención personalizada, así como darle seguimiento
                en relación con sus pedidos, solicitudes de información, dudas,
                comentarios, quejas, sugerencias o cualquier asunto que resulte
                de importante para la relación comercial.
              </Typography>
              <Typography variant="body1">
                · La emisión de comprobantes fiscales en términos de la
                normatividad aplicable.
              </Typography>
              <Typography variant="body1">
                · Canalizarlo para la atención de servicios de garantía y/o
                reparación de productos cuando resulte procedente.
              </Typography>
              <Typography variant="body1">
                · Establecer monitoreo en la calidad de los servicios que
                prestamos.
              </Typography>
              <Typography variant="body1">
                Realizar las entregas de producto en la dirección que usted
                índico en su compra.
              </Typography>
              <Typography variant="body1">
                Cumplir con obligaciones, políticas y procedimientos internos de
                la empresa.
              </Typography>
              <Typography variant="body1">
                · Procesar pedidos, compras y/o solicitudes de información.
              </Typography>
              <Typography variant="body1">
                · Realizar el apartado de bienes y/o productos que usted haya
                elegido.
              </Typography>
              <Typography variant="body1">
                · Llevar un histórico sobre sus compras y uso de los servicios.
              </Typography>
              <Typography variant="body1">
                · Atender dudas, quejas, comentarios, sugerencias, aclaraciones,
                devoluciones y/o dar seguimiento a las mismas.
              </Typography>
              <Typography variant="body1">
                · Conservar su información para el cumplimiento de las
                disposiciones legales y requerimientos de diversas autoridades
                y/o entidades regulatorias en caso de que la requieran por medio
                de mandato judicial.
              </Typography>
              <Typography variant="body1">
                {`GRUPO LIVING podrá conservar los datos anteriormente señalados
                siempre y cuando exista una base de legitimación que le permita,
                en términos de las leyes aplicables, dar tratamiento a sus datos
                personales.`}
              </Typography>
              <Typography variant="body1" mb={4}>
                {`De manera adicional, utilizaremos su información personal para 
                las siguientes finalidades que no son necesarias para el servicio 
                solicitado, pero que nos permiten y facilitan brindarle una mejor 
                atención.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                SECUNDARIAS{" "}
              </Typography>
              <Typography variant="body1">
                · Informarle del lanzamiento o cambios de nuevos productos,
                bienes, servicios, promociones y/u ofertas de acuerdo con sus
                intereses, tanto de nuestra marca y denominación comercial como
                de las que pudieran pertenecer a socios comerciales.
              </Typography>
              <Typography variant="body1">
                · Realizar estadísticas, encuestas o estudios sobre hábitos de
                consumo y de mercado que tengan por finalidad evaluar la calidad
                de los servicios, bienes, productos y/o experiencia de compra.
              </Typography>
              <Typography variant="body1">
                · Para que se le pueda enviar información de carácter
                publicitario, promocional y/o informativo y prospección
                comercial de carácter personalizado a través del ofrecimiento de
                bienes, servicios, promociones y/u ofertas de acuerdo con sus
                intereses y preferencias de consumo, así́ como de otras marcas
                y/o denominaciones comerciales incluyendo el envío de
                comunicaciones a través de correos electrónicos, llamadas
                telefónicas, mensajes cortos y demás medios de comunicación
                físicos y/o electrónicos.
              </Typography>
              <Typography variant="body1">
                · La Realización de estudios y programas que contengan técnicas
                de análisis masivo de datos para realizar actividades de
                perfilamiento y mejor conocimiento del cliente.
              </Typography>
              <Typography variant="body1">
                · Siempre que existan promociones, concursos o sorteos,
                invitarlo, conforme a las bases de participación, para así poder
                contactarlo a través de distintos medios de comunicación;
                asimismo en caso de que decida participar en dichas actividades,
                podrá ser necesario se disponga de su imagen personal a través
                de videos y/o fotografías así como que publique las mismas, a
                través de distintos medios de difusión tanto físicos como
                electrónicos. Ahora bien, en caso de que llegare a resultar
                ganador de algún premio o se presente en alguna actividad
                realizada por nosotros, podremos disponer de sus datos
                personales para realizar la entrega del premio que corresponda y
                plasmar su participación en dicho evento.
              </Typography>
              <Typography variant="body1">
                · Compartir sus perfiles y hábitos de consumo con nuestros
                socios comerciales para que éstos puedan contactarle y enviarle
                información de carácter publicitario, promocional y/o
                informativo que consideren de su interés y/o.
              </Typography>
              <Typography variant="body1">
                · Mantener un control con el registro del tiempo de sesión
                cuando usa nuestros servicios y herramientas tecnológicas; así
                como lo necesario para llevar a cabo actividades de monitoreo de
                calidad en los servicios o sobre su experiencia de compra con
                nosotros.
              </Typography>
              <Typography variant="body1">
                · Controlar la seguridad de las redes y servicios de
                comunicaciones físicas o electrónicas, detectar fallos o errores
                técnicos en la transmisión de las comunicaciones electrónicas,
                así como cualquier tratamiento que sea necesario para la
                correcta prestación de los servicios.
              </Typography>
              <Typography variant="body1" mb={4}>
                Las presentes finalidades secundarias siempre se podrán usar
                mientras usted no se oponga, ya que la utilización y la no
                oposición a su uso, es el consentimiento otorgado. Ahora bien,
                en cualquier momento puede oponerse a cualquiera de ellas, o
                bien, revocar su consentimiento, tiene un plazo de 5 días
                hábiles para que, de ser el caso, manifieste su negativa para el
                tratamiento o aprovechamiento de sus datos personales para las
                finalidades secundarias. Es importante señalar que mientras no
                se oponga o revoque su consentimiento; éste seguirá siendo
                válido incluso cuando hubiere terminado la relación jurídica y/o
                comercial entre usted y GRUPO LIVING.
              </Typography>
              <Typography variant="h5" mb={2}>
                DATOS OBTENIDOS{" "}
              </Typography>
              <Typography variant="body1">
                Los datos personales que obtenemos en el primer contacto con
                usted son:
              </Typography>
              <Typography variant="body1" mb={4}>
                {`*Nombre completo, *Fecha y lugar de nacimiento, Genero (sexo),
                Nacionalidad, *Edad, *Domicilio Completo (Calle, Ciudad, Estado,
                Delegación, Municipio, Código Postal), Identificación Oficial,
                *correo electrónico, *Teléfono fijo y/o Celular y/o datos y
                perfiles en redes sociales; RFC, CURP.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                TRANSFERENCIA DE DATOS
              </Typography>
              <Typography variant="body1">
                Con el fin de resguardar y cumplir la legislación en materia de
                protección de datos personales, GRUPO LIVING podrá transferir
                sus datos personales tanto a entidades nacionales, como lo son
                autoridades fiscales mexicanas, instituciones bancarias,
                agencias de viajes, aseguradoras, instituciones de asistencia
                social, sin requerir su consentimiento, únicamente en los
                supuestos de que cualquier Autoridad competente que en caso de
                que sea así ordenado por alguna autoridad y que la misma sea
                legalmente competente o en su defecto se encuentre establecido
                en la Ley de la materia, así como para todas aquellas empresas
                que sean filiales o subsidiaras de GRUPO LIVING, o empresas en
                convenio con la nuestra, con el fin para que directa o
                indirectamente se comuniquen por cualquier medio con usted, y
                señalarle promociones, algún ofrecimiento de productos, así como
                servicios que dichas subsidiarias y/o afiliadas pueden
                comercializar y/o prestar de manera conjunta o de manera
                independiente.
              </Typography>
              <Typography variant="body1">
                GRUPO LIVING en caso de contar con su consentimiento o su no
                opción expresa, podrá transferir sus datos personales con las
                finalidades de que éstas le puedan contactar y llevar a cabo la
                venta y envío de los productos que dichas empresas o terceros
                pueden comercializar de manera independiente. En caso de que el
                titular proporcione sus datos de contacto para realizar la
                compra de productos ofrecidos por otras empresas o terceros,
                estará autorizando a que compartamos con ellos dicha información
                para que realicen directamente la entrega de sus productos.
              </Typography>
              <Typography variant="body1" mb={4}>
                {`Le informamos que para las transferencias indicadas con un
                asterisco (*) requerimos obtener su consentimiento. Si usted no
                manifiesta su negativa para dichas transferencias, por medio de
                los mecanismos antes mencionados, entenderemos que nos lo ha
                otorgado.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                MEDIOS PARA REVOCAR EL CONSENTIMIENTO PARA EL TRATAMIENTO DE
                DATOS PERSONALES.
              </Typography>
              <Typography variant="body1">
                Usted podrá cambiar de opción en cualquier momento, por lo que
                si usted no desea que GRUPO LIVING trate sus datos personales
                para alguna de las finalidades descritas, usted podrá manifestar
                su negativa enviando un correo a la dirección de correo
                electrónico: living.ventasol@outlook.com , señalando su negativa
                para el tratamiento de sus datos ya sea en alguna cuestión en
                general o en su defecto uno por uno.
              </Typography>
              <Typography variant="body1" mb={4}>
                Usted, deberá considerar que la revocación de su consentimiento
                implicará que no le podamos seguir prestando el servicio que nos
                solicitó, o la conclusión de su relación con nosotros. Asimismo,
                no en todos los casos podremos atender su solicitud o concluir
                el uso de forma inmediata, ya que es posible que por alguna
                obligación legal requiramos seguir tratando sus datos
                personales.
              </Typography>
              <Typography variant="h5" mb={2}>
                CAMBIOS O MODIFICACIONES AL AVISO DE PRIVACIDAD
              </Typography>
              <Typography variant="body1" mb={4}>
                {`El “Responsable” se reserva el derecho de efectuar en cualquier
                momento modificaciones o actualizaciones al presente aviso de
                privacidad, en el entendido de que toda modificación al mismo se
                le hará conocer a usted por los diferentes medios establecidos:
                (i) por medio de la publicación del aviso en la página de
                internet www.livingpapeleria.com (ii) a través de correo
                electrónico del cual usted proporciono.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                COOKIES Y OTRAS TECNOLOGÍAS{" "}
              </Typography>
              <Typography variant="body1">
                GRUPO LIVING utiliza diversas tecnologías para mejorar la
                eficiencia de nuestro sitio web y herramientas tecnológicas,
                incluyendo su experiencia cuando navega por dichos sitios o usa
                nuestra red. Entre estas tecnologías se incluye el uso de
                cookies, que son pequeñas cantidades de información que se
                almacenan en el navegador utilizado por cada usuario para que el
                servidor recuerde cierta información que posteriormente pueda
                utilizar. Esta información permite identificarle y guardar sus
                preferencias personales para brindarle una mejor experiencia de
                navegación.
              </Typography>
              <Typography variant="body1">
                En nuestros sitios de internet y aplicaciones podemos hacer uso
                de cookies, web beacons y otras tecnologías de rastreo, propias
                y de terceros que nos permiten cumplir con las finalidades
                informadas en el presente Aviso de Privacidad.
              </Typography>
              <Typography variant="body1" mb={4}>
                Los diferentes tipos de cookies que utilizamos para obtener
                datos identificativos y datos relacionados con su comportamiento
                de compra y uso de servicios en internet son Cookies esenciales:
                Utilizamos estas tecnologías para permitirle un uso adecuado de
                nuestros sitios web, por lo que las mismas no pueden ser
                deshabilitadas al ser necesarias para permitirle el uso de las
                funcionalidades de nuestros sitios web y herramientas
                tecnológicas. Cookies para recordar sus preferencias y
                experiencia a través de estas tecnologías obtenemos horario de
                navegación, tiempo de navegación en nuestra página de Internet,
                secciones consultadas, y páginas de Internet accedidas previo a
                la nuestra, estas cookies nos permiten recordar sus
                preferencias, opciones de navegación y funciones personalizadas.
              </Typography>
              <Typography variant="h5" mb={2}>
                CONSENTIMIENTO.
              </Typography>
              <Typography variant="body1">
                Acepto los términos y condiciones del presente aviso de
                privacidad y accedo voluntariamente a la aplicación del mismo.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
