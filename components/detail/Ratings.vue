<template>
  <div class="w-full mt-5">
    <div class="flex items-start gap-1">
      <div class="">
        <p>
          <span class="text-cyan-600 text-2xl font-semibold">{{ review }}</span>
          <span class="text-cyan-600 font-semibold">/5</span>
        </p>
        <p class="text-[0.5rem] text-gray-500">
          بر اساس نظر {{ reviews.result.totalCount }} نفر
        </p>
      </div>
      <v-rating
        empty-icon="mdi-circle-outline"
        full-icon="mdi-circle"
        half-icon="mdi-circle-half"
        active-color="blue"
        half-increments
        readonly
        :model-value="review"
        color="#17A2B8"
        density="compact"
      />
    </div>
    <div class="flex flex-col-reverse mt-5">
      <div v-for="i in 5" :key="i" class="flex items-center gap-3">
        <span>{{ i }}</span>
        <v-rating
          empty-icon="mdi-circle-outline"
          full-icon="mdi-circle"
          half-icon="mdi-circle-half"
          active-color="blue"
          half-increments
          readonly
          :model-value="ratingCounts[i].count"
          color="#17A2B8"
          density="compact"
        />
        <span>{{ ratingCounts[i].text }}</span>
        <span class="mr-auto text-[0.55rem] text-gray-500"
          >{{ ratingCounts[i].count }} نظر</span
        >
      </div>
    </div>
    <div class="w-full flex mt-5">
      <v-btn
        text="اشتراک تجربه"
        prepend-icon="mdi-message-plus"
        class="grow"
        color="primary"
        flat
        size="large"
        rounded="lg"
      />
    </div>
  </div>
</template>

<script setup>
const { reviews } = defineProps({
  review: Number,
  reviews: Object,
});

const ratingCounts = ref({
  1: {
    count: 0,
    text: "خیلی بد",
  },
  2: {
    count: 0,
    text: "بد",
  },
  3: {
    count: 0,
    text: "متوسط",
  },
  4: {
    count: 0,
    text: "خوب",
  },
  5: {
    count: 0,
    text: "فوق‌العاده",
  },
});

for (let item of reviews.result.items) {
  ratingCounts.value[item.rating].count++;
}
</script>

<style lang="scss" scoped></style>
