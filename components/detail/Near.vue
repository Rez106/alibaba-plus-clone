<template>
  <div class="w-full px-4 mt-10 2xl:grid 2xl:grid-cols-2 gap-4">
    <div
      v-for="place in near.result.items"
      :key="place.id"
      class="flex items-center gap-4 min-h-[100px] max-h-[100px]"
    >
      <div class="w-fit h-full">
        <nuxt-link :to="'/plus/p-' + place.short_id">
          <v-img
            :src="place.gallery[0].large_url"
            lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
            :alt="place.name"
            class="rounded-md"
            cover
            min-height="100"
            max-height="100"
            width="100"
            eager
          />
        </nuxt-link>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="font-bold">{{ place.name }}</h1>
        <div
          v-if="place.ratings.average !== 0"
          class="flex items-center gap-2 text-sm"
        >
          <v-rating
            half-increments
            hover
            readonly
            :length="5"
            :size="22"
            :model-value="place.ratings.average"
            color="#6C7680"
            active-color="#6C7680"
            density="compact"
          />
          <span class="text-xs">{{ place.ratings.count }} نظر</span>
        </div>
        <h3 v-else class="text-sm">
          {{ place.category.parent.default_phrase }}
        </h3>
        <h3 class="text-sm">{{ place.category.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  near: Object,
});
</script>

<style lang="scss" scoped></style>
