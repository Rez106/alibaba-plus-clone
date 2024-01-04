<template>
  <div class="w-full my-5">
    <bracket-list
      v-for="item in items"
      :key="item.id"
      :item="item"
      :isColored="item.type === 'colored'"
      :isCarousel="item.type === 'carousel'"
    />
  </div>
</template>

<script setup>
defineProps({
  items: Array,
});
</script>

<style lang="scss" scoped></style>
