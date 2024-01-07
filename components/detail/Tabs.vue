<template>
  <use-element-visibility v-slot="{ isVisible }">
    <div
      class="flex max-md:overflow-x-auto"
      :class="{ 'fixed top-0 z-50 bg-white': !isVisible }"
    >
      <nuxt-link
        :to="route.path + '#' + tab"
        v-for="(tab, indx) in tabs"
        :key="indx"
        @click="emits('changeTab', tab)"
        class="min-w-max py-2 px-2 text-sm border-b-4 border-white text-gray-500"
        :class="{ 'border-b-blue-500 text-blue-500': activeTab === tab }"
      >
        <h1 class="pt-4">{{ tab }}</h1>
      </nuxt-link>
    </div>
  </use-element-visibility>
</template>

<script setup>
import { UseElementVisibility } from "@vueuse/components";

defineProps({
  activeTab: String,
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
