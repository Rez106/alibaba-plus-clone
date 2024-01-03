<template>
  <div
    class="w-auto min-w-max border border-gray-400 rounded-xl py-1 px-2 shadow-sm shadow-gray-300 flex items-center text-gray-600 cursor-pointer"
    @click="categoryModalHandler"
  >
    <div class="opacity-50 max-w-8 max-h-8" ref="iconHolder"></div>
    <span class="text-sm">{{ name }}</span>
  </div>
</template>

<script setup>
const { icon, name } = defineProps({
  id: String,
  name: String,
  icon: Object,
});
const { openModal } = useModal();

const iconHolder = ref();
onMounted(() => {
  iconHolder.value.innerHTML = icon.svg;
});
// const { data: cities, error } = await useFetch(
//   "https://ws.alibaba.ir/api/v1/plus/user/cities"
// );

const { city: cities } = useData();
const categoryModalHandler = () => {
  console.log(cities.result.items);
  openModal({
    search: false,
    label: "",
    items: cities.result.items,
    icon: icon.png_url,
    prefix: name,
  });
};
</script>

<style scoped></style>
