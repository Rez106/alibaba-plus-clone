<template>
  <v-breadcrumbs class="text-sm text-gray-400 px-0 mx-0">
    <v-breadcrumbs-item href="/plus" title="خانه" />
    <v-breadcrumbs-divider />
    <v-breadcrumbs-item
      :href="`/plus/c-${detail.city.short_id}`"
      :title="detail.city.name"
    />
    <v-breadcrumbs-divider />
    <v-breadcrumbs-item
      :href="`/plus/search/city-${detail.city.id}/category-${
        route.params.categoryId === 'all' ? 'all' : detail.category.parent.id
      }`"
      :title="
        route.params.categoryId === 'all'
          ? 'همه مکان‌ها'
          : detail.category.parent.name
      "
    />
    <v-breadcrumbs-divider v-if="!search" />
    <v-breadcrumbs-item
      v-if="!search"
      :title="detail.name"
      class="text-black"
    />
  </v-breadcrumbs>
</template>

<script setup>
const route = useRoute();
defineProps({
  detail: Object,
  search: Boolean,
});
</script>

<style lang="scss" scoped></style>
