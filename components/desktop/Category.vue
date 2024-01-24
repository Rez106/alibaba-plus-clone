<template>
  <div
    class="min-w-[500px] max-w-[750px] mx-auto relative -top-16 bg-white p-5 rounded-lg shadow-md"
  >
    <base-search-bar />
    <div class="mt-5">
      <mobile-category-list
        :items="items"
        :cities="cities"
        :search="false"
        :home="true"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  cities: Array,
  items: Array,
});
</script>

<style scoped></style>
