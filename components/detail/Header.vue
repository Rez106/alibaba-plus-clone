<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-col items-start gap-2">
      <h1 class="text-xl font-bold">{{ detail.persuading_title }}</h1>
      <p class="text-gray-500 text-xs">
        <span class="text-cyan-600 text-2xl font-semibold">{{
          reviewAvg
        }}</span>
        <span class="text-cyan-600 font-semibold">/5</span>
        امتیاز کاربران
        <span class="text-xs">({{ review.result.totalCount + "نظر" }})</span>
        <span class="address max-sm:hidden">
          <v-icon icon="mdi-circle-small" />
          {{ detail.contact_detail.address }}
        </span>
      </p>
    </div>

    <nuxt-link
      :to="`https://www.google.com/maps?q=${detail.location.coordinates[0]},${detail.location.coordinates[1]}`"
      target="_blank"
    >
      <v-btn
        rounded
        color="primary"
        elevation="0"
        prepend-icon="mdi-map-marker-path"
      >
        مسیریابی
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script setup>
defineProps({
  detail: Object,
  review: Object,
  reviewAvg: Number,
});
</script>

<style lang="scss" scoped></style>
