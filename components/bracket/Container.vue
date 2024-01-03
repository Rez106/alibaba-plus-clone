<template>
  <div class="w-full my-5">
    <bracket-list
      v-for="item in data.result.items"
      :key="item.id"
      :item="item"
      :isColored="item.type === 'colored'"
      :isCarousel="item.type === 'carousel'"
    />
  </div>
</template>

<script setup>
// const { data, error } = await useFetch(
//   "https://ws.alibaba.ir/api/v1/plus/user/brackets"
// );

const { brackets: data } = useData();
</script>

<style lang="scss" scoped></style>
