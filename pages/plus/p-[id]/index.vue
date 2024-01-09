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
          :reviewAvg="detail.ratings.average"
          :review="detail.ratings.count"
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
        <detail-ratings :reviewsRatings="detail.ratings" />
        <detail-comments
          v-if="detail.id"
          @filterComments="changeFilter"
          :activeFilters="appliedCommentFilters"
          :detailId="detail.id"
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
      <div class="h-[50vh] mt-10 px-4" id="ساعات کاری">
        <detail-open-hour
          :openHours="detail.open_hours"
          :isVisible="detail.is_visible"
        />
      </div>
      <div id="اطلاعات تماس">
        <detail-contact :contactDetail="detail.contact_detail" />
      </div>
      <div class="my-10" id="مکان های مشابه">
        <h1 class="text-xl font-bold px-4">مکان های مشابه</h1>
        <bracket-list :item="similar.result.items" :isDetail="true" />
      </div>
      <div class="">
        <h1 class="text-xl font-bold px-4 mb-5">سوالات متداول</h1>
        <detail-faq :faq="detail.faq" />
      </div>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup>
const route = useRoute();

//--Details
const { data: detail, detailError } = await useFetch(
  `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/details`
);

// --similar;
const { data: similar, similarError } = await useFetch(
  `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/similars?page_size=25&same_city=true&same_category=true`
);
// --near
const { data: near, nearError } = await useFetch(
  `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/near?page_size=6&max_distance=10000`
);

const { share, isSupported } = useShare();

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
