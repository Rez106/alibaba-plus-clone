<template>
  <nuxt-layout name="mobile">
    <nuxt-layout name="detail">
      <detail-gallery :items="detail.gallery" />
      <div class="flex max-md:overflow-x-auto">
        <nuxt-link
          :to="route.path + '#' + tab"
          v-for="(tab, indx) in tabs"
          :key="indx"
          @click="tabHandler(tab)"
          class="min-w-max py-2 px-4 text-sm border-b-4 border-white text-gray-500"
          :class="{ 'border-b-blue-500 text-blue-500': currentTab === tab }"
        >
          <h1 class="pt-4">{{ tab }}</h1>
        </nuxt-link>
      </div>
      <v-divider />
      <div class="h-[50vh] px-4" id="در یک نگاه">
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
        <div class="flex items-center justify-between">
          <div class="flex flex-col items-start">
            <h1 class="text-xl font-bold">{{ detail.persuading_title }}</h1>
            <p class="text-gray-500 text-xs">
              <span class="text-cyan-600 text-2xl font-semibold">{{
                reviewAvg
              }}</span>
              <span class="text-cyan-600 font-semibold">/5</span>
              امتیاز کاربران
              <span class="text-xs"
                >({{ review.result.totalCount + "نظر" }})</span
              >
              <span class="address max-sm:hidden">
                <v-icon icon="mdi-circle-small" />
                {{ detail.contact_detail.address }}
              </span>
            </p>
          </div>
          <v-btn
            rounded
            color="primary"
            elevation="0"
            prepend-icon="mdi-map-marker-path"
            >مسیریابی</v-btn
          >
        </div>
      </div>
      <div class="h-[50vh]" id="تجربه ها">slm</div>
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
const tabs = [
  "در یک نگاه",
  "تجربه ها",
  "جاذبه‌های اطراف",
  "ساعات کاری",
  "اطلاعات تماس",
  "مکان های مشابه",
];

const reviewAvg = ref(0);

onMounted(() => {
  const sumRating = review.result.items.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);
  reviewAvg.value = (sumRating / review.result.totalCount).toFixed(1);
});

const route = useRoute();
const currentTab = ref("در یک نگاه");

const tabHandler = (tab) => {
  currentTab.value = tab;
};
</script>

<style scoped></style>
