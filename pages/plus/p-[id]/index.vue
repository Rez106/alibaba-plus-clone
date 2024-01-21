<template>
  <nuxt-layout :name="mobile ? 'mobile' : 'desktop'">
    <nuxt-layout :name="mobile ? 'detail' : undefined">
      <detail-gallery v-if="mobile" :items="detail.gallery" />
      <desktop-detail-gallery v-if="!mobile" :images="detail.gallery" />
      <detail-tabs
        @changeTab="tabHandler"
        :activeTab="currentTab"
        :categoryId="detail.category.id"
        :cityId="detail.city.id"
      />
      <v-divider class="border-opacity-100" />
      <nuxt-layout name="desktop-container">
        <div class="px-4 w-full" id="در یک نگاه">
          <detail-breadcrumb :detail="detail" />
          <div class="2xl:flex 2xl:items-center 2xl:justify-between">
            <detail-header
              :detail="detail"
              :reviewAvg="detail.ratings.average"
              :review="detail.ratings.count"
            />
            <div
              class="flex items-center justify-center gap-3 mt-5 max-2xl:border-t max-2xl:border-b border-gray-500 py-3"
            >
              <v-btn
                icon="mdi-share-variant-outline"
                flat
                class="border border-gray-500 text-gray-500"
                @click="shareHandler(detail.share_url)"
              />
              <v-divider class="border-opacity-100" vertical />
              <v-btn
                icon="mdi-bookmark-plus-outline"
                flat
                class="border border-gray-500 text-gray-500"
              />
            </div>
          </div>
          <div class="2xl:flex 2xl:items-start">
            <detail-attributes :attributes="detail.attributes" />
            <detail-description :content="detail.content" />
          </div>
        </div>
        <use-element-visibility v-slot="{ isVisible }">
          <div
            class="w-full px-4 2xl:flex items-start justify-between gap-20"
            id="تجربه ها"
          >
            <detail-ratings
              :reviewsRatings="detail.ratings"
              :isVisible="isVisible"
            />
            <detail-comments
              v-if="detail.id"
              @filterComments="changeFilter"
              :activeFilters="appliedCommentFilters"
              :detailId="detail.id"
            />
          </div>
        </use-element-visibility>
        <div class="mt-10 2xl:flex 2xl:items-center" id="جاذبه‌های اطراف">
          <detail-map
            :main="{
              location: { ...detail.location },
              name: detail.persuading_title,
            }"
            :near="near"
          />
          <detail-near :near="near" />
        </div>
        <div class="2xl:flex 2xl:items-start">
          <div class="mt-10 px-4 2xl:min-w-[50%]" id="ساعات کاری">
            <detail-open-hour
              :openHours="detail.open_hours"
              :isVisible="detail.is_visible"
            />
          </div>
          <div id="اطلاعات تماس" class="2xl:min-w-[50%]">
            <detail-contact :contactDetail="detail.contact_detail" />
          </div>
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
  </nuxt-layout>
</template>

<script setup>
import { UseElementVisibility } from "@vueuse/components";
const route = useRoute();

const { width } = useWindowSize();

const mobile = computed(() => {
  return width.value < 600;
});

//--Details
const { data: detail, error: detailError } = await useFetch(
  `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/details`
);

// --similar;
const { data: similar, error: similarError } = await useFetch(
  `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/similars?page_size=25&same_city=true&same_category=true`
);
// --near
const { data: near, error: nearError } = await useFetch(
  `https://ws.alibaba.ir/api/v1/plus/user/pois/${route.params.id}/near?page_size=6&max_distance=10000`
);

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

const shareHandler = (url) => {
  const { share } = useShare();
  try {
    share({
      url,
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
