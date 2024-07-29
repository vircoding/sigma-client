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

    <!-- Form -->
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

      <section>
        <ol class="space-y-7 bg-white p-10 text-sm">
          <!-- 1 -->
          <li>
            <h4 class="font-semibold">1. Información que recopilamos</h4>
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

          <!-- 2 -->
          <li>
            <h4 class="font-semibold">2. Cómo utilizamos tu información</h4>
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
        </ol>
      </section>
    </main>
  </div>

  <!-- Footer -->
  <footer>
    <FooterSection background="#011b33" title="#ffffff" text="#ffffff" />
  </footer>
</template>
