<template>
  <v-dialog
    v-model="modal.show"
    :width="mdAndUp ? 800 : undefined"
    :fullscreen="!mdAndUp"
    :max-height="mdAndUp ? 500 : undefined"
    transition="slide-x-reverse-transition"
    close-on-back
    close-on-content-click
    scrollable
  >
    <div
      class="relative w-full max-md:min-h-dvh bg-white overflow-y-auto rounded-lg z-[99999]"
    >
      <div v-if="modal.search" class="border-b border-gray-700 py-2">
        <v-btn
          prepend-icon="mdi-arrow-right"
          flat
          variant="text"
          ripple="false"
          size="large"
          elevation="0"
          @click="closeModal"
        >
          شهرها، جاهای دیدنی و...
        </v-btn>
      </div>
      <div class="flex items-center gap-3 md:max-w-[50%] md:mx-auto p-4">
        <v-text-field
          :disabled="!modal.search"
          variant="outlined"
          :label="
            !modal.data.label
              ? 'لطفا از لیست زیر انتخاب کنید'
              : modal.data.label
          "
          append-inner-icon="mdi-magnify"
          hide-details
          class="rounded-md"
          autofocus
          clearable
          rounded="lg"
          :density="mdAndUp ? 'default' : 'compact'"
          @input="inputHandler"
        />
      </div>
      <div class="p-4">
        <p
          v-if="modal.data.items === null && !modal.data.items?.pois"
          class="text-center mt-10"
        >
          موردی یافت نشد!
        </p>
        <v-list
          v-if="!modal.search && modal.data.items"
          class="overflow-y-scroll p-4"
        >
          <nuxt-link
            v-for="item in modal.data.items"
            :key="item.id"
            :to="
              '/plus/search/city-' +
              item.id +
              '/category-' +
              modal.data.prefix.id
            "
          >
            <v-list-item
              :title="modal.data.prefix.name + ' ' + item.name"
              :prepend-avatar="modal.data.icon"
            >
            </v-list-item>
          </nuxt-link>
        </v-list>
        <v-list v-if="modal.search && modal.data.items" class="p-4">
          <v-list-item
            v-for="item in modal.data.items.pois"
            :key="item.name"
            :title="item.name"
            :subtitle="item.province.name + ', ' + item.city.name"
            :prepend-avatar="item.gallery[0].large_url"
            :to="'/plus/p-' + item.short_id"
            rounded="lg"
          ></v-list-item>
        </v-list>
        <v-divider />
        <v-list v-if="modal.search && modal.data.items" class="p-4">
          <v-list-item
            v-for="item in modal.data.items.city"
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
  </v-dialog>
</template>

<script setup>
const { modal, closeModal } = useModal();
const { mdAndUp } = useDisplay();
const searchInput = ref("");

if (modal.value.search) {
  modal.value.data.items = {
    city: [],
    pois: [],
  };
} else {
  modal.value.data.items = null;
}

const searchHandler = async () => {
  const { data, error } = await useFetch(
    `https://ws.alibaba.ir/api/v1/plus/user/search?name=${searchInput.value}&page_size=4`
  );

  if (await data.value.result.items) {
    modal.value.data.items = {
      city: [...(await data.value.result.items.cities)],
      pois: [...(await data.value.result.items.pois)],
    };
  } else {
    modal.value.data.items = null;
    return;
  }
};

const inputHandler = async (e) => {
  searchInput.value = e.target.value.trim();

  if (searchInput.value === "") {
    modal.value.data.items = null;
    return;
  }

  setTimeout(async () => {
    await searchHandler();
  }, 500);
  // clearTimeout(searchTimeout);
};
</script>

<style lang="scss" scoped></style>
