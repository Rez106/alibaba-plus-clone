<template>
  <nuxt-link :to="'/plus/p-' + review.poi.short_id">
    <div
      class="review-container relative rounded-xl h-[24rem] bg-cover bg-no-repeat overflow-hidden cursor-pointer"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    >
      <div
        class="review-content relative xl:top-2/3 bg-gradient-to-b from-[rgba(0,0,0,0)] to-zinc-950 duration-500 p-5 min-h-full rounded-xl text-white flex flex-col gap-3"
      >
        <header class="flex items-center gap-3">
          <v-avatar
            image="https://cdn.alibaba.ir/h2/mobile/assets/images/avatar-4c776756.svg"
            size="50"
          />
          <span>
            {{
              review.author.first_name + " " + review.author.last_name ||
              "کاربر علی‌بابا"
            }}
          </span>
        </header>
        <b>{{ review.poi.name }}</b>
        <p>{{ review.content }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
const { review } = defineProps({
  review: Object,
});

const imageUrl = ref("");
const img =
  review.poi.gallery.find((img) => img.is_cover) || review.poi.gallery[0];
imageUrl.value = img.large_url;
</script>

<style scoped>
.review-container:hover .review-content {
  @apply top-0;
}
</style>
