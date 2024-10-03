"use client";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import Valor from "@/components/quienes_somos/valor";
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { Box, Grid, Typography } from "@mui/material";
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
  borderRadius: { xs: "30px", md: "50px" },
  width: "95%",
  padding: "5%",
  boxShadow:
    "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)",
};
export default function QuienesSomos({
  params: { category, subcategory },
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
        <Box sx={boxCardStyle}>
          <Box width={"100%"} ml={3}>
            <Typography variant="h4" mb={2}>
              Términos y condiciones
            </Typography>

            <Box>
              <Typography variant="h5" mb={2}>
                INTRODUCCIÓN
              </Typography>
              <Typography variant="body1">
                {`Los presentes Términos y Condiciones de la tienda en línea 
                www.livingpapeleria.com establece las condiciones generales de 
                contratación que son aplicables a las operaciones de compraventa 
                que se llevan a cabo entre Grupo Living de soluciones empresariales 
                S. de R. L. de C.V. y los usuarios del sitio (los “Clientes”). Esta 
                página web es operada por Grupo Living de soluciones empresariales 
                S. de R. L. de C.V.  (en lo sucesivo “GRUPO LIVING”) con domicilio 
                fiscal en: Faro de Mallorca 131-A Colonia, El Faro . En todo el 
                sitio, los términos “nosotros”, “nos” y “nuestro” se refieren a 
                GRUPO LIVING. GRUPO LIVING ofrece este sitio web, incluyendo 
                toda la información, herramientas y servicios disponibles para 
                usted en este sitio, el usuario, está condicionado a la aceptación 
                de todos los términos, condiciones, políticas y notificaciones aquí 
                establecidas.`}
              </Typography>
              <Typography variant="body1">
                {`Al visitar nuestro sitio y/o comprar algo de nosotros, participa en nuestro 
                “Servicio” y acepta los siguientes términos y condiciones (“Términos de Servicio”, 
                “Términos”), incluidos todos los términos y condiciones adicionales y las políticas 
                a las que se hace referencia en el presente documento y/o disponible a través de 
                hipervínculos. Estas Condiciones de Servicio se aplican a todos los usuarios del 
                sitio, incluyendo su limitación a usuarios que sean navegadores, proveedores, 
                clientes, comerciantes, y/o colaboradores de contenido.
`}
              </Typography>
              <Typography variant="body1" mb={4}>
                Por favor, lea estos Términos de Servicio cuidadosamente antes
                de acceder o utilizar nuestro sitio web. Al acceder o utilizar
                cualquier parte del sitio, está aceptando los Términos de
                Servicio. Si no está de acuerdo con todos los términos y
                condiciones de este sitio, entonces evite registrarse a la
                página web o usar cualquiera de los servicios para que sus datos
                no queden almacenados. Si los Términos de Servicio son
                considerados una oferta, la aceptación está expresamente
                limitada a estos Términos de Servicio.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 1 - TÉRMINOS DE LA TIENDA EN LÍNEA
              </Typography>
              <Typography variant="body1" >
                Al utilizar este sitio, declara que tiene al menos la mayoría de
                edad y que nos ha otorgado su consentimiento para permitir que
                cualquiera de sus dependientes menores use este sitio.
              </Typography>
              <Typography variant="body1">
                {`No puede usar nuestros productos con ningún propósito 
               ilegal o no autorizado, violar cualquier ley en su jurisdicción 
               (incluyendo, pero no limitado a las leyes de derecho de autor).`}
              </Typography>
              <Typography variant="body1" mb={4}>
                No debe transmitir virus o cualquier código de naturaleza
                destructiva; El incumplimiento o violación de cualquiera de
                estos Términos darán lugar al cese inmediato de los servicios
                contratados.
              </Typography>

              <Typography variant="h5" mb={2}>
                SECCIÓN 2 - CONDICIONES GENERALES
              </Typography>
              <Typography variant="body1">
                Nos reservamos el derecho de rechazar la prestación de servicio
                a cualquier persona, por cualquier motivo y en cualquier
                momento.
              </Typography>
              <Typography variant="body1">
                {`Entiende que su contenido (sin incluir la información de su tarjeta de 
               crédito y/o débito), puede ser transferido sin encriptar e involucrar 
               (a) transmisiones a través de varias redes; y (b) cambios para ajustarse 
               o adaptarse a los requisitos técnicos de conexión de redes o dispositivos. 
               La información de tarjetas de crédito y/o débito está siempre encriptada 
               durante la transferencia a través de las redes.`}
              </Typography>
              <Typography variant="body1">
                Está de acuerdo con no reproducir, duplicar, copiar, vender,
                revender o explotar cualquier parte del Servicio, USP del
                Servicio, o acceso al Servicio o cualquier contacto en el sitio
                web a través del cual se presta el servicio, sin el expreso
                permiso por escrito de nuestra parte.
              </Typography>
              <Typography variant="body1">
                Los títulos utilizados en las diversas secciones en estos
                términos y condiciones se incluyen solo por conveniencia y ayuda
                para el uso y no limita o afecta a lo que buscan y protegen los
                mismos.
              </Typography>
              <Typography variant="body1" mb={4}>
                Respecto de la entrega del bien adquirido, el comprador deberá
                de otorgar su autorización en el debido proceso de compra uno o
                dos terceros autorizados para recibir el bien en caso de que el
                titular de la tarjeta no se encuentra en el domicilio; en caso
                de que lo reciba una persona no autorizada acepta desde este
                momento que libera de cualquier responsabilidad al vendedor y
                aceptara como entregado el bien independientemente de la persona
                que lo reciba, renunciando a su derecho de solicitar un
                reembolso de su dinero.
              </Typography>

              <Typography variant="h5" mb={2}>
                SECCIÓN 3 - EXACTITUD, EXHAUSTIVIDAD Y ACTUALIDAD DE LA
                INFORMACIÓN
              </Typography>
              <Typography variant="body1">
                La información de los productos anunciados en nuestro sitio es
                exacta y apegada a las características de los mismos; sin
                embargo, si por un error del fabricante el artículo contiene
                alguna característica distinta a lo anunciado podrá reportarlo
                dentro de las primeras 24 hrs. naturales al correo:
                living.ventasol@outlook.com y la empresa le indicará las
                instrucciones a seguir para la devolución y/o cambio del mismo.
              </Typography>
              <Typography variant="body1">
                Exhibimos con precisión los colores que aparecen de nuestros
                productos en el sitio. Sin embargo, los colores actuales que ve
                dependerán de su monitor, no podemos garantizar que ninguno de
                los colores mostrados en su monitor sea exacto, le recordamos
                que las imágenes o fotografías que se encuentran cargadas en el
                sitio web son con fines ilustrativos y le son expuestas de modo
                orientativo.
              </Typography>
              <Typography variant="body1">
                Le recomendamos que siempre verifique las condiciones de compra
                antes de realizar su pedido, a fin de cerciorarse de los
                términos, condiciones y restricciones que pudieren aplicar a
                cada producto.
              </Typography>
              <Typography variant="body1">
                Todos los precios de los productos incluyen el IVA y demás
                impuestos que pudieran corresponderles, lo anterior,
                independientemente de los gastos de envío que pudieran o no
                generarse. Estos montos se le indicarán antes de levantar su
                pedido para que esté en posibilidad de aceptarlos.
              </Typography>
              <Typography variant="body1">
                Las existencias de los artículos, están sujetos a la
                disponibilidad, de agotarse el producto recibirá una llamada o
                correo electrónico de alguno de nuestros colaboradores para
                enterarlo y proceder con el cambio o con la cancelación.
              </Typography>
              <Typography variant="body1">
                Todos los pedidos de productos están sujetos a disponibilidad.
                Si por causas de fuerza mayor, o si se produjeran dificultades
                en cuanto al suministro de productos o si por excepción no
                quedan artículos en stock, nos comprometemos a facilitarle
                información acerca de productos sustitutos de calidad y valor
                igual o superior que usted podrá encargar. Si no desea hacer un
                pedido de los productos presentados, le reembolsaremos cualquier
                cantidad que pudiera usted haber abonado, reiterándole que
                siempre haremos nuestro mejor esfuerzo para que la página web
                siempre esté actualizada.
              </Typography>
              <Typography variant="body1" mb={4}>
                {`Este sitio puede contener cierta información histórica. La
                información histórica, no es necesariamente actual y es provista
                únicamente para agilizar sus compras en aquellos productos que
                ya conoce y desea adquirir nuevamente. Nos reservamos el derecho
                de actualizar cualquier tipo de contenido (foto, descripción,
                etc.) en nuestro sitio. (Véase Sección 11 para más detalles.)
                Acepta que es su responsabilidad monitorear los cambios en
                nuestro sitio.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 4 - MODIFICACIONES AL SERVICIO Y PRECIOS
              </Typography>
              <Typography variant="body1">
                Le informamos que los precios de nuestros productos están
                sujetos a cambio sin previo aviso salvo que la compra ya se haya
                efectuado; aunado a lo anterior nos reservamos el derecho de
                descontinuar cualquier producto en cualquier momento; asimismo
                se le notifica que nos reservamos el derecho a nuestra sola
                discreción, de actualizar, modificar o reemplazar cualquier
                parte de estas Condiciones del servicio mediante la publicación
                de las actualizaciones y los cambios en nuestro sitio web; así
                como de descontinuar el Servicio (o cualquier parte del
                contenido) en cualquier momento sin aviso previo; señalando que
                no somos responsables ante usted o alguna tercera parte por
                cualquier modificación, cambio de precio, suspensión o
                discontinuidad del Servicio.
              </Typography>
              <Typography variant="body1" mb={4}>
                Puede revisar la versión más actualizada de los Términos de
                Servicio en cualquier momento en esta página; siendo su
                responsabilidad revisar nuestro sitio web periódicamente para
                verificar los cambios. El uso continuo de o el acceso a nuestro
                sitio Web o el Servicio después de la publicación de cualquier
                cambio en estas Condiciones de servicio implica la aceptación de
                dichos cambios.
              </Typography>
              <Typography variant="h5" mb={2}>
                {`SECCIÓN 5 - PRODUCTOS O SERVICIOS (si aplicable)`}
              </Typography>
              <Typography variant="body1">
                Ciertos productos o servicios pueden estar disponibles
                exclusivamente en línea a través del sitio web. Estos productos
                o servicios pueden tener cantidades limitadas y estar sujetas a
                devolución o cambio de acuerdo a nuestra política de devolución
                solamente.
              </Typography>
              <Typography variant="body1">
                Nos reservamos el derecho, pero no estamos obligados, para
                limitar las ventas de nuestros productos o servicios a cualquier
                persona, región geográfica o jurisdicción; así como de rechazar
                cualquier pedido que realice con nosotros; asimismo a nuestra
                discreción se podrán limitar o cancelar las cantidades compradas
                por persona, por hogar o por pedido; señalando que estas
                restricciones pueden incluir pedidos realizados por o bajo la
                misma cuenta de cliente, la misma tarjeta de crédito y/o débito,
                y/o pedidos que utilizan la misma facturación y/o dirección de
                envío. Podemos ejercer este derecho basados en cada caso;
                asimismo en caso de que cualquier oferta de producto o servicio
                hecho en este sitio sea prohibida en algún lugar geográfico, la
                misma será nula.
              </Typography>
              <Typography variant="body1" mb={4}>
                Siempre buscamos su entera satisfacción con nuestro servicio sin
                embargo no garantizamos que la calidad de los productos,
                servicios, información u otra característica del sitio cumpla
                con todas sus expectativas si considera importante implementar
                alguna mejora por favor manda un email a
                living.ventasol@outlook.com con tu aportación.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 6 - EXACTITUD DE FACTURACIÓN E INFORMACIÓN DE CUENTA
              </Typography>
              <Typography variant="body1">
                En el caso de que hagamos un cambio o cancelemos una orden, se
                le intentara notificarle poniéndonos en contacto vía correo
                electrónico y/o dirección de facturación / número de teléfono
                proporcionado en el momento que se hizo pedido. Nos reservamos
                el derecho de limitar o prohibir las órdenes que, a nuestro
                juicio, parecen ser colocado por los concesionarios,
                revendedores o distribuidores o si detectamos movimientos
                sospechosos en su cuenta que indiquen una posible clonación de
                tarjetas y/o cualquier actividad ilegal.
              </Typography>
              <Typography variant="body1">
                Se compromete a proporcionar información actual, completa y
                precisa de la compra y cuenta utilizada para todas las compras
                realizadas en nuestra tienda; así como a actualizar su cuenta y
                otra información, incluyendo su dirección de correo electrónico
                y números de tarjetas de crédito y/o débito y fechas de
                vencimiento, para que podamos completar sus transacciones y
                contactarle cuando sea necesario.
              </Typography>
              <Typography variant="body1" mb={4}>
                Para más detalles, por favor revise nuestra Política de
                Devoluciones, en la Página de Internet de GRUPO LIVING.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 7 - HERRAMIENTAS OPCIONALES Y TERCEROS
              </Typography>
              <Typography variant="body1">
                Cierto contenido, productos y servicios disponibles vía nuestro
                Servicio pueden incluir material de terceras partes; por tanto
                es posible que te proporcionemos acceso a herramientas de
                terceros a los cuales no monitoreamos y sobre los que no tenemos
                control ni entrada.
              </Typography>
              <Typography variant="body1">
                Reconoce y acepta que proporcionamos acceso a este tipo de
                herramientas "tal cual" y "según disponibilidad" sin garantías,
                representaciones o condiciones de ningún tipo y sin ningún
                respaldo. No tendremos responsabilidad alguna derivada de o
                relacionada con su uso de herramientas proporcionadas por
                terceras partes.
              </Typography>
              <Typography variant="body1">
                Cualquier uso que haga de las herramientas opcionales que se
                ofrecen a través del sitio bajo su propio riesgo y discreción y
                debe asegurarse de estar familiarizado y aprobar los términos
                bajo los cuales estas herramientas son proporcionadas por el o
                los proveedores de terceros. No nos hacemos responsables de
                cualquier daño o daños relacionados con la adquisición o
                utilización de bienes, servicios, recursos, contenidos, o
                cualquier otra transacción realizadas en conexión con sitios web
                de terceros.
              </Typography>
              <Typography variant="body1" mb={4}>
                También es posible que, en el futuro, le ofrezcamos nuevos
                servicios y/o características a través del sitio web (incluyendo
                el lanzamiento de nuevas herramientas y recursos). Estas nuevas
                características y/o servicios también estarán sujetos a estos
                Términos de Servicio.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 8 - COMENTARIOS DE USUARIO, CAPTACIÓN Y OTROS ENVÍOS
              </Typography>
              <Typography variant="body1">
                {`Si, a pedido nuestro, envía ciertas presentaciones específicas 
                (por ejemplo, la participación en concursos) o sin un pedido de 
                nuestra parte envía ideas creativas, sugerencias, proposiciones, 
                planes, u otros materiales, ya sea en línea, por email, por correo 
                postal, o de otra manera (colectivamente, 'comentarios'), acepta que 
                podamos, en cualquier momento, sin restricción, editar, copiar, publicar, 
                distribuir, traducir o utilizar por cualquier medio comentarios que nos haya 
                enviado. No tenemos ni tendremos ninguna obligación (1) de mantener ningún
                 comentario confidencialmente; (2) de pagar compensación por comentarios; 
                 o (3) de responder a comentarios.`}
              </Typography>
              <Typography variant="body1">
                Nosotros podemos, pero no tenemos obligación de, monitorear,
                editar o remover contenido que consideremos sea ilegítimo,
                ofensivo, amenazante, calumnioso, difamatorio, pornográfico,
                obsceno u objetable o viole la propiedad intelectual de
                cualquiera de las partes o los Términos de Servicio.
              </Typography>
              <Typography variant="body1" mb={4}>
                Acepta que sus comentarios no violarán los derechos de terceras
                partes, incluyendo derechos de autor, marca, privacidad,
                personalidad u otro derecho personal o de propiedad. Asimismo,
                acepta que sus comentarios no contienen material difamatorio o
                ilegal, abusivo u obsceno, o contienen virus informáticos u otro
                malware que pudiera, de alguna manera, afectar el funcionamiento
                del servicio o de cualquier sitio web relacionado. No puede
                utilizar una dirección de correo electrónico falsa, usar otra
                identidad que no sea legítima, o engañar a terceras partes o a
                nosotros en cuanto al origen de sus comentarios. Usted es el
                único responsable por los comentarios que hace y su precisión.
                No nos hacemos responsables y no asumimos ninguna obligación con
                respecto a los comentarios publicados por usted o cualquier
                tercer parte.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 9 - INFORMACIÓN PERSONAL
              </Typography>
              <Typography variant="body1" mb={4}>
                Su presentación de información personal a través del sitio se
                rige por nuestra Política de Privacidad, misma que se encuentra
                en nuestro Aviso de Privacidad que lo puedes encontrar en
                nuestra Página de Internet.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 10 - ERRORES, INEXACTITUDES Y OMISIONES
              </Typography>
              <Typography variant="body1">
                {`Eventualmente podrá existir información en nuestro sitio o en el 
                Servicio que pudiere contener errores tipográficos, inexactitudes u 
                omisiones que puedan estar relacionadas con las descripciones de productos, 
                precios, promociones, ofertas, gastos de envío del producto, el tiempo de 
                tránsito y la disponibilidad. Nos reservamos el derecho de corregir los
                 errores, inexactitudes u omisiones y de cambiar o actualizar la 
                 información o cancelar pedidos si alguna información en el Servicio 
                 o en cualquier sitio web relacionado es inexacta en cualquier momento 
                 sin previo aviso (incluso después de que haya enviado su orden).`}
              </Typography>
              <Typography variant="body1" mb={4}>
                No asumimos ninguna obligación de actualizar, corregir o aclarar
                la información en el Servicio o en cualquier sitio web
                relacionado, incluyendo, sin limitación, la información de
                precios, excepto cuando sea requerido por la ley. Ninguna
                especificación actualizada o fecha de actualización aplicada en
                el Servicio o en cualquier sitio web relacionado, debe ser
                tomada para indicar que toda la información en el Servicio o en
                cualquier sitio web relacionado ha sido modificada o
                actualizada.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 11 - USOS PROHIBIDOS
              </Typography>
              <Typography variant="body1" mb={4}>
                {`En adición a otras prohibiciones como se establece en los
                Términos de Servicio, se prohíbe el uso del sitio o su
                contenido: (a) para ningún propósito ilegal; (b) para pedirle a
                otros que realicen o participen en actos ilícitos; (c) para
                violar cualquier regulación, reglas, leyes internacionales,
                federales, provinciales o estatales, u ordenanzas locales; (d)
                para infringir o violar el derecho de propiedad intelectual
                nuestro o de terceras partes; (e) para acosar, abusar, insultar,
                dañar, difamar, calumniar, desprestigiar, intimidar o
                discriminar por razones de género, orientación sexual, religión,
                etnia, raza, edad, nacionalidad o discapacidad; (f) para
                presentar información falsa o engañosa; (g) para cargar o
                transmitir virus o cualquier otro tipo de código malicioso que
                sea o pueda ser utilizado en cualquier forma que pueda
                comprometer la funcionalidad o el funcionamiento del Servicio o
                de cualquier sitio web relacionado, otros sitios o Internet; (h)
                para recopilar o rastrear información personal de otros; (i)
                para generar spam, phish, pharm, pretext, spider, crawl, or
                scrape; (j) para cualquier propósito obsceno o inmoral; o (k)
                para interferir con o burlar los elementos de seguridad del
                Servicio o cualquier sitio web relacionado a otros sitios o
                Internet. Nos reservamos el derecho de suspender el uso del
                Servicio o de cualquier sitio web relacionado por violar
                cualquiera de los ítems de los usos prohibidos.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 12 - EXCLUSIÓN DE GARANTÍAS; LIMITACIÓN DE
                RESPONSABILIDAD
              </Typography>
              <Typography variant="body1">
                No garantizamos ni aseguramos que el uso de nuestro servicio
                será interrumpido, puntual, seguro o libre de errores, por tanto
                no garantizamos que los resultados que se puedan obtener del uso
                del servicio serán exactos o confiables.
              </Typography>
              <Typography variant="body1">
                Acepta que en ocasiones se podrá cancelar el servicio por
                períodos de tiempo indefinidos o permanentemente en cualquier
                momento sin previo aviso; por tanto también acepta expresamente
                que el uso de, o la posibilidad de utilizar, el servicio es bajo
                su propio riesgo.
              </Typography>
              <Typography variant="body1">
                El servicio y todos los productos y servicios proporcionados a
                través del servicio son (salvo lo expresamente manifestado por
                nosotros) proporcionados "tal cual" y "según esté disponible"
                para su uso, sin ningún tipo de representación, garantías o
                condiciones de ningún tipo, ya sea expresa o implícita,
                incluidas todas las garantías o condiciones implícitas de
                comercialización, calidad comercializable, la aptitud para un
                propósito particular, durabilidad, título y no infracción.
              </Typography>
              <Typography variant="body1" mb={4}>
                {`En ningún caso GRUPO LIVING, nuestros directores, funcionarios,
                empleados, afiliados, agentes, contratistas, internos,
                proveedores, prestadores de servicios o licenciantes serán
                responsables por cualquier daño, pérdida, reclamo, o daños
                directos, indirectos, incidentales, punitivos, especiales o
                consecuentes de cualquier tipo, incluyendo, sin limitación,
                pérdida de beneficios, pérdida de ingresos, pérdida de ahorros,
                pérdida de datos, costos de reemplazo, o cualquier daño similar,
                ya sea basado en contrato, agravio (incluyendo negligencia),
                responsabilidad estricta o de otra manera, como consecuencia del
                uso de cualquiera de los servicios o productos adquiridos
                mediante el servicio, o por cualquier otro reclamo relacionado
                de alguna manera con el uso del servicio o cualquier producto,
                incluyendo pero no limitado, a cualquier error u omisión en
                cualquier contenido, o cualquier pérdida o daño de cualquier
                tipo incurridos como resultados de la utilización del servicio o
                cualquier contenido (o producto) publicado, transmitido, o que
                se pongan a disposición a través del servicio, incluso si se
                avisa de su posibilidad. Debido a que algunos estados o
                jurisdicciones no permiten la exclusión o la limitación de
                responsabilidad por daños consecuenciales o incidentales, en
                tales estados o jurisdicciones, nuestra responsabilidad se
                limitará en la medida máxima permitida por la ley.`}
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 13 - INDEMNIZACIÓN
              </Typography>
              <Typography variant="body1" mb={4}>
                Acepta indemnizar, defender y mantener indemne a GRUPO LIVING y
                nuestras matrices, subsidiarias, afiliados, socios,
                funcionarios, directores, agentes, contratistas, concesionarios,
                proveedores de servicios, subcontratistas, proveedores, internos
                y empleados, de cualquier reclamo o demanda, incluyendo
                honorarios razonables de abogados, hechos por cualquier tercero
                a causa o como resultado de su incumplimiento de las Condiciones
                de Servicio o de los documentos que incorporan como referencia,
                o la violación de cualquier ley o de los derechos de un tercero.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 14 - DIVISIBILIDAD
              </Typography>
              <Typography variant="body1" mb={4}>
                En el caso de que se determine que cualquier disposición de
                estas Condiciones de Servicio sea ilegal, nula o inejecutable,
                dicha disposición será, no obstante, efectiva a obtener la
                máxima medida permitida por la ley aplicable, y la parte no
                exigible se considerará separada de estos Términos de Servicio,
                dicha determinación no afectará la validez de aplicabilidad de
                las demás disposiciones restantes.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 15 - RESCISIÓN
              </Typography>
              <Typography variant="body1">
                Las obligaciones y responsabilidades de las partes que hayan
                incurrido con anterioridad a la fecha de terminación
                sobrevivirán a la terminación de este acuerdo a todos los
                efectos.
              </Typography>
              <Typography variant="body1">
                Estas Condiciones de servicio son efectivos a menos que y hasta
                que sea terminado por usted o nosotros. Puede terminar estos
                Términos de Servicio en cualquier momento por avisarnos que ya
                no desea utilizar nuestros servicios, o cuando deje de usar
                nuestro sitio.
              </Typography>
              <Typography variant="body1" mb={4}>
                {`Si a nuestro juicio, falla, o se sospecha que ha fallado, en el
                cumplimiento de cualquier término o disposición de estas
                Condiciones de Servicio, también podemos terminar este acuerdo
                en cualquier momento sin previo aviso, y seguirá siendo
                responsable de todos los montos adeudados hasta incluida la
                fecha de terminación; y/o en consecuencia podemos negarle el
                acceso a nuestros servicios (o cualquier parte del mismo).`}
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 16 - ACUERDO COMPLETO
              </Typography>
              <Typography variant="body1">
                Nuestra falla para ejercer o hacer valer cualquier derecho o
                disposición de estas Condiciones de Servicio no constituirá una
                renuncia a tal derecho o disposición.
              </Typography>
              <Typography variant="body1">
                {`Estas Condiciones del servicio y las políticas o reglas de
                operación publicadas por nosotros en este sitio o con respecto
                al servicio constituyen el acuerdo completo y el entendimiento
                entre usted y nosotros y rigen el uso del Servicio y reemplaza
                cualquier acuerdo, comunicaciones y propuestas anteriores o
                contemporáneas, ya sea oral o escrita, entre usted y nosotros
                (incluyendo, pero no limitado a, cualquier versión previa de los
                Términos de Servicio).`}
              </Typography>
              <Typography variant="body1" mb={4}>
                Cualquier ambigüedad en la interpretación de estas Condiciones
                del servicio no se interpretará en contra del grupo de
                redacción.
              </Typography>
              <Typography variant="h5" mb={2}>
                SECCIÓN 17 - INFORMACIÓN DE CONTACTO
              </Typography>
              <Typography variant="body1">
                Preguntas acerca de los Términos de Servicio deben ser enviadas
                a living.ventasol@outlook.com
              </Typography>
              <Typography variant="body1">
                Por último al favorecernos con su compra significa que ha leído,
                entendido y acepta en su totalidad los Términos y Condiciones
                del mismo.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
