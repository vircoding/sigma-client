<script setup>
  const props = defineProps(["icon", "weigth"]);
</script>

<template>
  <!-- True -->
  <div v-if="props.icon">
    <!-- Ligth -->
    <svg
      v-if="props.weigth === 'ligth'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      class="text-shadow relative bottom-[1px] h-[10px] w-3"
    >
      <defs id="defs1" />
      <g id="layer1" transform="translate(-1350)">
        <path
          style="
            color: #000000;
            fill: #333333;
            fill-opacity: 1;
            stroke-linecap: round;
            stroke-linejoin: round;
            -inkscape-stroke: none;
            paint-order: stroke markers fill;
          "
          d="m 1372.2754,1.0625 c 0,0 -9.1921,7.4000647 -17.2949,18.839844 -1.3555,-6.260378 -3,-9.835938 -3,-9.835938 a 1,1 0 0 0 -1.3594,-0.3886716 1,1 0 0 0 -0.3906,1.3593746 c 0,0 1.9463,3.469203 3.3105,11.28711 a 1.0001,1.0001 0 0 0 1.8164,0.384765 c 8.1789,-12.200308 18.1563,-20.0761715 18.1563,-20.0761715 a 1,1 0 0 0 0.166,-1.4042969 1,1 0 0 0 -1.4043,-0.1660156 z"
          id="path61"
        />
      </g>
    </svg>
    <!-- Bold -->
    <svg
      v-if="props.weigth === 'bold'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      class="text-shadow relative bottom-[2px] h-[15px] w-4"
    >
      <defs id="defs1" />
      <g id="layer1" transform="translate(-1384)">
        <path
          style="
            color: #000000;
            fill: #595959;
            fill-opacity: 1;
            stroke-width: 1.05705;
            stroke-linecap: round;
            stroke-linejoin: round;
            -inkscape-stroke: none;
            paint-order: stroke markers fill;
          "
          d="m 1406.6015,0.71929801 a 1.5855804,1.5855804 0 0 0 -1.1686,0.33032929 c 0,0 -8.2576,6.7121401 -15.8578,17.0924747 -1.2422,-5.08936 -2.6034,-8.2953939 -2.6034,-8.2953939 a 1.5855804,1.5855804 0 0 0 -2.1554,-0.6173027 1.5855804,1.5855804 0 0 0 -0.6174,2.1553986 c 0,0 1.8032,3.190223 3.0949,10.593246 a 1.585739,1.585739 0 0 0 2.8779,0.611109 c 7.7567,-11.570518 17.2247,-19.049675 17.2247,-19.0496749 a 1.5855804,1.5855804 0 0 0 0.2643,-2.2255934 1.5855804,1.5855804 0 0 0 -1.0592,-0.59459269 z"
          id="path63"
        />
      </g>
    </svg>
  </div>
  <!-- False -->
  <div v-if="!props.icon">
    <!-- Ligth -->
    <svg
      v-if="props.weigth === 'ligth'"
      class="h-4 w-[13px]"
      width="26"
      height="32"
      viewBox="0 0 26 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 16L22 16" stroke="#959595" stroke-width="2" stroke-linecap="round" />
    </svg>
    <!-- Bold -->
    <svg
      v-if="props.weigth === 'bold'"
      class="h-6 w-6"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 24L31 24" stroke="#959595" stroke-width="5" stroke-linecap="round" />
    </svg>
  </div>
</template>
