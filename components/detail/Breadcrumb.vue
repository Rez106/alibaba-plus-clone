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
      :href="`/plus/search/city-${detail.city.id}/category-${detail.category.parent.id}`"
      :title="detail.category.parent.name"
    />
    <v-breadcrumbs-divider />
    <v-breadcrumbs-item :title="detail.name" class="text-black" />
  </v-breadcrumbs>
</template>

<script setup>
defineProps({
  detail: Object,
});
</script>

<style lang="scss" scoped></style>
