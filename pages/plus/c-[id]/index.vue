<template>
  <nuxt-layout :name="mobile ? 'mobile' : 'desktop'">
    <nuxt-layout :name="mobile ? 'detail' : 'desktop-container'">
      <div class="mb-5">
        <detail-gallery v-if="mobile" :items="data?.city?.gallery" />
        <desktop-detail-gallery v-else :images="data?.city?.gallery" />
      </div>
      <mobile-category-list
        :items="category.result?.items"
        :search="true"
        :home="mobile ? false : true"
        :cityIdProp="data.city?.id"
      />
      <div class="px-4 my-5">
        <h1 class="font-bold md:text-2xl">{{ data.city?.persuading_title }}</h1>
        <detail-description :content="data.city?.content" :city="true" />
      </div>
      <div class="" v-for="item in data.city?.categories">
        <bracket-list :item="item" :isCity="true" :cityName="data.city?.name" />
      </div>
      <city-reviews
        v-if="data.comments?.result?.items"
        :items="data.comments?.result?.items"
      />
      <!-- <city-reviews :items="city" /> -->
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup>
const route = useRoute();
const { data, error: cityError } = useAsyncData(
  "city-data",
  async () => {
    const cityResponse = await $fetch(
      `https://ws.alibaba.ir/api/v1/plus/user/cities/${route.params.id}/details`
    );
    if (!(await cityResponse) || (await cityResponse) === null) {
      throw createError({
        statusCode: 402,
        message: "Something went wrong while fetching data!",
        fatal: true,
      });
    }
    const detailResponse = await $fetch(
      `https://ws.alibaba.ir/api/v1/plus/user/reviews/details?page_size=4&page_no=1&promoted_only=true&having_gallery_only=false&city_id=${await cityResponse.id}`
    );
    return {
      city: cityResponse,
      comments: detailResponse,
    };
  },
  [route.params.id]
);

const { data: category, error: cateError } = await useFetch(
  "https://ws.alibaba.ir/api/v1/plus/user/categories?only_main=true"
);

useHead({
  title: data.value?.city?.name + " – جاذبه‌ها، نظرات و تصاویر | علی بابا پلاس",
});

const { width } = useWindowSize();
const mobile = computed(() => {
  return width.value < 600;
});
</script>

<style lang="scss" scoped></style>
