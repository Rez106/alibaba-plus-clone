<template>
  <swiper
    :slides-per-view="mobile ? 3 : 4"
    :space-between="mobile ? 20 : 10"
    class="py-2 px-2"
  >
    <swiper-slide v-if="search" class="w-auto">
      <nuxt-link
        :to="'/plus/search/city-' + cityId + '/category-all'"
        class="w-auto min-w-max border border-gray-400 rounded-xl py-1 flex items-center px-2 shadow-sm shadow-gray-300 text-gray-600 cursor-pointer"
      >
        <div class="opacity-50 max-w-8 max-h-8">
          <v-icon icon="mdi-map-marker-radius" size="x-large" />
        </div>
        <span class="text-sm">همه مکان‌ها</span>
      </nuxt-link>
    </swiper-slide>
    <swiper-slide
      v-for="item in items"
      :key="item.id"
      :class="{ 'w-auto': !home, 'w-full': home }"
    >
      <mobile-category-item
        :id="item.id"
        :name="item.name"
        :icon="item.icon"
        :cities="cities"
        :search="search"
        :home="home"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
const { search } = defineProps({
  items: Array,
  cities: Array,
  search: Boolean,
  home: Boolean,
});

const { mobile } = useDisplay();

const cityId = ref("");

if (search) {
  const route = useRoute();
  cityId.value = route.params.cityId;
}
</script>

<style scoped>
.router-link-exact-active {
  color: cornflowerblue !important;
  border-color: cornflowerblue !important;
  border-width: 2px !important;
}
</style>
