<template>
  <div class="2xl:order-2">
    <h1 class="px-4 font-bold text-xl 2xl:hidden">
      جاذبه‌های اطراف
      {{ main.name }}
    </h1>
    <div class="h-[200px] mt-5 2xl:h-72 2xl:min-w-[500px]">
      <l-map :zoom="13" :center="main.location.coordinates">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <l-marker :lat-lng="main.location.coordinates">
          <l-popup> {{ main.name }} </l-popup>
          <l-icon :icon-size="[50, 80]" class-name="leaflet">
            <v-icon icon="mdi-map-marker" size="50" class="text-yellow-400" />
          </l-icon>
        </l-marker>
        <l-marker
          v-for="place in near.result.items"
          :key="place.id"
          :lat-lng="place.location.coordinates"
          class="bg-gray-500"
        >
          <l-icon :icon-size="[50, 80]" class-name="leaflet">
            <v-icon
              icon="mdi-map-marker-outline"
              size="50"
              class="text-gray-800"
            />
          </l-icon>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup>
const { main } = defineProps({
  main: Object,
  near: Object,
});
</script>

<style scoped>
.leaflet-div-icon {
  background: steelblue;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  font-weight: bold;
  font-size: large;
  text-align: center;
  line-height: 21px;
}
</style>
