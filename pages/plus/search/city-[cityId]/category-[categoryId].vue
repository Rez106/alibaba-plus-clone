<template>
  <nuxt-layout :name="mobile ? 'mobile' : 'desktop'">
    <nuxt-layout :name="mobile ? 'detail' : 'desktop-container'">
      <div class="px-4">
        <div class="">
          <detail-breadcrumb
            :detail="items?.result?.items[0] || allCategory?.result?.items[0]"
            :search="true"
          />
        </div>
        <h1 class="text-xl font-bold py-3">
          {{ categoryName + " " + "در" + " " + city.name }}
        </h1>
      </div>
      <mobile-category-list
        :search="true"
        :items="category?.result?.items"
        :home="mobile ? false : true"
      />
      <div
        class="flex flex-col gap-3 max-sm:w-11/12 mx-auto mt-10 md:grid md:grid-cols-2 md:gap-5 2xl:grid 2xl:grid-cols-4 2xl:gap-5"
      >
        <bracket-item
          v-if="!allCategory"
          v-for="item in items?.result?.items"
          :key="item.id"
          :detail="item"
          :isCarousel="false"
        />
        <bracket-item
          v-else
          v-for="item in allCategory?.result?.items"
          :key="item.short_id"
          :detail="item"
          :isCarousel="false"
        />
      </div>
      <div class="mb-5">
        <v-pagination
          v-model="pageNumber"
          :length="
            route.params.categoryId === 'all'
              ? Math.floor(allCategory?.result?.totalCount / 10)
              : Math.floor(items?.result?.totalCount / 10)
          "
          rounded="circle"
          density="compact"
          @update:modelValue="pageHandler"
        ></v-pagination>
      </div>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup>
const route = useRoute();
const pageNumber = ref(1);
const categoryName = ref("");

const { width } = useWindowSize();

const mobile = computed(() => {
  return width.value < 600;
});

const { data: category, error: cateError } = await useAsyncData(
  "category",
  async () => {
    try {
      const response = await $fetch(
        "https://ws.alibaba.ir/api/v1/plus/user/categories?only_main=true"
      );

      const cate = response.result.items.find(
        (item) => item.id === route.params.categoryId
      );
      if (!cate || cate === undefined) {
        categoryName.value = "همه مکان‌ها";
      } else {
        categoryName.value = cate.name;
      }

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  [route.params.categoryId]
);

const { data: allCategory, error: allCateError } = await useAsyncData(
  "all",
  () => {
    if (route.params.categoryId === "all") {
      return $fetch(
        `https://ws.alibaba.ir/api/v1/plus/user/pois/?city_id=${route.params.cityId}&page_size=10&page_no=${pageNumber.value}`
      );
    }
    return null;
  },

  {
    watch: [pageNumber],
  }
);

const { data: items, error: itemsError } = await useAsyncData(
  "items",
  () => {
    if (route.params.categoryId === "all") {
      return [];
    }

    return $fetch(
      `https://ws.alibaba.ir/api/v1/plus/user/pois/?city_id=${route.params.cityId}&category_id=${route.params.categoryId}&page_size=10&page_no=${pageNumber.value}`
    );
  },
  {
    watch: [pageNumber],
  }
);
const { data: city, error: cityError } = await useFetch(
  `https://ws.alibaba.ir/api/v1/plus/user/cities/${route.params.cityId}/details`
);

useHead({
  title: categoryName.value + " در " + city.value.name + " | علی‌بابا پلاس",
});

watch(route, (newVal, oldVal) => {
  if (newVal.params.categoryId !== oldVal.params.categoryId)
    pageNumber.value = 1;
});

const pageHandler = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped></style>
