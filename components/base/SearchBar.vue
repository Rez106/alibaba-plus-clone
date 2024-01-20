<template>
  <div class="relative" @click="showResult = false">
    <div class="flex items-center justify-center gap-5">
      <v-text-field
        variant="outlined"
        label="شهرها، جاهای دیدنی، رستوران‌ها، موزه‌ها، بازارها و..."
        hide-details
        class="max-w-[85%]"
        clearable
        rounded="lg"
        density="comfortable"
        color="#262626"
        @input="inputHandler"
      />
      <v-btn
        v-if="!header"
        text="جستجو"
        color="warning"
        size="large"
        rounded="lg"
        elevation="0"
      />
    </div>
    <div
      v-if="showResult"
      class="scroll-fix absolute top-full w-[85%] overflow-y-auto max-h-[30vh] text-sm bg-white z-50 rounded-md shadow-md shadow-slate-300"
      :class="{ 'right-0': !header, 'right-[54px]': header }"
    >
      <p v-if="!isCityFound && !isPoisFound" class="text-center mt-10">
        موردی یافت نشد!
      </p>
      <v-list v-if="result.pois" class="p-4">
        <v-list-item
          v-for="item in result.pois"
          :key="item.name"
          :title="item.name"
          :subtitle="item.province.name + ', ' + item.city.name"
          :prepend-avatar="item.gallery[0].large_url"
          :to="'/plus/p-' + item.short_id"
          rounded="lg"
        ></v-list-item>
      </v-list>
      <v-divider />
      <v-list v-if="isCityFound" class="p-4">
        <v-list-item
          v-for="item in result.city"
          :key="item.name"
          :title="item.name"
          :subtitle="item.province.name"
          rounded="lg"
          prepend-icon="mdi-map-marker-outline"
          :to="'/plus/search/city-' + item.id + '/category-all'"
        ></v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup>
defineProps({
  header: Boolean,
});

const showResult = ref(false);
const searchInput = ref("");
const result = ref({
  city: [],
  pois: [],
});

const isCityFound = computed(() => result.value.city.length > 0);
const isPoisFound = computed(() => result.value.pois.length > 0);

const searchHandler = async () => {
  showResult.value = true;

  const { data, error } = await useFetch(
    `https://ws.alibaba.ir/api/v1/plus/user/search?name=${searchInput.value}&page_size=4`
  );

  if (await data.value.result.items) {
    result.value.city = [...(await data.value.result.items.cities)];
    result.value.pois = [...(await data.value.result.items.pois)];
    return;
  } else {
    result.value = {
      city: [],
      pois: [],
    };
    return;
  }
};

const inputHandler = async (e) => {
  searchInput.value = e.target.value.trim();
  if (searchInput.value === "") {
    result.value = {
      city: [],
      pois: [],
    };
    showResult.value = false;
    return;
  }

  setTimeout(async () => {
    await searchHandler();
  }, 500);
};
</script>

<style scoped>
.scroll-fix::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}

.scroll-fix::-webkit-scrollbar {
  width: 4px;
  background-color: #fff;
}

.scroll-fix::-webkit-scrollbar-thumb {
  background-color: #adadad;
}
</style>
