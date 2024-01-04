<template>
  <nuxt-layout name="mobile">
    <mobile-header />
    <header-hero :data="hero" />
    <mobile-category-list :items="categories.result.items" />
    <bracket-container :items="brackets.result.items" />
  </nuxt-layout>
</template>

<script setup>
//--Brackets
// const { data, error } = await useFetch(
//   "https://ws.alibaba.ir/api/v1/plus/user/brackets"
// );
//--Categories
// const { data, error } = await useFetch(
//   "https://ws.alibaba.ir/api/v1/plus/user/categories?only_main=true"
// );
//--Cities
// const { data: cities, error } = await useFetch(
//   "https://ws.alibaba.ir/api/v1/plus/user/cities"
// );
//--Hero
// const { data, error } = await useFetch(
//   "https://ws.alibaba.ir/api/v1/plus/user/home"
// );

const { brackets, hero, categories } = useData();
</script>

<style scoped></style>
