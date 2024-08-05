<script setup>
  import NavBar from '../components/NavBar.vue';
  import FooterSection from '../components/FooterSection.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Header -->
    <header class="relative z-20 h-[68px] w-full shadow-md">
      <NavBar class="absolute" />
    </header>

    <!-- Main -->
    <main class="flex grow flex-col items-center justify-center">
      <!-- Hero -->
      <div class="flex w-full flex-col gap-2 px-5 py-10 text-center">
        <h1 class="text-shadow mb-3 w-full font-ubuntu text-3xl font-bold text-sblue-500">
          Políticas de privacidad y cookies
        </h1>
        <p class="text-shadow w-full px-2 text-sm text-sgray-300">
          En Sigma, valoramos tu privacidad y nos comprometemos a proteger la información personal
          que compartes con nosotros. Esta Política de Privacidad describe cómo recopilamos,
          utilizamos, compartimos y protegemos tu información cuando visitas nuestro sitio web
          (www.sigmacuba.com) y utilizas nuestro servicios de compra-venta, renta y permutas de
          viviendas en Cuba. Al utilizar nuestro sitio web y servicios, aceptas las prácticas
          descritas en esta política.
        </p>
      </div>

      <!-- Horizontal Line -->
      <div class="h-px w-full bg-sgray-100"></div>

      <section>
        <ol class="space-y-7 p-10 text-sm">
          <!-- 1 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">1. Información que recopilamos</h4>
            <p class="mb-3">Recopilamos varios tipos de información, incluidos:</p>

            <ul class="space-y-3">
              <li>
                <p>
                  <span class="font-semibold">Información de contacto:</span> Incluye tu nombre,
                  direción de correo electrónico y número de teléfono.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Información de propiedad:</span> Detalles de las
                  propiedades que deseas comprar, vender, alquilar o permutar, como dirección
                  característuicas de la propiedad, precio, fotos y videos.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Información financiera:</span> Datos como historial de
                  precios. No almacenamos ningún tipo de información bancaria ni de tarjetas, ya que
                  no existen métodos de pago activos dentro de la web.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Datos de uso:</span> Información sobre tu uso de
                  nuestro sitio web, como tu dirección IP, tipo de navegador, páginas visitadas,
                  tiempo de permanencia y otros datos de tráfico dentro de nuestra web.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Información de comunicación:</span> Registro de
                  comunicaciones que tengas con NOSOTROS, incluyendo correos electrónicos, llamadas
                  telefónicas y mensajes de texto.
                </p>
              </li>
            </ul>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 2 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">2. Cómo utilizamos tu información</h4>
            <p class="mb-3">Utilizamos tu información recopilada para los siguientes propósitos:</p>

            <ul class="space-y-3">
              <li>
                <p>
                  <span class="font-semibold">Provisión de servicios:</span> Para facilitar y
                  gestionar la compra-venta, renta y permutas de propiedades, incluyendo la
                  comunicación on compradores, vendedores, arrendadores y arrendatarios.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Información de propiedad:</span> Detalles de las
                  propiedades que deseas comprar, vender, alquilar o permutar, como dirección
                  característuicas de la propiedad, precio, fotos y videos.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Información financiera:</span> Datos como historial de
                  precios. No almacenamos ningún tipo de información bancaria ni de tarjetas, ya que
                  no existen métodos de pago activos dentro de la web.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Datos de uso:</span> Información sobre tu uso de
                  nuestro sitio web, como tu dirección IP, tipo de navegador, páginas visitadas,
                  tiempo de permanencia y otros datos de tráfico dentro de nuestra web.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Información de comunicación:</span> Registro de
                  comunicaciones que tengas con NOSOTROS, incluyendo correos electrónicos, llamadas
                  telefónicas y mensajes de texto.
                </p>
              </li>
            </ul>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 3 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">3. Cómo compartimos tu información</h4>
            <p class="mb-3">
              No vendemos, alquilamos, ni compartimos tu información personal con terceros, salvo en
              las siguientes situaciones
            </p>

            <ul class="space-y-3">
              <li>
                <p>
                  <span class="font-semibold">Proveedores de servicios:</span> Compartimos
                  información con proveedores de servicios que nos asisten en la operación de
                  nuestro sitio web y la provisión de servicios, como empresas de alojamiento web,
                  servicios de pago y servicios de mensajería.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Transacciones inmobiliarias:</span> Compartimos
                  información relevante con agentes, corredores y otras partes involucradas en la
                  compra-venta, renta o permuta de propiedades.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Cumplimiento legal:</span> Divulgamos información
                  cuando es necesario para cumplir leyes, regulaciones o procesos legales, o para
                  responder a solicitudes gubernamentales.
                </p>
              </li>
            </ul>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 4 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">4. Seguridad de la información</h4>
            <p class="mb-3">
              Adoptamos medidas técnicas y organizativas de seguridad para proteger tu información
              personal contra accesos no autorizados, pérdida, alteración o destrucción. Sin
              embargo, debe ser consciente de que ningún método de transmisión por internet o
              almacenamiento electrónico es completamente seguro y no podemos garantizar la
              seguridad absoluta de tu información, aunque nos esforzamos y seguiremos haciéndolo
              para que www.sigmacuba.com sea un sitio seguro para TODOS.
            </p>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 5 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">5. Tus derechos y opciones</h4>
            <p class="mb-3">Tienes derecho a:</p>

            <ul class="mb-3 space-y-3">
              <li>
                <p>
                  <span class="font-semibold">Acceder a tu información:</span>Solicitar acceso a los
                  datos personales que tenemos sobre ti.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Rectificación:</span> Solicitar la correción de
                  cualquier información incorrecta o incompleta, aunque también podrás hacerlo por
                  ti mismo desde el botón de MI CUENTA, una vez iniciada la sesión.
                </p>
              </li>
              <li>
                <p>
                  <span class="font-semibold">Eliminación:</span> Solicitar la eliminación de tu
                  información personal por motivos legítimos.
                </p>
              </li>
            </ul>
            <p class="mb-3">
              Para ejercer estos derechos, por favor, contáctanos a sigmacuba2023@gmail.com
            </p>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 6 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">6. Retención de datos</h4>
            <p class="mb-3">
              Conservamos tu información personal solo durante el tiempo necesario para cumplir con
              los fines para los cuales es recopilada, incluyendo cumplir con obligaciones legales,
              resolver disputas y hacer cumplir nuestros acuerdos. Los períodos de retención pueden
              variar dependiendo del tipo de datos y los requisitos legales aplicables.
            </p>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 7 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">7. Cookies y tecnologías similares</h4>
            <p class="mb-3">
              Nuestro sitio web utiliza cookies y tecnologías similares para mejorar tu experiencia
              de usuario, analizar el tráfico del sitio y personalizar el contenido. Puedes
              configurar tu navegador para rechazar las cookies o para alertarte cuando se envien
              cookies. Sin embargo, algunas funciones de nuestro sitio web, pueden no funcionar
              correctamente si deshabilitas las cookies.
            </p>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 8 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">8. Enlaces a sitios web de terceros</h4>
            <p class="mb-3">
              Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos
              responsables de las prácticas de privacidad ni del contenido de dichos sitios web. Te
              recomendamos leer las políticas de privacidad de cada sitio web que visitas.
            </p>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 9 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">9. Cambios a esta Política de Privacidad</h4>
            <p class="mb-3">
              Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en
              nuestras prácticas o por motivos legales. Publicaremos cualquier cambio en nuestro
              sitio web y actualizaremos la fecha de entrada en vigor. Te recomendamos revisar esta
              política periódicamente para estar informado sobre cómo protegemos tu información.
            </p>
          </li>

          <!-- Horizontal Line -->
          <div class="h-px w-full bg-sgray-100"></div>

          <!-- 10 -->
          <li class="mb-3">
            <h4 class="text-base font-semibold">10. Contacto</h4>
            <p class="mb-3">
              Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad, no dudes en
              contactarnos a través de :
            </p>

            <div class="flex flex-col">
              <span class="mb-3"
                ><span class="font-semibold">Correo Electrónico: </span
                >sigmacuba2023@gmail.com</span
              >
              <span class="mb-6"
                ><span class="font-semibold">Teléfono / Whatsapp: </span>+53 50009047</span
              >
              <span class="text-xs font-semibold">SIGMA, LA HABANA, CUBA, 2024</span>
            </div>
          </li>
        </ol>
      </section>
    </main>
  </div>

  <!-- Footer -->
  <footer>
    <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
  </footer>
</template>
