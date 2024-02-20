<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
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
    });
  });

  onUnmounted(() => {
    cropper.destroy();
  });

  const closeImageCropper = () => {
    if (layoutStore.editImage.status) {
      layoutStore.resetEditImage();
    }
    layoutStore.resetSingleImageURLState();
    layoutStore.hideImageCropper();
  };

  const getCanvas = () => {
    cropper.getCroppedCanvas().toBlob(
      (blob) => {
        const imageURL = URL.createObjectURL(blob);

        if (layoutStore.editImage.status) {
          layoutStore.editPostImageURL(layoutStore.editImage.index, imageURL, blob);
          layoutStore.resetEditImage();
        } else {
          layoutStore.setPostImageURL(imageURL, blob);
        }
        layoutStore.resetSingleImageURLState();
      },
      "image/jpeg",
      0.5
    );
    layoutStore.hideImageCropper();
  };
</script>

<template>
  <!-- NavBar -->
  <div class="fixed top-0 z-10 w-full">
    <nav class="flex h-[68px] items-center justify-end space-x-4 p-4">
      <img @click.prevent="getCanvas" src="../assets/crop-icon.svg" class="w-8" />
      <img
        @click.prevent="closeImageCropper"
        class="custom-shadow w-5"
        src="../assets/exit-fullscreen-icon.svg"
        alt="Exit Fullscreen"
      />
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
        <img ref="img" :src="layoutStore.getSingleImageURLState" class="block max-w-full" />
      </div>
    </div>
  </div>
</template>
