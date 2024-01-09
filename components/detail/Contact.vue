<template>
  <div class="w-full px-4 mt-10">
    <h1 class="font-bold text-xl">اطلاعات تماس</h1>

    <ul class="w-fit flex flex-col gap-3 mt-5 text-sm">
      <li
        class="flex items-center gap-5"
        :class="{ 'justify-between': contactDetail.phone }"
      >
        <span class="text-gray-500">شماره تلفن </span>
        <span>{{ contactDetail.phone ? contactDetail.phone : "_" }}</span>
      </li>
      <li
        class="flex items-center gap-5"
        :class="{ 'justify-between': contactDetail.website }"
      >
        <span class="text-gray-500">وب سایت </span>
        <span>{{ contactDetail.website ? contactDetail.website : "_" }}</span>
      </li>
      <li
        class="flex items-center gap-5"
        :class="{ 'justify-between': contactDetail.email }"
      >
        <span class="text-gray-500">ایمیل </span>
        <span>{{ contactDetail.email ? contactDetail.email : "_" }}</span>
      </li>
      <li
        class="flex items-center gap-5"
        :class="{ 'justify-between': contactDetail.address }"
      >
        <span class="text-gray-500">آدرس </span>
        <span>{{ contactDetail.address ? contactDetail.address : "_" }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  contactDetail: Object,
});
</script>

<style lang="scss" scoped></style>
