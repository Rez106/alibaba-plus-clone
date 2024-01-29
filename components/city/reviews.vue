<template>
  <swiper
    :slides-per-view="1"
    :space-between="20"
    :breakpoints="{
      1300: {
        slidesPerView: 4,
      },
    }"
    class="mb-10"
  >
    <swiper-slide
      v-for="review in items"
      :key="review.id"
      class="max-sm:px-5 mt-10"
    >
      <city-review :review="review" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
const { items } = defineProps({
  items: Object,
});
</script>

<style scoped></style>
