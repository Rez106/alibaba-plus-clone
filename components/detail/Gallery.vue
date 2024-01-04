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
        <nuxt-img
          :src="item.large_url"
          placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpkqLw-cqukI0a4Ertb21nkCwlR1yzar4_6A&usqp=CAU"
          :quality="30"
          :loading="'lazy'"
          width="50"
          height="50"
          class="object-cover min-h-[200px] max-h-[200px] w-full"
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
