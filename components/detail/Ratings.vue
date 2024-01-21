<template>
  <div
    class="max-2xl:w-full w-max mt-5 order-1"
    :class="{ '2xl:sticky 2xl:top-28 ': isVisible }"
  >
    <div class="flex items-start gap-1">
      <div class="">
        <p>
          <span class="text-cyan-600 text-2xl font-semibold">{{
            +reviewsRatings.average.toFixed(1)
          }}</span>
          <span class="text-cyan-600 font-semibold">/5</span>
        </p>
        <p class="text-[0.5rem] text-gray-500">
          بر اساس نظر {{ reviewsRatings.count }} نفر
        </p>
      </div>
      <v-rating
        empty-icon="mdi-circle-outline"
        full-icon="mdi-circle"
        half-icon="mdi-circle-half"
        active-color="blue"
        half-increments
        readonly
        :model-value="+reviewsRatings.average.toFixed(1)"
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
          :model-value="reviewsRatings.specifics[i]"
          color="#17A2B8"
          density="compact"
        />
        <span>{{ ratingCounts[i].text }}</span>
        <span class="mr-auto text-[0.55rem] text-gray-500"
          >{{ reviewsRatings.specifics[i] }} نظر</span
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
  reviewsRatings: Object,
  isVisible: Boolean,
});

const ratingCounts = ref({
  1: {
    text: "خیلی بد",
  },
  2: {
    text: "بد",
  },
  3: {
    text: "متوسط",
  },
  4: {
    text: "خوب",
  },
  5: {
    text: "فوق‌العاده",
  },
});
</script>

<style lang="scss" scoped></style>
