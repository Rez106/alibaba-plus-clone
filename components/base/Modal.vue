<template>
  <v-dialog
    v-model="modal.show"
    :width="mdAndUp ? 800 : undefined"
    :fullscreen="!mdAndUp"
    transition="slide-x-reverse-transition"
    close-on-back
    scrollable
  >
    <div
      class="relative w-full max-md:min-h-dvh bg-white p-4 overflow-hidden rounded-lg"
    >
      <div class="flex items-center gap-3 md:max-w-[50%] md:mx-auto">
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
          rounded
          @input="inputHandler"
        />
      </div>
      <div class="">
        <p
          v-if="modal.data.items === null || !modal.data.items?.pois"
          class="text-center mt-10"
        >
          موردی یافت نشد!
        </p>
        <v-list
          v-if="!modal.search && modal.data.items"
          class="overflow-y-scroll"
        >
          <v-list-item
            v-for="item in modal.data.items"
            :key="item.id"
            :title="modal.data.prefix + ' ' + item.name"
            :prepend-avatar="modal.data.icon"
          ></v-list-item>
        </v-list>
        <v-list v-if="modal.search && modal.data.items">
          <v-list-item
            v-for="item in modal.data.items.pois"
            :key="item.name"
            :title="modal.data.prefix + ' ' + item.name"
            :prepend-avatar="item.gallery[0].large_url"
          ></v-list-item>
        </v-list>
        <v-divider />
        <v-list v-if="modal.search && modal.data.items">
          <v-list-item
            v-for="item in modal.data.items.city"
            :key="item.name"
            :title="modal.data.prefix + ' ' + item.name"
            :subtitle="item.province.name"
            prepend-icon="mdi-map-marker-outline"
          ></v-list-item>
        </v-list>
        <v-divider />
        <v-list v-if="modal.search && modal.data.items">
          <v-list-item
            v-for="item in modal.data.items.categories"
            :key="item.name"
            :title="modal.data.prefix + ' ' + item.name"
            :prepend-avatar="item.icon.png_url"
          ></v-list-item>
        </v-list>
      </div>
      <div class="absolute bottom-5 left-5">
        <v-btn icon="mdi-close" color="red" @click="closeModal" />
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
    categories: [],
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
      categories: [...(await data.value.result.items.cities_categories)],
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
