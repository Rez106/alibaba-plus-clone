<template>
  <nuxt-layout name="mobile">
    <mobile-header />
    <header-hero :data="hero" />
    <mobile-category-list
      :items="categories.result.items"
      :cities="cities.result.items"
    />
    <bracket-container :items="brackets.result.items" />
  </nuxt-layout>
</template>

<script setup>
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

// const { brackets, hero, categories } = useData();
</script>

<style scoped></style>
