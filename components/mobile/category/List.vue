<template>
  <swiper
    :slides-per-view="mobile ? 3 : 4"
    :space-between="mobile ? 20 : 10"
    class="py-2 px-2"
    v-if="!home"
  >
    <swiper-slide class="w-auto">
      <nuxt-link
        v-if="search"
        :to="'/plus/search/city-' + cityId + '/category-all'"
        class="w-auto 2xl:w-full border border-gray-400 rounded-xl py-1 flex items-center px-2 shadow-sm shadow-gray-300 text-gray-600 cursor-pointer 2xl:flex-col 2xl:items-start 2xl:text-lg"
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
  <div v-else class="w-full flex items-center justify-between gap-3">
    <nuxt-link
      v-if="search"
      :to="'/plus/search/city-' + cityId + '/category-all'"
      class="border border-gray-400 rounded-xl py-1 flex grow items-center px-2 shadow-sm shadow-gray-300 text-gray-600 cursor-pointer 2xl:flex-col 2xl:items-start 2xl:text-lg"
    >
      <div class="opacity-50 max-w-8 max-h-8">
        <v-icon icon="mdi-map-marker-radius" size="x-large" />
      </div>
      <span class="text-sm">همه مکان‌ها</span>
    </nuxt-link>
    <div v-for="item in items" :key="item.id" class="grow">
      <mobile-category-item
        :id="item.id"
        :name="item.name"
        :icon="item.icon"
        :cities="cities"
        :search="search"
        :home="home"
        :cityIdProp="cityIdProp"
      />
    </div>
  </div>
</template>

<script setup>
const { search } = defineProps({
  items: Array,
  cities: Array,
  search: Boolean,
  home: Boolean,
  cityIdProp: String,
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
