<script setup>
  import { ref, computed, watch } from "vue";
  import { useLayoutStore } from "../stores/layoutStore.js";
  import { useUserStore } from "../stores/userStore.js";
  import { usePostStore } from "../stores/postStore.js";
  import { defaultMunicipality } from "../utils/provinces.js";
  import TypeRadioInput from "./TypeRadioInput.vue";
  import CurrencyRadioInput from "./CurrencyRadioInput.vue";
  import FrequencyRadioInput from "./FrequencyRadioInput.vue";
  import AmountInput from "./AmountInput.vue";
  import OffersSelectInput from "./OffersSelectInput.vue";
  import NeedsSelectInput from "./NeedsSelectInput.vue";
  import ProvinceSelectInput from "./ProvinceSelectInput.vue";
  import MunicipalitySelectInput from "./MunicipalitySelectInput.vue";
  import FeatureNumberInput from "./FeatureNumberInput.vue";
  import FeatureCheckboxInput from "./FeatureCheckboxInput.vue";
  import DescriptionTextAreaInput from "./DescriptionTextAreaInput.vue";
  import CodeInput from "./CodeInput.vue";
  import PhoneInput from "./PhoneInput.vue";
  import WhatsappCheckboxInput from "./WhatsappCheckboxInput.vue";
  import PhotoBoxInput from "./PhotoBoxInput.vue";
  import parsePhoneNumber from "libphonenumber-js";
  import router from "../router";

  // Stores
  const layoutStore = useLayoutStore();
  const userStore = useUserStore();
  const postStore = usePostStore();

  // Refs
  const type = ref(postStore.insertTypeState);
  const saleDetails = ref({
    amount: "",
    currency: "usd",
  });
  const rentDetails = ref({
    amount: "",
    currency: "usd",
    frequency: "daily",
  });
  const exchangeDetails = ref({
    offers: 1,
    needs: 1,
  });
  const propertyDetails = ref([
    {
      address: {
        municipality: "La Habana Vieja",
        province: "La Habana",
      },
      features: {
        bed_room: 0,
        bath_room: 0,
        garage: false,
        garden: false,
        pool: false,
        furnished: false,
      },
    },
    {
      address: {
        municipality: "La Habana Vieja",
        province: "La Habana",
      },
      features: {
        bed_room: 0,
        bath_room: 0,
        garage: false,
        garden: false,
        pool: false,
        furnished: false,
      },
    },
    {
      address: {
        municipality: "La Habana Vieja",
        province: "La Habana",
      },
      features: {
        bed_room: 0,
        bath_room: 0,
        garage: false,
        garden: false,
        pool: false,
        furnished: false,
      },
    },
  ]);
  const postDetails = ref({
    description: "",
    contact_details: {
      contact: {
        code: "+53",
        phone: "",
      },
      contact_types: {
        phone: true,
        whatsapp: true,
      },
    },
  });
  const filledInputs = ref({
    saleAmount: false,
    rentAmount: false,
    phone: false,
  });
  const fileInput = ref(null);

  const openImageDialog = () => {
    fileInput.value.click();
  };

  const imageError = computed(() => {
    return !layoutStore.postImagesURLState.length;
  });

  const loadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      layoutStore.setSingleImageURLState(imageURL);
      layoutStore.unhideImageCropper();
    }
    event.target.value = null;
  };

  const editImage = (index) => {
    layoutStore.setEditImage(index);
    layoutStore.setSingleImageURLState(layoutStore.postImagesURLState[index].original);
    layoutStore.unhideImageCropper();
  };

  // Comps
  const propertyLength = computed(() => {
    if (type.value === "sale") return 1;
    else if (type.value === "rent") return 1;
    else if (type.value === "exchange") return parseInt(exchangeDetails.value.offers);
  });

  const getFirstProvince = computed(() => propertyDetails.value[0].address.province);
  const getSecondProvince = computed(() => propertyDetails.value[1].address.province);
  const getThirdProvince = computed(() => propertyDetails.value[2].address.province);

  const formattedPhone = computed(() => {
    return (
      postDetails.value.contact_details.contact.code +
      postDetails.value.contact_details.contact.phone
    );
  });

  const disableSubmit = computed(() => {
    if (imageError.value) return true;
    if (type.value === "sale") {
      if (
        saleAmountError.value ||
        BedRoomError.value[0] ||
        BathRoomError.value[0] ||
        descriptionError.value ||
        codeError.value ||
        phoneError.value
      )
        return true;
    } else if (type.value === "rent") {
      if (
        rentAmountError.value ||
        BedRoomError.value[0] ||
        BathRoomError.value[0] ||
        descriptionError.value ||
        codeError.value ||
        phoneError.value
      )
        return true;
    } else if (type.value === "exchange") {
      if (descriptionError.value || codeError.value || phoneError.value) return true;
      else {
        if (
          BedRoomError.value.slice(0, exchangeDetails.value.offers).includes(true) ||
          BathRoomError.value.slice(0, exchangeDetails.value.offers).includes(true)
        )
          return true;
      }
    }
    return false;
  });

  // Errors
  const saleAmountError = computed(() => {
    if (saleDetails.value.amount === "") return true;
    if (!saleDetails.value.amount) return true;
    else if (saleDetails.value.amount < 1 || saleDetails.value.amount > 999999999) return true;
    else return false;
  });

  const rentAmountError = computed(() => {
    if (rentDetails.value.amount === "") return true;
    else if (!rentDetails.value.amount) return true;
    else if (rentDetails.value.amount < 1 || rentDetails.value.amount > 999999999) return true;
    else return false;
  });

  const BedRoomError = computed(() => {
    const errors = [false, false, false];
    propertyDetails.value.forEach((item, index) => {
      if (item.features.bed_room === "" || item.features.bed_room < 0 || item.features.bed_room > 9)
        errors[index] = true;
    });

    return errors;
  });

  const BathRoomError = computed(() => {
    const errors = [false, false, false];
    propertyDetails.value.forEach((item, index) => {
      if (
        item.features.bath_room === "" ||
        item.features.bath_room < 0 ||
        item.features.bath_room > 9
      )
        errors[index] = true;
    });

    return errors;
  });

  const descriptionError = computed(() => {
    if (postDetails.value.description.length > 1200) return true;
    else return false;
  });

  const codeError = computed(() => {
    const regex = /^\+\d+$/;
    if (postDetails.value.contact_details.contact.code.length > 4) return true;
    else if (!regex.test(postDetails.value.contact_details.contact.code)) return true;
    else return false;
  });

  const phoneError = ref(true);

  // Watchs
  watch(getFirstProvince, () => {
    propertyDetails.value[0].address.municipality = defaultMunicipality(getFirstProvince.value);
  });

  watch(getSecondProvince, () => {
    propertyDetails.value[1].address.municipality = defaultMunicipality(getSecondProvince.value);
  });

  watch(getThirdProvince, () => {
    propertyDetails.value[2].address.municipality = defaultMunicipality(getThirdProvince.value);
  });

  watch(formattedPhone, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        throw new Error("Non-valid Phone Number");
      } else {
        phoneError.value = false;
      }
    } catch (error) {
      phoneError.value = true;
    }
  });

  // Methods
  const fillInput = (input) => {
    setTimeout(() => {
      switch (input) {
        case "saleAmount":
          filledInputs.value.saleAmount = true;
          break;
        case "rentAmount":
          filledInputs.value.rentAmount = true;
          break;
        case "phone":
          filledInputs.value.phone = true;
          break;
      }
    }, 2500);
  };

  const removeImage = (index) => {
    layoutStore.removePostImageURL(index);
  };

  const buildPost = (urls) => {
    const post = {
      type: type.value,
      description: postDetails.value.description,
      contact_details: {
        contact_types: {
          phone: postDetails.value.contact_details.contact_types.phone,
          whatsapp: postDetails.value.contact_details.contact_types.whatsapp,
        },
        contact: {
          code: postDetails.value.contact_details.contact.code,
          phone: postDetails.value.contact_details.contact.phone,
        },
      },
    };

    if (type.value === "sale") {
      post.amount_details = {
        amount: saleDetails.value.amount,
        currency: saleDetails.value.currency,
      };
      post.property_details = [propertyDetails.value[0]];
    } else if (type.value === "rent") {
      post.amount_details = {
        amount: rentDetails.value.amount,
        currency: rentDetails.value.currency,
        frequency: rentDetails.value.frequency,
      };
      post.property_details = [propertyDetails.value[0]];
    } else if (type.value === "exchange") {
      post.offer_details = {
        offers: exchangeDetails.value.offers,
        needs: {
          enable: exchangeDetails.value.needs === 0 ? false : true,
          count: exchangeDetails.value.needs,
        },
      };
      post.property_details = propertyDetails.value.slice(0, exchangeDetails.value.offers);
    }

    return post;
  };

  const resetComponent = () => {
    type.value = "sale";

    saleDetails.value.amount = "";
    saleDetails.value.currency = "usd";

    rentDetails.value.amount = "";
    rentDetails.value.currency = "usd";
    rentDetails.value.frequency = "daily";

    exchangeDetails.value.offers = 1;
    exchangeDetails.value.needs = 1;

    propertyDetails.value.forEach((item) => {
      item.address.municipality = "La Habana Vieja";
      item.address.province = "La Habana";
      item.features.bed_room = 0;
      item.features.bath_room = 0;
      item.features.garage = false;
      item.features.garden = false;
      item.features.pool = false;
      item.features.furnished = false;
    });

    postDetails.value.description = "";
    postDetails.value.contact_details.contact.code = "+53";
    postDetails.value.contact_details.contact.phone = "";
    postDetails.value.contact_details.contact_types.phone = true;
    postDetails.value.contact_details.contact_types.whatsapp = true;

    filledInputs.value.saleAmount = false;
    filledInputs.value.rentAmount = false;

    phoneError.value = true;

    layoutStore.resetEditImage();
    layoutStore.resetSingleImageURLState();
    layoutStore.resetPostImagesURL();
  };

  const formSubmit = async () => {
    layoutStore.unhideSpinnerLoading();
    try {
      const images = layoutStore.postImagesURLState.map((item) => item.file);
      const post = buildPost();
      const id = await userStore.insertPost(post, images);

      await router.push(`/post/${id}`);

      resetComponent();

      layoutStore.hideSpinnerLoading();
    } catch (error) {
      console.log(error);
      layoutStore.hideSpinnerLoading();
    }
  };

  setTimeout(() => {
    layoutStore.unhidePopup("pre-insert");
  }, 750);

  const pendingRefreshType = computed(() => {
    return postStore.pendingRefreshInsertTypeState;
  });

  watch(pendingRefreshType, () => {
    if (pendingRefreshType.value) {
      type.value = postStore.insertTypeState;
      postStore.resetInsertType();
      postStore.resetPendingRefreshInsertType();
    }
  });

  // Reset Insert Type State After Load
  postStore.setInsertType("sale");
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center py-10 max-[1023px]:px-[10%] max-[499px]:px-[5%]"
  >
    <!-- Hero -->
    <div class="flex w-full flex-col gap-2 px-5 text-center">
      <h2 class="text-shadow w-full text-2xl font-extrabold uppercase text-sblue-500">
        Section Title
      </h2>
      <p class="text-shadow w-full px-2 text-sm text-sgray-300">
        Crea tu cuenta como Propietario si deseas vender o rentar tu casa. Crea tu cuenta como
        Agente si deseas vender o rentar hasta 10 casas
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="formSubmit" novalidate class="mb-9 flex w-full flex-col py-10 text-base">
      <!-- Amount/Offer Details -->
      <div
        class="mb-4 flex h-[160px] w-full flex-row items-center rounded-lg border border-sgray-100 px-5 py-3 max-[345px]:px-3"
      >
        <!-- Type -->
        <div class="flex w-[35%] flex-col">
          <TypeRadioInput v-model="type" />
        </div>

        <!-- Sale Details -->
        <div v-if="type === 'sale'" class="flex w-[65%] flex-col">
          <!-- Currency -->
          <div class="mb-1 flex w-full flex-row">
            <CurrencyRadioInput v-model="saleDetails.currency" />
          </div>

          <!-- Amount -->
          <AmountInput
            v-model="saleDetails.amount"
            type="sale"
            :error="filledInputs.saleAmount && saleAmountError"
            @focused="fillInput('saleAmount')"
          />
        </div>

        <!-- Rent Details -->
        <div v-else-if="type === 'rent'" class="flex w-[65%] flex-col">
          <!-- Currency -->
          <div class="flex w-full flex-row gap-2">
            <CurrencyRadioInput v-model="rentDetails.currency" />
          </div>

          <!-- Frequency -->
          <div class="mb-1 flex w-full flex-row gap-2">
            <FrequencyRadioInput v-model="rentDetails.frequency" />
          </div>

          <!-- Amount -->
          <AmountInput
            v-model="rentDetails.amount"
            type="rent"
            :error="filledInputs.rentAmount && rentAmountError"
            @focused="fillInput('rentAmount')"
          />
        </div>

        <!-- Exchange Details -->
        <div v-else-if="type === 'exchange'" class="flex w-[65%] flex-col">
          <OffersSelectInput v-model="exchangeDetails.offers" class="mb-1" />
          <NeedsSelectInput v-model="exchangeDetails.needs" />
        </div>
      </div>

      <!-- Property Details -->
      <div
        v-for="(item, index) in new Array(propertyLength)"
        :key="index"
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-100 px-5 pb-5 pt-4 max-[345px]:px-3"
      >
        <!-- Province -->
        <ProvinceSelectInput
          v-model="propertyDetails[index].address.province"
          :index="index"
          class="mb-2 w-full"
        />

        <!-- Municipality -->
        <MunicipalitySelectInput
          v-model="propertyDetails[index].address.municipality"
          :index="index"
          :province="propertyDetails[index].address.province"
          class="mb-[14px] w-full"
        />

        <!-- Features -->
        <div
          class="flex w-full flex-row items-center rounded-lg border border-sgray-100 px-5 pb-[18px] pt-3"
        >
          <!-- Number Inputs -->
          <div class="flex w-[80px] flex-col space-y-1">
            <!-- Bed Room -->
            <FeatureNumberInput
              v-model="propertyDetails[index].features.bed_room"
              :index="index"
              feature="bed_room"
              string="Cuartos"
              :error="BedRoomError[index]"
            />

            <!-- Bathroom -->
            <FeatureNumberInput
              v-model="propertyDetails[index].features.bath_room"
              :index="index"
              feature="bath_room"
              string="Baños"
              :error="BathRoomError[index]"
            />
          </div>

          <!-- Checkboxs -->
          <div class="relative flex flex-grow flex-col pl-5 min-[400px]:pl-12">
            <!-- Garage -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.garage"
              :index="index"
              feature="garage"
              string="Garage"
            />

            <!-- Garden -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.garden"
              :index="index"
              feature="garden"
              string="Jardín"
            />

            <!-- Pool -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.pool"
              :index="index"
              feature="pool"
              string="Piscina"
            />

            <!-- Furnished -->
            <FeatureCheckboxInput
              v-model="propertyDetails[index].features.furnished"
              :index="index"
              feature="furnished"
              string="Amueblada"
            />
          </div>
        </div>
      </div>

      <!-- Description -->
      <div
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-100 px-5 pb-5 pt-4 max-[345px]:px-3"
      >
        <DescriptionTextAreaInput
          v-model.trim="postDetails.description"
          :error="descriptionError"
        />
      </div>

      <!-- Contact -->
      <div
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-100 px-5 py-4 max-[345px]:px-3"
      >
        <label
          v-if="codeError || (filledInputs.phone && phoneError)"
          for="phone"
          class="mb-1 pl-2 font-medium text-alert"
          >Teléfono no válido</label
        >
        <label v-else for="phone" class="mb-1 pl-2 font-medium text-sblue-500">Teléfono</label>
        <div class="mb-[8px] flex w-full gap-2">
          <CodeInput v-model="postDetails.contact_details.contact.code" :error="codeError" />
          <PhoneInput
            v-model="postDetails.contact_details.contact.phone"
            @focused="fillInput('phone')"
            :error="filledInputs.phone && phoneError"
          />
        </div>
        <WhatsappCheckboxInput v-model="postDetails.contact_details.contact_types.whatsapp" />
      </div>

      <!-- Photos -->
      <div
        class="mb-4 flex w-full flex-col rounded-lg border border-sgray-100 px-5 py-4 max-[345px]:px-3"
      >
        <!-- File Input (Hidden) -->
        <input type="file" @change="loadImage" class="hidden" ref="fileInput" accept="image/*" />

        <span class="mb-1 pl-2 font-medium text-sblue-500"
          >Fotos
          <span v-if="!layoutStore.postImagesURLState.length" class="text-xs">(Mín. 1)</span>
          <span v-else class="text-xs">{{ layoutStore.postImagesURLState.length }}/10</span></span
        >
        <div class="flex w-full flex-wrap gap-y-2">
          <PhotoBoxInput
            v-for="(item, index) in layoutStore.postImagesURLState"
            :key="index"
            :url="item.cropped"
            @remove="removeImage(index)"
            @edit="editImage(index)"
          />

          <!-- Add -->
          <button
            v-if="!layoutStore.postImagesURLState.length < 10"
            class="flex w-full items-center justify-center gap-[10px] rounded-lg bg-sblue-500 px-2 py-[7px]"
            @click.prevent="openImageDialog"
          >
            <span class="relative top-[1px] text-sgray-100">Añadir foto</span>
            <img
              src="../assets/exit-fullscreen-icon.svg"
              class="h-[14px] w-[14px] rotate-[135deg]"
            />
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="disableSubmit"
        class="mb-4 flex h-[38px] w-full items-center justify-center rounded-lg border border-sigma bg-sigma pt-[2px] text-center font-semibold text-sgray-100 transition-all duration-200 ease-out hover:bg-black hover:text-white disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 lg:h-10 lg:w-44 lg:text-lg"
      >
        Publicar
      </button>
      <span class="w-full text-center text-xs"
        >Si necesites ayuda para publicar tu anuncio, no olvides contactarnos a
        <a href="https://wa.me/+5350009047" class="font-semibold text-sblue-500">nuestro Whatsapp</a
        >.</span
      >
    </form>
  </div>
</template>
