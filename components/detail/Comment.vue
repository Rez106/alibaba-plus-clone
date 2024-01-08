<template>
  <v-card class="w-full" color="#ccc" variant="outlined">
    <v-card-item>
      <div class="text-black flex items-center justify-between">
        <div class="flex items-center gap-2">
          <v-avatar
            image="https://cdn.alibaba.ir/h2/mobile/assets/images/avatar-4c776756.svg"
            size="50"
          />
          <div class="flex flex-col">
            <span class="text-sm">{{
              name === " " ? "کاربر علی‌بابا" : name
            }}</span>
            <span class="text-[0.55rem] text-gray-500"
              >{{
                new Date(date).toLocaleString("fa-ir", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              }}
            </span>
          </div>
        </div>
        <v-btn
          icon="mdi-share-variant-outline"
          color="gray"
          flat
          variant="text"
        />
      </div>
    </v-card-item>
    <v-divider class="border-opacity-100 w-11/12 mx-auto" />
    <v-card-item>
      <div class="text-gray-800 flex flex-col gap-2">
        <h1 class="text-sm text-gray-500">
          5/
          <span class="text-2xl font-semibold text-black">{{
            rating + " " + ratingText()
          }}</span>
        </h1>
        <h2 class="text-sm font-semibold mb-2">{{ title }}</h2>
        <p class="text-sm mb-2">{{ text }}</p>
      </div>
    </v-card-item>
    <v-divider class="border-opacity-100 w-11/12 mx-auto" />
    <v-card-actions
      class="text-gray-700 flex items-center justify-between px-4 py-4"
    >
      <v-btn prepend-icon="mdi-comment-multiple" variant="text" flat>
        پاسخ به این دیدگاه
      </v-btn>
      <v-btn
        :prepend-icon="liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
        variant="outlined"
        rounded
        flat
        class="text-gray-500"
      >
        {{ likeCount }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const { rating } = defineProps({
  id: String,
  authorId: String,
  name: String,
  date: String,
  rating: Number,
  title: String,
  text: String,
  likeCount: Number,
  liked: Boolean,
});

const ratingText = () => {
  if (rating === 1) return "خیلی بد";
  else if (rating === 2) return "بد";
  else if (rating === 3) return "متوسط";
  else if (rating === 4) return "خوب";
  else if (rating === 5) return "فوق‌العاده";
  else return;
};
</script>

<style scoped></style>
