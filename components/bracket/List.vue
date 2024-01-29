<template>
  <div
    class="px-4"
    :class="{
      'bg-yellow-400': isColored,
      'my-10': isColored,
      'py-3': isColored,
      'flex items-center justify-center gap-28': isColored,
      'flex max-sm:flex-col max-sm:items-start items-center justify-between gap-5':
        isCity,
    }"
  >
    <div
      v-if="isColored"
      class="flex xl:flex-col xl:items-start items-center gap-3 mb-5 sm:text-xl"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        class="max-sm:w-6 max-sm:h-6 sm:w-16 sm:h-16"
      >
        <path
          d="M9.002 1.63724C7.949 1.63724 7.092 2.49424 7.092 3.54724V4.43324H5.456V3.54724C5.45679 2.60694 5.83061 1.70536 6.49542 1.04037C7.16022 0.375376 8.06169 0.00130331 9.002 0.000244141C9.94231 0.00130331 10.8438 0.375376 11.5086 1.04037C12.1734 1.70536 12.5472 2.60694 12.548 3.54724V9.89024H10.912V3.54624C10.912 2.49324 10.055 1.63624 9.002 1.63624V1.63724ZM9.002 16.3672C10.055 16.3672 10.912 15.5102 10.912 14.4572V13.5712H12.548V14.4572C12.5472 15.3976 12.1734 16.2991 11.5086 16.9641C10.8438 17.6291 9.94231 18.0032 9.002 18.0042C8.06169 18.0032 7.16022 17.6291 6.49542 16.9641C5.83061 16.2991 5.45679 15.3976 5.456 14.4572V8.11624H7.092V14.4572C7.09253 14.9636 7.29393 15.4492 7.65201 15.8072C8.01009 16.1653 8.4956 16.3667 9.002 16.3672ZM13.571 5.45724H14.458C15.3981 5.4583 16.2995 5.83224 16.9642 6.49701C17.629 7.16179 18.0029 8.06311 18.004 9.00324C18.0029 9.94338 17.629 10.8447 16.9642 11.5095C16.2995 12.1743 15.3981 12.5482 14.458 12.5492H8.115V10.9132H14.458C15.51 10.9132 16.368 10.0562 16.368 9.00324C16.368 7.95024 15.51 7.09324 14.458 7.09324H13.571V5.45724ZM3.547 7.09324C2.494 7.09324 1.637 7.95024 1.637 9.00324L1.636 9.00224C1.63653 9.50865 1.83793 9.99415 2.19601 10.3522C2.55409 10.7103 3.0396 10.9117 3.546 10.9122H4.432V12.5492H3.546C2.60587 12.5482 1.70454 12.1743 1.03977 11.5095C0.374994 10.8447 0.00105871 9.94338 0 9.00324C0.00105916 8.06294 0.375132 7.16146 1.04012 6.49666C1.70511 5.83186 2.60669 5.45804 3.547 5.45724H9.889V7.09324H3.547Z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <div class="">
        <h1 class="font-semibold xl:text-2xl">{{ item.title }}</h1>
        <p class="text-sm xl:text-base">{{ item.description }}</p>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col mb-5 max-sm:w-full md:w-9/12 lg:w-[1200px] sm:mx-auto"
    >
      <h1 class="font-semibold xl:text-2xl">{{ item.title }}</h1>
    </div>
    <div v-if="isCity" class="mb-5 xl:min-w-[30%]">
      <div class="flex items-center xl:flex-col xl:items-start">
        <div class="" v-html="item.category.icon.svg"></div>
        <h1 class="font-bold md:text-xl">
          {{ item.category.name + " در " + cityName }}
        </h1>
      </div>

      <h4 class="text-xs md:text-lg text-gray-600 max-xl:mr-7">
        {{ item.phrase }}
      </h4>
      <v-btn
        append-icon="mdi-chevron-left"
        variant="text"
        to=""
        color="blue"
        class="max-sm:hidden"
      >
        مشاهده همه
      </v-btn>
    </div>
    <swiper
      v-if="!isCarousel"
      :modules="[SwiperNavigation]"
      :space-between="10"
      :breakpoints="{
        350: {
          slidesPerView: 2,
        },
        600: {
          slidesPerView: isColored || isCity ? 2 : 3,
        },
        1200: {
          slidesPerView: isColored || isCity ? 3 : 4,
        },
      }"
      :navigation="{
        nextEl: '.custom-next-button',
        prevEl: '.custom-prev-button',
      }"
      class="relative"
      :class="{
        'max-sm:w-full md:w-full 2xl:w-[1200px]': !isColored,
        'max-sm:w-full md:w-full 2xl:w-[800px] py-8 mx-0': isColored,
        'w-full 2xl:min-w-[70%]': isCity,
      }"
    >
      <swiper-slide
        v-if="!isCity"
        v-for="city in item?.pois"
        :key="city.id"
        class="rounded-md"
        :class="{ 'bg-white': isColored }"
      >
        <bracket-item
          :detail="city"
          :isColored="isColored"
          :isCarousel="isCarousel"
        />
      </swiper-slide>
      <swiper-slide
        v-else
        v-for="city in item?.promoted_pois"
        :key="city.short_id"
        class="rounded-md"
        :class="{ 'bg-white': isColored }"
      >
        <bracket-item
          :detail="city"
          :isColored="isColored"
          :isCarousel="isCarousel"
        />
      </swiper-slide>
      <button
        class="custom-prev-button absolute top-[40%] right-0 bg-white z-50 border p-2 border-gray-600 rounded-full cursor-pointer max-sm:hidden disabled:opacity-0"
      >
        <v-icon icon="mdi-chevron-right" size="x-large" />
      </button>
      <button
        class="custom-next-button absolute top-[40%] left-0 bg-white z-50 border p-2 border-gray-600 rounded-full cursor-pointer max-sm:hidden disabled:opacity-0"
      >
        <v-icon icon="mdi-chevron-left" size="x-large" />
      </button>
    </swiper>
    <swiper
      v-if="isDetail"
      :modules="[SwiperNavigation]"
      :space-between="20"
      :slides-per-view="2"
      :navigation="{
        nextEl: '.custom-next-button',
        prevEl: '.custom-prev-button',
      }"
      :breakpoints="{
        1200: {
          slidesPerView: 4,
        },
      }"
    >
      <swiper-slide
        v-for="city in item"
        :key="city.id"
        class="rounded-md"
        :class="{ 'bg-white': isColored }"
      >
        <bracket-item
          :detail="city"
          :isColored="isColored"
          :isCarousel="isCarousel"
        />
      </swiper-slide>
      <button
        class="custom-prev-button absolute top-[40%] right-0 bg-white z-50 border p-2 border-gray-600 rounded-full cursor-pointer max-sm:hidden disabled:opacity-0"
      >
        <v-icon icon="mdi-chevron-right" size="x-large" />
      </button>
      <button
        class="custom-next-button absolute top-[40%] left-0 bg-white z-50 border p-2 border-gray-600 rounded-full cursor-pointer max-sm:hidden disabled:opacity-0"
      >
        <v-icon icon="mdi-chevron-left" size="x-large" />
      </button>
    </swiper>
    <swiper
      v-if="isCarousel"
      :modules="[SwiperAutoplay, SwiperGrid]"
      :slides-per-view="4"
      :space-between="10"
      :loop="false"
      :autoplay="{
        pauseOnMouseEnter: true,
        delay: 1000,
        disableOnInteraction: false,
        stopOnLastSlide: false,
        waitForTransition: true,
      }"
      :breakpoints="{
        600: {
          slidesPerView: 7,
        },
      }"
      :grid="{
        rows: 3,
        fill: 'row',
      }"
      class="mt-5 mb-10"
    >
      <swiper-slide v-for="city in item.pois" :key="city.id">
        <bracket-item :detail="city" :isCarousel="isCarousel" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
const { item, isColored, isCarousel } = defineProps({
  item: Object,
  isColored: Boolean,
  isCarousel: Boolean,
  isDetail: Boolean,
  isCity: Boolean,
  cityName: String,
});
</script>

<style scoped></style>
