<template>
  <nuxt-layout name="mobile">
    <nuxt-layout name="detail">
      <detail-gallery :items="detail.gallery" />
      <detail-tabs @changeTab="tabHandler" :activeTab="currentTab" />
      <v-divider class="border-opacity-100" />
      <div class="px-4 w-full" id="در یک نگاه">
        <detail-breadcrumb :detail="detail" />
        <detail-header
          :detail="detail"
          :reviewAvg="reviewAvg"
          :review="review"
        />
        <div
          class="flex items-center justify-center gap-3 mt-5 border-t border-b border-gray-500 py-3"
        >
          <v-btn
            icon="mdi-share-variant-outline"
            flat
            class="border border-gray-500 text-gray-500"
          />
          <v-divider class="border-opacity-100" vertical />
          <v-btn
            icon="mdi-bookmark-plus-outline"
            flat
            class="border border-gray-500 text-gray-500"
          />
        </div>
        <detail-attributes :attributes="detail.attributes" />
        <detail-description :content="detail.content" id="scrollable-element" />
      </div>
      <div class="h-[50vh] w-full px-4" id="تجربه ها">
        <detail-ratings :review="reviewAvg" :reviews="review" />
      </div>
      <div class="h-[50vh]" id="جاذبه‌های اطراف">slm</div>
      <div class="h-[50vh]" id="ساعات کاری">slm</div>
      <div class="h-[50vh]" id="اطلاعات تماس">slm</div>
      <div class="h-[50vh]" id="مکان های مشابه">slm</div>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup>
// const { data: detail, error } = await useFetch(
//   `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/details`
// );
const { b9215288: detail, review } = useData();
const route = useRoute();
const reviewAvg = ref(0);

const currentTab = ref("در یک نگاه");

onMounted(() => {
  currentTab.value = route.hash.replace("#", "") || "در یک نگاه";
  const sumRating = review.result.items.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);
  reviewAvg.value = (sumRating / review.result.totalCount).toFixed(1);
});
const tabHandler = (tab) => {
  currentTab.value = tab;
};
</script>

<style scoped></style>
