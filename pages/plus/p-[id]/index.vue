<template>
  <nuxt-layout name="mobile">
    <nuxt-layout name="detail">
      <detail-gallery :items="detail.gallery" />
      <detail-tabs
        @changeTab="tabHandler"
        :activeTab="currentTab"
        :id="detail.short_id"
      />
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
            :disabled="!isSupported"
            @click="shareHandler"
          />
          <v-divider class="border-opacity-100" vertical />
          <v-btn
            icon="mdi-bookmark-plus-outline"
            flat
            class="border border-gray-500 text-gray-500"
          />
        </div>
        <detail-attributes :attributes="detail.attributes" />
        <detail-description :content="detail.content" />
      </div>
      <div class="w-full px-4" id="تجربه ها">
        <detail-ratings :review="reviewAvg" :reviews="review" />
        <detail-comments
          @filterComments="changeFilter"
          :activeFilters="appliedCommentFilters"
          :reviews="review"
        />
      </div>
      <div class="mt-10" id="جاذبه‌های اطراف">
        <detail-map
          :main="{
            location: { ...detail.location },
            name: detail.persuading_title,
          }"
          :near="near"
        />
        <detail-near :near="near" />
      </div>
      <div class="h-[50vh]" id="ساعات کاری">slm</div>
      <div class="h-[50vh]" id="اطلاعات تماس">slm</div>
      <div class="h-[50vh]" id="مکان های مشابه">slm</div>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup>
//--Details
// const { data: detail, error } = await useFetch(
//   `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/details`
// );
//--Comments (No Filter)
// const { data: review, error } = await useFetch(
//   `https://ws.alibaba.ir/api/v1/plus/user/reviews?page_size=10&page_no=1&promoted_only=false&having_gallery_only=false&poi_id=${detail.id}`
// );
//--similar
// const { data: similar, error } = await useFetch(
//   `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/similars?page_size=25&same_city=true&same_category=true`
// );
//--near
// const { data: near, error } = await useFetch(
//   `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/near?page_size=6&max_distance=10000`
// );

const { share, isSupported } = useShare();
const { b9215288: detail, review, similar, near } = useData();
const route = useRoute();
const reviewAvg = ref(0);

const currentTab = ref("در یک نگاه");

const appliedCommentFilters = ref({
  filter: "",
  language: "",
});

const changeFilter = ({ action, value }) => {
  if (action === "filter") {
    appliedCommentFilters.value.filter = value;
  }
  if (action === "language") {
    appliedCommentFilters.value.language = value;
  }
  return;
};

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

const shareHandler = () => {
  try {
    share({
      url: detail.share_url,
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
