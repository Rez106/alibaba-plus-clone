<template>
  <nuxt-layout :name="mobile ? 'mobile' : 'desktop'">
    <mobile-header v-if="mobile" />
    <header-hero :data="hero" />
    <desktop-category
      v-if="!mobile"
      :items="categories.result.items"
      :cities="cities.result.items"
    />
    <mobile-category-list
      v-if="mobile"
      :items="categories.result.items"
      :cities="cities.result.items"
      :search="false"
    />
    <bracket-container :items="brackets.result.items" />
  </nuxt-layout>
</template>

<script setup>
const { width } = useWindowSize();

const mobile = computed(() => {
  return width.value < 600;
});

useHead({
  title: "جمع تجربه‌های سفر | علی‌بابا پلاس",
});

//--Brackets
const { data: brackets, bracketsError } = await useFetch(
  "https://ws.alibaba.ir/api/v1/plus/user/brackets"
);

//--Categories
const { data: categories, categoriesError } = await useFetch(
  "https://ws.alibaba.ir/api/v1/plus/user/categories?only_main=true"
);

//Cities
const { data: cities, error } = await useFetch(
  "https://ws.alibaba.ir/api/v1/plus/user/cities"
);

//--Hero
const { data: hero, heroError } = await useFetch(
  "https://ws.alibaba.ir/api/v1/plus/user/home"
);
</script>

<style scoped></style>
