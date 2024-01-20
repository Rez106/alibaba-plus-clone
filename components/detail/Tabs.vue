<template>
  <use-element-visibility v-slot="{ isVisible }">
    <div
      class="w-full"
      :class="{
        'fixed top-0 z-[9999] bg-white border-b border-gray-700 drop-shadow-md':
          !isVisible,
      }"
    >
      <div class="2xl:w-[1200px] 2xl:mx-auto xl:text-lg">
        <div v-if="!isVisible" class="flex items-center justify-between px-4">
          <nuxt-link
            :to="'/plus/search/city-' + cityId + '/category-' + categoryId"
            class="text-blue-400"
          >
            <v-icon icon="mdi-menu-right" />
            مشاهده همه جاذبه ها
          </nuxt-link>
          <v-btn icon="mdi-share-variant-outline" flat variant="text" />
        </div>
        <div class="flex max-md:overflow-x-auto">
          <nuxt-link
            :to="route.path + '#' + tab"
            v-for="(tab, indx) in tabs"
            :key="indx"
            @click="emits('changeTab', tab)"
            class="min-w-max py-2 px-2 text-sm border-b-4 border-white text-gray-500"
            :class="{ 'border-b-blue-500 text-blue-500': activeTab === tab }"
          >
            <h1 class="pt-4 xl:text-lg">{{ tab }}</h1>
          </nuxt-link>
        </div>
      </div>
    </div>
  </use-element-visibility>
</template>

<script setup>
import { UseElementVisibility } from "@vueuse/components";

const { mobile } = useDisplay();

defineProps({
  activeTab: String,
  categoryId: String,
  cityId: String,
});

const tabs = [
  "در یک نگاه",
  "تجربه ها",
  "جاذبه‌های اطراف",
  "ساعات کاری",
  "اطلاعات تماس",
  "مکان های مشابه",
];

const route = useRoute();

const emits = defineEmits(["changeTab"]);
</script>

<style lang="scss" scoped></style>
