<script setup>
  import { useUserStore } from "../stores/user";
  import { usePostStore } from "../stores/post";
  import { useLayoutStore } from "../stores/layout"
  import NumberInput from "./NumberInput.vue";
  import RadioInput from "./RadioInput.vue";
  import SelectInput from "./SelectInput.vue";
  import { provinceList, municipalityList } from "../utils/provinces";
  import { ref, computed, watch, onMounted } from "vue";
  import parsePhoneNumber from "libphonenumber-js";
  import { useRoute } from "vue-router";
  import router from "../router";

  const postStore = usePostStore();
  const layoutStore = useLayoutStore()

  const route = useRoute();

  const prevPost = ref({
    type: "sale",
    address: {
      province: "La Habana",
      municipality: "",
    },
    features: {
      living_room: 0,
      bed_room: 0,
      bath_room: 0,
      dinning_room: 0,
      kitchen: 0,
      garage: 0,
      garden: 0,
      pool: 0,
    },
    phone: "",
    description: "",
    currency: "mn",
    frequency: "",
    amount: null,
  });

  const newPost = ref({
    type: "sale",
    address: {
      province: "La Habana",
      municipality: "",
    },
    features: {
      living_room: 0,
      bed_room: 0,
      bath_room: 0,
      dinning_room: 0,
      kitchen: 0,
      garage: 0,
      garden: 0,
      pool: 0,
    },
    phone: "",
    description: "",
    currency: "mn",
    frequency: "",
    amount: null,
  });

  const provinceFirstChange = ref(true);
  const frequencyFirstChange = ref(true);

  const activeProvince = computed(() => newPost.value.address.province);
  const activeType = computed(() => newPost.value.type);

  watch(activeProvince, () => {
    if (!provinceFirstChange.value) {
      newPost.value.address.municipality = "";
    }
    provinceFirstChange.value = false;
  });

  watch(activeType, () => {
    if (!frequencyFirstChange.value) {
      if (activeType.value === "rent") {
        newPost.value.frequency = "monthly";
      } else {
        newPost.value.frequency = "";
      }
    }
    frequencyFirstChange.value = false;
  });

  const phoneInput = ref("");
  const callCodeInput = ref("+53");

  const formattedPhone = computed(() => {
    return callCodeInput.value + phoneInput.value;
  });

  const invalidPhone = ref(true);

  watch(phoneInput, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        throw new Error("Non-valid Phone Number");
      } else {
        invalidPhone.value = false;
      }
    } catch (error) {
      invalidPhone.value = true;
    }
  });

  const amountError = computed(() => {
    if (newPost.value.amount < 1 || !Number.isInteger(newPost.value.amount)) return true;
    return false;
  });

  const municipalityError = computed(() => {
    if (newPost.value.address.municipality === "") return true;
    return false;
  });

  const featuresError = computed(() => {
    const regex = /^[0-9]+$/;
    const bath_roomToString = newPost.value.features.bath_room.toString();
    const bed_roomToString = newPost.value.features.bed_room.toString();
    const dinning_roomToString = newPost.value.features.dinning_room.toString();
    const garageToString = newPost.value.features.garage.toString();
    const gardenToString = newPost.value.features.garden.toString();
    const kitchenToString = newPost.value.features.kitchen.toString();
    const living_roomToString = newPost.value.features.living_room.toString();
    const poolToString = newPost.value.features.pool.toString();

    if (
      newPost.value.features.bath_room < 0 ||
      newPost.value.features.bath_room > 10 ||
      newPost.value.features.bed_room < 0 ||
      newPost.value.features.bed_room > 10 ||
      newPost.value.features.dinning_room < 0 ||
      newPost.value.features.dinning_room > 10 ||
      newPost.value.features.garage < 0 ||
      newPost.value.features.garage > 10 ||
      newPost.value.features.garden < 0 ||
      newPost.value.features.garden > 10 ||
      newPost.value.features.kitchen < 0 ||
      newPost.value.features.kitchen > 10 ||
      newPost.value.features.living_room < 0 ||
      newPost.value.features.living_room > 10 ||
      newPost.value.features.pool < 0 ||
      newPost.value.features.pool > 10 ||
      !regex.test(bath_roomToString) ||
      !regex.test(bed_roomToString) ||
      !regex.test(dinning_roomToString) ||
      !regex.test(garageToString) ||
      !regex.test(gardenToString) ||
      !regex.test(kitchenToString) ||
      !regex.test(living_roomToString) ||
      !regex.test(poolToString)
    )
      return true;
    return false;
  });

  const codeError = computed(() => {
    if (!/^\+\d+$/.test(callCodeInput.value) || !(callCodeInput.value.length <= 4)) return true;
    return false;
  });

  const phoneError = computed(() => {
    if (invalidPhone.value) return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (
      amountError.value ||
      municipalityError.value ||
      featuresError.value ||
      codeError.value ||
      phoneError.value
    )
      return true;
    if (
      newPost.value.type === prevPost.value.type &&
      newPost.value.currency === prevPost.value.currency &&
      newPost.value.frequency === prevPost.value.frequency &&
      newPost.value.address.province === prevPost.value.address.province &&
      newPost.value.address.municipality === prevPost.value.address.municipality &&
      newPost.value.features.bed_room == prevPost.value.features.bed_room &&
      newPost.value.features.bath_room == prevPost.value.features.bath_room &&
      newPost.value.features.dinning_room == prevPost.value.features.dinning_room &&
      newPost.value.features.living_room == prevPost.value.features.living_room &&
      newPost.value.features.kitchen == prevPost.value.features.kitchen &&
      newPost.value.features.garden == prevPost.value.features.garden &&
      newPost.value.features.garage == prevPost.value.features.garage &&
      newPost.value.features.pool == prevPost.value.features.pool &&
      newPost.value.amount === prevPost.value.amount &&
      newPost.value.description === prevPost.value.description &&
      formattedPhone.value === prevPost.value.phone
    )
      return true;
    return false;
  });

  const getPost = async (id) => {
    try {
      const res = await postStore.getPost(id);

      if (res.__t === "rent") {
        prevPost.value.frequency = res.frequency;
        newPost.value.frequency = res.frequency;
        prevPost.value.amount = res.tax;
        newPost.value.amount = res.tax;
      } else {
        prevPost.value.frequency = "";
        newPost.value.frequency = "";
        prevPost.value.amount = res.price;
        newPost.value.amount = res.price;
      }

      // Previous Post
      prevPost.value.type = res.__t;
      prevPost.value.address.province = res.address.province;
      prevPost.value.address.municipality = res.address.municipality;
      prevPost.value.features.bath_room = res.features.bath_room;
      prevPost.value.features.bed_room = res.features.bed_room;
      prevPost.value.features.dinning_room = res.features.dinning_room;
      prevPost.value.features.garage = res.features.garage;
      prevPost.value.features.garden = res.features.garden;
      prevPost.value.features.kitchen = res.features.kitchen;
      prevPost.value.features.living_room = res.features.living_room;
      prevPost.value.features.pool = res.features.pool;
      prevPost.value.phone = res.phone;
      prevPost.value.description = res.description;
      prevPost.value.currency = res.currency;

      // New Post
      newPost.value.type = res.__t;
      newPost.value.address.province = res.address.province;
      newPost.value.address.municipality = res.address.municipality;
      newPost.value.features.bath_room = res.features.bath_room;
      newPost.value.features.bed_room = res.features.bed_room;
      newPost.value.features.dinning_room = res.features.dinning_room;
      newPost.value.features.garage = res.features.garage;
      newPost.value.features.garden = res.features.garden;
      newPost.value.features.kitchen = res.features.kitchen;
      newPost.value.features.living_room = res.features.living_room;
      newPost.value.features.pool = res.features.pool;
      newPost.value.phone = res.phone;
      newPost.value.description = res.description;
      newPost.value.currency = res.currency;

      // Code and Phone Setup
      const parsedPhoneNumber = parsePhoneNumber(res.phone);

      callCodeInput.value = "+" + parsedPhoneNumber.countryCallingCode;
      phoneInput.value = parsedPhoneNumber.nationalNumber;

      console.log(newPost.value);
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async () => {
    newPost.value.phone = formattedPhone.value;
    try {
      await postStore.updatePost(route.params.id, newPost.value);

      router.push(`/post/${route.params.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    try {
      layoutStore.unhideLoading();
      await getPost(route.params.id);
      layoutStore.hideLoading();
    } catch (error) {
      console.log(error);
    }
  });

</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center py-7 max-[1023px]:px-[10%] max-[499px]:px-[5%] lg:items-start lg:justify-center lg:gap-7 lg:px-24 lg:py-0 xl:px-32 2xl:px-44"
  >
    <div class="text-shadow mb-4 lg:mb-0">
      <h1
        class="mb-2 text-center text-4xl font-extrabold max-[1023px]:text-4xl max-[505px]:text-3xl lg:mb-0 lg:text-left lg:text-4xl"
      >
        Publica tu casa!
      </h1>
      <span class="block text-center text-sgray-300 lg:text-left lg:text-lg"
        >Define si vendes o rentas tu casa y agrega los datos requeridos</span
      >
    </div>
    <form
      @submit.prevent="formSubmit"
      novalidate
      class="flex w-full grid-cols-2 grid-rows-6 flex-col lg:grid lg:gap-x-8 lg:gap-y-2"
    >
      <div class="mb-4">
        <!-- Type -->
        <RadioInput
          v-model="newPost.type"
          type="type"
          :option="prevPost.type === 'sale' ? 'first' : 'second'"
        />

        <div class="flex min-[320px]:gap-0 min-[400px]:gap-2">
          <!-- Currency -->
          <RadioInput
            v-model="newPost.currency"
            type="currency"
            :option="prevPost.currency === 'mn' ? 'first' : 'second'"
          />
          <!-- Frequency -->
          <RadioInput
            v-if="newPost.type === 'rent'"
            v-model="newPost.frequency"
            type="frequency"
            :option="prevPost.currency === 'monthly' ? 'first' : 'second'"
          />
        </div>
      </div>

      <!-- Amount -->
      <div class="mb-1 w-full">
        <input
          type="number"
          min="1"
          v-model="newPost.amount"
          placeholder="Precio"
          class="w-full rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
        />
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="amountError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>

      <!-- Address -->
      <div class="mb-1">
        <!-- Province -->
        <div
          class="flex flex-col gap-2 rounded-md border border-sgray-100 px-2 py-2 min-[420px]:px-2 min-[460px]:px-4"
        >
          <SelectInput
            v-model="newPost.address.province"
            type="province"
            :options-list="provinceList"
          />

          <!-- Municipality -->
          <SelectInput
            v-model="newPost.address.municipality"
            type="municipality"
            :options-list="municipalityList[activeProvince]"
          />
        </div>
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="municipalityError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>

      <!-- Features -->
      <div class="mb-1">
        <div
          class="flex flex-col gap-2 rounded-md border border-sgray-100 px-2 pb-3 pt-2 min-[420px]:px-2 min-[460px]:px-4"
        >
          <div class="flex w-full justify-evenly">
            <!-- Bed Room -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Cuartos</span>
              <NumberInput v-model="newPost.features.bed_room" />
            </div>

            <!-- Dinning Room -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Comedores</span>
              <NumberInput v-model="newPost.features.dinning_room" />
            </div>

            <!-- Kitchen -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Cocinas</span>
              <NumberInput v-model="newPost.features.kitchen" />
            </div>

            <!-- Garage -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Garages</span>
              <NumberInput v-model="newPost.features.garage" />
            </div>
          </div>

          <div class="flex w-full justify-evenly">
            <!-- Bathroom -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Baños</span>
              <NumberInput v-model="newPost.features.bath_room" />
            </div>

            <!-- Livingroom -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Salas</span>
              <NumberInput v-model="newPost.features.living_room" />
            </div>

            <!-- Garden -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Jardínes</span>
              <NumberInput v-model="newPost.features.garden" />
            </div>

            <!-- Pool -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Piscinas</span>
              <NumberInput v-model="newPost.features.pool" />
            </div>
          </div>
        </div>

        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="featuresError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>

      <!-- Description -->
      <div class="col-start-1 row-span-2 row-start-4 mb-2 flex flex-col lg:mb-0">
        <textarea
          maxlength="160"
          v-model.trim="newPost.description"
          class="h-[120px] resize-none rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:h-full lg:text-lg"
          placeholder="Descripción (160 carácteres máximo)"
        ></textarea>
        <span
          class="text-shadow invisible relative top-1 px-4 font-archivo text-sm italic text-alert"
          >Error Message</span
        >
      </div>

      <!-- Phone -->
      <!-- <input type="text" placeholder="Número de Teléfono (Requerido)" name="phone" /> -->
      <div class="relative col-start-2 row-start-3 mb-1 flex flex-col">
        <div class="flex w-full items-center gap-4">
          <input
            type="text"
            v-model.trim="callCodeInput"
            class="inline-block w-[70px] rounded-md border border-sgray-100 bg-transparent py-2 text-center font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
            :class="
              codeError
                ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
                : 'ring-sigma'
            "
            placeholder="+53"
          />
          <!-- Phone Number -->
          <input
            type="tel"
            v-model.trim="phoneInput"
            class="grow rounded-md border border-sgray-100 bg-transparent px-4 py-2 font-medium transition-colors duration-200 placeholder:text-sgray-200 hover:border-sgray-300 hover:bg-gray-100 focus:border-transparent focus:bg-gray-100 focus:shadow-[0_2px_10px_rgba(0,_0,_0,_0.4)] focus:outline-none focus:ring-1 lg:text-lg"
            :class="
              phoneError
                ? 'border-transparent ring-2 ring-alert hover:border-transparent focus:border-transparent focus:ring-2'
                : 'ring-sigma'
            "
            placeholder="Número De Teléfono"
          />
        </div>
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="phoneError ? 'visible' : 'invisible'"
          >Error Message</span
        >
      </div>

      <!-- Submit -->
      <button
        :disabled="disableSubmit"
        type="submit"
        class="flex h-[38px] w-full items-center justify-center rounded-md border border-sgray-400 bg-sgray-400 text-center font-semibold text-sgray-100 shadow-[0_0_10px_rgba(0,_0,_0,_0.4)] transition-all duration-200 ease-out hover:bg-black hover:text-white hover:shadow-[0_2px_10px_rgba(0,_0,_0,_0.5)] disabled:border disabled:border-sgray-100 disabled:bg-transparent disabled:font-normal disabled:text-sgray-200 disabled:shadow-[0_0_10px_rgba(0,_0,_0,_0)] lg:h-10 lg:w-44 lg:text-lg"
      >
        Publicar
      </button>
    </form>
  </div>
</template>
