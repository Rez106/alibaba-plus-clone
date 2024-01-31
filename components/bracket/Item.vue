<template>
  <div class="h-[17rem]" v-if="!isCarousel">
    <nuxt-link :to="'/plus/p-' + detail.short_id">
      <v-img
        class="w-full"
        min-height="120"
        max-height="120"
        transition="fade-transition"
        cover
        :class="{ 'rounded-md': !isColored, 'rounded-t-md': isColored }"
        :src="imageUrl"
        :alt="detail.name"
        lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
        eager
      />
      <div class="flex flex-col gap-1 py-2">
        <div class="flex items-center justify-between text-sm px-1">
          <h1 class="font-semibold">{{ detail.name }}</h1>
          <v-icon icon="mdi-bookmark-plus-outline" />
        </div>
        <h6 class="text-xs px-2">{{ detail?.city?.name }}</h6>
        <p class="text-xs px-2">{{ formattedContentText }}</p>
      </div>
    </nuxt-link>
  </div>
  <div
    v-else
    class="relative min-h-[80px] max-sm:max-h-[80px] sm:max-h-[200px] overlay-img"
  >
    <nuxt-link :to="'p-' + detail.short_id">
      <v-img
        :src="imageUrl"
        lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
        :alt="detail.name"
        cover
        class="object-cover rounded-md"
        :min-height="mobile ? 60 : 150"
        :max-height="mobile ? 60 : 150"
        transition="fade-transition"
        eager
      />
      <span class="text-[0.5rem] sm:hidden">{{ detail.name }}</span>
      <div
        class="absolute top-0 left-0 bg-slate-900 bg-opacity-65 w-full h-full rounded-md flex items-end p-2 overlay-text duration-300 max-sm:hidden"
      >
        <span class="text-xl font-bold text-white">{{ detail.name }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
const { detail } = defineProps({
  detail: Object,
  isColored: Boolean,
  isCarousel: Boolean,
});

const { mobile } = useDisplay();

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

<style scoped>
.overlay-text {
  opacity: 0;
}

.overlay-img:hover .overlay-text {
  opacity: 1;
}
</style>
