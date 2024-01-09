<template>
  <swiper :slides-per-view="3" :space-between="20" class="mySwiper py-2 px-2">
    <swiper-slide v-for="item in items" :key="item.id" class="w-auto">
      <mobile-category-item
        :id="item.id"
        :name="item.name"
        :icon="item.icon"
        :cities="cities"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
defineProps({
  items: Array,
  cities: Array,
});
</script>

<style scoped></style>
