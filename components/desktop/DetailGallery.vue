<template>
  <div class="w-full">
    <div
      class="w-full h-[500px] 2xl:w-[1200px] 2xl:mx-auto 2xl:flex 2xl:items-center 2xl:gap-5"
    >
      <div class="w-9/12">
        <v-img
          :src="cover?.large_url"
          height="500"
          cover
          class="w-full rounded-r-lg"
        />
      </div>
      <div class="w-2/12 h-full flex flex-col justify-between gap-4">
        <div
          class="w-full h-2/5 bg-cover"
          :style="{ backgroundImage: `url(${images[1].large_url})` }"
        ></div>
        <div
          class="w-full h-4/5 bg-cover"
          :style="{ backgroundImage: `url(${images[3]?.large_url})` }"
        ></div>
      </div>
      <div class="w-2/12 h-full flex flex-col justify-between gap-4">
        <div
          class="w-full h-4/5 bg-cover"
          :style="{
            backgroundImage: `url(${images[5]?.large_url})`,
            borderTopLeftRadius: '0.5rem',
          }"
        ></div>
        <div
          class="w-full h-2/5 bg-cover"
          :style="{
            backgroundImage: `url(${images[7].large_url})`,
            borderBottomLeftRadius: '0.5rem',
          }"
        ></div>
      </div>
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
