<script setup>
  import { ref, onMounted, onUnmounted, watch } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import Cropper from "cropperjs";

  const layoutStore = useLayoutStore();

  let cropper = null;

  const img = ref(null);

  onMounted(() => {
    cropper = new Cropper(img.value, {
      aspectRatio: 16 / 9,
      viewMode: 3,
      minCropBoxWidth: 160,
      dragMode: "move",
      background: false,
      autoCrop: true,
      autoCropArea: 1,

      // crop(event) {
      //   console.log(event.detail.x);
      //   console.log(event.detail.y);
      //   console.log(event.detail.width);
      //   console.log(event.detail.height);
      //   console.log(event.detail.rotate);
      //   console.log(event.detail.scaleX);
      //   console.log(event.detail.scaleY);
      // },
      // viewMode: 3,
      // minCropBoxWidth: 256,
      // minCropBoxHeight: 256,
      // dragMode: "move",
      // background: false,
      // cropBoxMovable: false,
      // cropBoxResizable: false,
    });
  });

  onUnmounted(() => {
    cropper.destroy();
  });

  const closeImageCropper = () => {
    layoutStore.hideImageCropper();
  };

  const getCanvas = () => {
    cropper.getCroppedCanvas().toBlob(
      (blob) => {
        const imageURL = URL.createObjectURL(blob);
        layoutStore.setBlobImageURL(imageURL);
      },
      "image/jpeg",
      1
    );
    layoutStore.hideImageCropper();
  };
</script>

<template>
  <!-- NavBar -->
  <div class="fixed top-0 z-10 w-full">
    <nav class="flex h-[68px] justify-end space-x-4 p-4">
      <img
        @click.prevent="closeImageCropper"
        class="custom-shadow w-5"
        src="../assets/exit-fullscreen-icon.svg"
        alt="Exit Fullscreen"
      />
      <img @click.prevent="getCanvas" src="../assets/edit-icon.svg" />
    </nav>
  </div>

  <!--Cropper.js: https://github.com/fengyuanchen/cropperjs -->
  <div
    @touchstart.prevent
    @touchmove.prevent
    @touchend.prevent
    @wheel.prevent
    @touchcancel.prevent
    @gesturestart.prevent
    @gesturechange.prevent
    @gestureend.prevent
    class="absolute flex h-full w-full items-center justify-center"
  >
    <div class="flex h-full w-full flex-col items-center justify-center object-contain px-5">
      <!-- Cropper Container -->
      <div class="">
        <img ref="img" :src="layoutStore.getCropFileURL" class="block max-w-full" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
