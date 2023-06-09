<script setup>
  import { usePostStore } from "../stores/post";
  import NumberInput from "./NumberInput.vue";
  import RadioInput from "./RadioInput.vue";
  import SelectInput from "./SelectInput.vue";
  import { provinceList, municipalityList } from "../utils/provinces";
  import { ref, computed, watch } from "vue";
  import parsePhoneNumber from "libphonenumber-js";
  import router from "../router";

  const postStore = usePostStore();

  const post = ref({
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

  const activeProvince = computed(() => post.value.address.province);
  const activeType = computed(() => post.value.type);

  watch(activeProvince, () => {
    post.value.address.municipality = "";
  });

  watch(activeType, () => {
    if (activeType.value === "rent") {
      post.value.frequency = "monthly";
    } else {
      post.value.frequency = "";
    }
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

  const editedInputs = ref({
    amount: false,
    municipality: false,
    features: false,
    code: false,
    phone: false,
  });

  const editInput = (input) => {
    setTimeout(() => {
      switch (input) {
        case "amount":
          editedInputs.value.amount = true;
          break;
        case "municipality":
          editedInputs.value.municipality = true;
          break;
        case "features":
          editedInputs.value.features = true;
          break;
        case "code":
          editedInputs.value.code = true;
          break;
        case "phone":
          editedInputs.value.phone = true;
          break;
        default:
          break;
      }
    }, 2000);
  };

  const amountError = computed(() => {
    if (
      editedInputs.value.amount &&
      (post.value.amount < 1 || !Number.isInteger(post.value.amount))
    )
      return true;
    return false;
  });

  const municipalityError = computed(() => {
    if (editedInputs.value.municipality && post.value.address.municipality === "") return true;
    return false;
  });

  const featuresError = computed(() => {
    const regex = /^[0-9]+$/;
    const bath_roomToString = post.value.features.bath_room.toString();
    const bed_roomToString = post.value.features.bed_room.toString();
    const dinning_roomToString = post.value.features.dinning_room.toString();
    const garageToString = post.value.features.garage.toString();
    const gardenToString = post.value.features.garden.toString();
    const kitchenToString = post.value.features.kitchen.toString();
    const living_roomToString = post.value.features.living_room.toString();
    const poolToString = post.value.features.pool.toString();

    if (
      post.value.features.bath_room < 0 ||
      post.value.features.bath_room > 10 ||
      post.value.features.bed_room < 0 ||
      post.value.features.bed_room > 10 ||
      post.value.features.dinning_room < 0 ||
      post.value.features.dinning_room > 10 ||
      post.value.features.garage < 0 ||
      post.value.features.garage > 10 ||
      post.value.features.garden < 0 ||
      post.value.features.garden > 10 ||
      post.value.features.kitchen < 0 ||
      post.value.features.kitchen > 10 ||
      post.value.features.living_room < 0 ||
      post.value.features.living_room > 10 ||
      post.value.features.pool < 0 ||
      post.value.features.pool > 10 ||
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
    if (
      editedInputs.value.code &&
      (!/^\+\d+$/.test(callCodeInput.value) || !(callCodeInput.value.length <= 4))
    )
      return true;
    return false;
  });

  const phoneError = computed(() => {
    if (editedInputs.value.phone && invalidPhone.value) return true;
    return false;
  });

  const disableSubmit = computed(() => {
    if (
      !editedInputs.value.phone ||
      !editedInputs.value.amount ||
      !editedInputs.value.municipality
    ) {
      return true;
    }
    if (
      amountError.value ||
      municipalityError.value ||
      featuresError.value ||
      codeError.value ||
      phoneError.value
    ) {
      return true;
    }
    return false;
  });

  const formSubmit = async () => {
    post.value.phone = formattedPhone.value;
    try {
      const res = await postStore.insertPost(post.value);

      post.value.address.province = "La Habana";
      post.value.address.municipality = "";
      post.value.features.living_room = 0;
      post.value.features.bed_room = 0;
      post.value.features.bath_room = 0;
      post.value.features.dinning_room = 0;
      post.value.features.kitchen = 0;
      post.value.features.garage = 0;
      post.value.features.garden = 0;
      post.value.features.pool = 0;
      post.value.phone = "";
      post.value.description = "";
      post.value.amount = null;

      phoneInput.value = "";
      callCodeInput.value = "+53";

      invalidPhone.value = true;

      editedInputs.value.amount = false;
      editedInputs.value.features = false;
      editedInputs.value.municipality = false;
      editedInputs.value.code = false;
      editedInputs.value.phone = false;

      console.log(res);
      router.push(`/post/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };
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
        <RadioInput v-model="post.type" type="type" />

        <div class="flex min-[320px]:gap-0 min-[400px]:gap-2">
          <!-- Currency -->
          <RadioInput v-model="post.currency" type="currency" />
          <!-- Frequency -->
          <RadioInput v-if="post.type === 'rent'" v-model="post.frequency" type="frequency" />
        </div>
      </div>

      <!-- Amount -->
      <div class="mb-1 w-full">
        <input
          @focus="editInput('amount')"
          type="number"
          min="1"
          v-model="post.amount"
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
            v-model="post.address.province"
            type="province"
            :options-list="provinceList"
          />

          <!-- Municipality -->
          <SelectInput
            @focus="editInput('municipality')"
            v-model="post.address.municipality"
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
              <NumberInput @focus="editInput('features')" v-model="post.features.bed_room" />
            </div>

            <!-- Dinning Room -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Comedores</span>
              <NumberInput @focus="editInput('features')" v-model="post.features.dinning_room" />
            </div>

            <!-- Kitchen -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Cocinas</span>
              <NumberInput @focus="editInput('features')" v-model="post.features.kitchen" />
            </div>

            <!-- Garage -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Garages</span>
              <NumberInput @focus="editInput('features')" v-model="post.features.garage" />
            </div>
          </div>

          <div class="flex w-full justify-evenly">
            <!-- Bathroom -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Baños</span>
              <NumberInput @focus="editInput('features')" v-model="post.features.bath_room" />
            </div>

            <!-- Livingroom -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Salas</span>
              <NumberInput v-model="post.features.living_room" />
            </div>

            <!-- Garden -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Jardínes</span>
              <NumberInput @focus="editInput('features')" v-model="post.features.garden" />
            </div>

            <!-- Pool -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Piscinas</span>
              <NumberInput @focus="editInput('features')" v-model="post.features.pool" />
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
          v-model.trim="post.description"
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
            @focus="editInput('code')"
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
            @focus="editInput('phone')"
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
