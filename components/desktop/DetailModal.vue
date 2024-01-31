<template>
  <v-dialog v-model="modal" :close-on-content-click="false">
    <div
      class="w-full max-w-[900px] max-h-[800px] mx-auto bg-white p-5 rounded-lg"
    >
      <div class="w-full flex justify-end">
        <v-btn
          icon="mdi-close"
          rounded="xl"
          @click="closeModal"
          variant="outlined"
          color="#262626"
          size="small"
        />
      </div>
      <div class="w-full mt-5">
        <swiper
          class="mb-5"
          :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
          :style="{
            '--swiper-navigation-color': '#fff',
          }"
          :thumbs="{ swiper: thumbsSwiper }"
          :navigation="true"
          :spaceBetween="10"
          :slides-per-view="1"
        >
          <swiper-slide v-for="(img, index) in images" :key="index">
            <v-img
              :src="img.large_url"
              lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
              height="400"
              class="w-full rounded-lg"
              cover
              eager
            />
          </swiper-slide>
        </swiper>
        <swiper
          @swiper="setThumbsSwiper"
          :spaceBetween="10"
          :slidesPerView="4"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="[SwiperFreeMode, SwiperNavigation, SwiperThumbs]"
        >
          <swiper-slide v-for="(img, index) in images" :key="index">
            <v-img
              :src="img.large_url"
              lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
              height="120"
              class="rounded-lg"
              cover
              eager
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
const { images } = defineProps({
  images: Array,
});

const thumbsSwiper = ref(null);

const { modal, closeModal } = useGalleryModal();

const cover = ref({});
cover.value = images.find((img) => img.is_cover) || images[0];

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>

<style scoped>
.swiper-slide {
  @apply border-2 border-white rounded-lg;
}
.swiper-slide-thumb-active {
  @apply border-orange-400;
}
</style>
