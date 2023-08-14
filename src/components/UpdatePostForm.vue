<script setup>
  import { usePostStore } from "../stores/post";
  import NumberInput from "./NumberInput.vue";
  import RadioInput from "./RadioInput.vue";
  import SelectInput from "./SelectInput.vue";
  import { provinceList, municipalityList } from "../utils/provinces";
  import { ref, computed, watch } from "vue";
  import parsePhoneNumber from "libphonenumber-js";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const postStore = usePostStore();

  const props = defineProps(["post"]);

  const parsedPhoneNumber = parsePhoneNumber(props.post.phone);
  const phoneInput = ref(parsedPhoneNumber.nationalNumber);
  const callCodeInput = ref(`+${parsedPhoneNumber.countryCallingCode}`);

  const newPost = ref({
    type: props.post.__t,
    address: {
      province: props.post.address.province,
      municipality: props.post.address.municipality,
    },
    features: {
      bed_room: props.post.features.bed_room,
      bath_room: props.post.features.bath_room,
      garage: props.post.features.garage,
      garden: props.post.features.garden,
      pool: props.post.features.pool,
      furnished: props.post.features.furnished,
    },
    phone: props.post.phone,
    description: props.post.description,
    currency: props.post.currency,
    frequency: props.post.frequency ? props.post.frequency : "",
    amount: props.post.__t === "sale" ? props.post.price : props.post.tax,
  });

  const formattedPhone = computed(() => {
    return callCodeInput.value + phoneInput.value;
  });

  const invalidPhone = ref(false);

  watch(formattedPhone, () => {
    try {
      const parsedPhoneNumber = parsePhoneNumber(formattedPhone.value);
      if (!parsedPhoneNumber.isValid()) {
        invalidPhone.value = true;
      } else {
        invalidPhone.value = false;
      }
    } catch (error) {}
  });

  const activeProvince = computed(() => newPost.value.address.province);
  const activeType = computed(() => newPost.value.type);

  watch(activeProvince, () => {
    newPost.value.address.municipality = "";
  });

  watch(activeType, () => {
    if (activeType.value === "rent") {
      newPost.value.frequency = "monthly";
    } else {
      newPost.value.frequency = "";
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

    if (
      newPost.value.features.bed_room < 0 ||
      newPost.value.features.bed_room > 10 ||
      newPost.value.features.bath_room < 0 ||
      newPost.value.features.bath_room > 10 ||
      !regex.test(bath_roomToString) ||
      !regex.test(bed_roomToString)
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
      newPost.value.type === props.post.__t &&
      newPost.value.currency === props.post.currency &&
      newPost.value.frequency === (props.post.__t === "sale" ? "" : props.post.frequency) &&
      newPost.value.address.province === props.post.address.province &&
      newPost.value.address.municipality === props.post.address.municipality &&
      newPost.value.features.bed_room == props.post.features.bed_room &&
      newPost.value.features.bath_room == props.post.features.bath_room &&
      newPost.value.features.garden == props.post.features.garden &&
      newPost.value.features.garage == props.post.features.garage &&
      newPost.value.features.pool == props.post.features.pool &&
      newPost.value.features.furnished == props.post.features.furnished &&
      newPost.value.amount === (props.post.__t === "sale" ? props.post.price : props.post.tax) &&
      newPost.value.description === props.post.description &&
      formattedPhone.value === props.post.phone
    )
      return true;
    return false;
  });

  const formSubmit = async () => {
    newPost.value.phone = formattedPhone.value;
    try {
      await postStore.updatePost(route.params.id, newPost.value);
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
        <RadioInput
          v-model="newPost.type"
          type="type"
          :option="post.type === 'sale' ? 'first' : 'second'"
        />

        <div class="flex min-[320px]:gap-0 min-[400px]:gap-2">
          <!-- Currency -->
          <RadioInput
            v-model="newPost.currency"
            type="currency"
            :option="post.currency === 'mn' ? 'first' : 'second'"
          />
          <!-- Frequency -->
          <RadioInput
            v-if="newPost.type === 'rent'"
            v-model="newPost.frequency"
            type="frequency"
            :option="post.currency === 'monthly' ? 'first' : 'second'"
          />
        </div>
      </div>

      <!-- Features -->
      <div class="mb-1 w-[275px]">
        <div
          class="flex items-center justify-between rounded-md border border-sgray-100 px-5 pb-1 pt-2"
        >
          <!-- Number Inputs -->
          <div class="mb-4 flex flex-col gap-1">
            <!-- Bed Room -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Cuartos</span>
              <NumberInput v-model="newPost.features.bed_room" />
            </div>

            <!-- Bathroom -->
            <div class="flex w-[73px] flex-col text-xs min-[420px]:w-[83px] min-[420px]:text-sm">
              <span>Baños</span>
              <NumberInput v-model="newPost.features.bath_room" />
            </div>
          </div>

          <!-- Vertical Line -->
          <div class="h-[100px] w-0 border-e border-sgray-100"></div>

          <!-- Checkboxs -->
          <div class="relative bottom-[2px] space-y-1">
            <!-- Garage -->
            <div class="flex gap-2">
              <input v-model="newPost.features.garage" type="checkbox" name="garage" id="garage" />
              <label for="garage">Garage</label>
            </div>

            <!-- Garden -->
            <div class="flex gap-2">
              <input v-model="newPost.features.garden" type="checkbox" name="garden" id="garden" />
              <label for="garden">Jardín</label>
            </div>

            <!-- Pool -->
            <div class="flex gap-2">
              <input v-model="newPost.features.pool" type="checkbox" name="pool" id="pool" />
              <label for="pool">Piscina</label>
            </div>

            <!-- Furnished -->
            <div class="flex gap-2">
              <input
                v-model="newPost.features.furnished"
                type="checkbox"
                name="furnished"
                id="furnished"
              />
              <label for="furnished">Amueblada</label>
            </div>
          </div>
        </div>
        <span
          class="text-shadow relative top-1 px-4 font-archivo text-sm italic text-alert"
          :class="featuresError ? 'visible' : 'invisible'"
          >Error Message</span
        >
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
