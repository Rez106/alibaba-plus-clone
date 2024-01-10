<template>
  <div>
    <swiper
      :modules="[SwiperPagination]"
      :pagination="{
        clickable: true,
      }"
      space-between="20"
      :slides-per-view="1"
    >
      <swiper-slide v-for="(item, indx) in items" :key="indx">
        <v-img
          :src="item.large_url"
          lazy-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
          min-height="200"
          max-height="200"
          cover
          class="w-full"
          transition="fade-transition"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
});
</script>

<style lang="scss" scoped></style>
