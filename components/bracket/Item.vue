<template>
  <div class="h-[17rem]" v-if="!isCarousel">
    <nuxt-link :to="'/plus/p-' + detail.short_id">
      <nuxt-img
        class="object-cover min-h-[120px] max-h-[120px] w-full"
        :class="{ 'rounded-md': !isColored, 'rounded-t-md': isColored }"
        :src="imageUrl"
        placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
        :alt="detail.name"
        :quality="30"
        :loading="'lazy'"
      />
      <div class="flex flex-col gap-1 py-2">
        <div class="flex items-center justify-between text-sm px-1">
          <h1 class="font-semibold">{{ detail.name }}</h1>
          <v-icon icon="mdi-bookmark-plus-outline" />
        </div>
        <h6 class="text-xs px-2">{{ detail.city.name }}</h6>
        <p class="text-xs px-2">{{ formattedContentText }}</p>
      </div>
    </nuxt-link>
  </div>
  <div v-else class="min-h-[80px] max-h-[80px]">
    <nuxt-link :to="'p-' + detail.short_id">
      <nuxt-img
        :src="imageUrl"
        placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
        :alt="detail.name"
        class="object-cover min-h-[60px] max-h-[60px] sm:w-[100px] w-[90px] rounded-md"
        :quality="30"
        loading="lazy"
      />
      <span class="text-[0.5rem]">{{ detail.name }}</span>
    </nuxt-link>
  </div>
</template>

<script setup>
const { detail, type } = defineProps({
  detail: Object,
  isColored: Boolean,
  isCarousel: Boolean,
});

const imageUrl = ref("");
const img = detail.gallery.find((img) => img.is_cover) || detail.gallery[0];
imageUrl.value = img.large_url;

const formattedContentText = computed(() => {
  const text = detail.content;
  if (text.length > 100) {
    return text.substring(0, 85) + "...";
  }
});
</script>

<style lang="scss" scoped></style>
