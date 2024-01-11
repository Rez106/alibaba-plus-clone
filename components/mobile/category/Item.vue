<template>
  <div
    v-if="!search"
    class="w-auto min-w-max border border-gray-400 rounded-xl py-1 px-2 shadow-sm shadow-gray-300 flex items-center text-gray-600 cursor-pointer"
    @click="categoryModalHandler"
  >
    <div class="opacity-50 max-w-8 max-h-8" v-html="icon.svg"></div>
    <span class="text-sm">{{ name }}</span>
  </div>

  <nuxt-link
    v-else
    :to="'/plus/search/city-' + cityId + '/category-' + id"
    class="w-auto min-w-max border border-gray-400 rounded-xl py-1 flex items-center px-2 shadow-sm shadow-gray-300 text-gray-600 cursor-pointer"
  >
    <div class="opacity-50 max-w-8 max-h-8" v-html="icon.svg"></div>
    <span class="text-sm">{{ name }}</span>
  </nuxt-link>
</template>

<script setup>
const { id, cities, icon, name, search } = defineProps({
  id: String,
  name: String,
  icon: Object,
  cities: Array,
  search: Boolean,
});
const { openModal } = useModal();

const cityId = ref("");

if (search) {
  const route = useRoute();
  cityId.value = route.params.cityId;
}

const categoryModalHandler = () => {
  openModal({
    search: false,
    label: "",
    items: cities,
    icon: icon.png_url,
    prefix: { id, name },
  });
};
</script>

<style scoped>
.router-link-exact-active {
  color: cornflowerblue !important;
  border-color: cornflowerblue !important;
  border-width: 2px !important;
}
</style>
