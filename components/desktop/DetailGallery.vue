<template>
  <div class="w-full">
    <div class="w-full 2xl:w-[1200px] 2xl:mx-auto">
      <div
        class="w-24 h-24 rounded-r-md bg-cover"
        :style="{ backgroundImage: `url(${cover?.large_url})` }"
      ></div>
      <div class=""></div>
      <div class=""></div>
    </div>
  </div>
</template>

<script setup>
const { images } = defineProps({
  images: Array,
});

const cover = ref({});

cover.value = images.find((img) => img.is_cover) || images[0];
</script>

<style scoped></style>
