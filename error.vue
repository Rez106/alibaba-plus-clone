<template>
  <nuxt-layout :name="mobile ? 'mobile' : 'desktop'">
    <nuxt-layout :name="mobile ? 'detail' : 'desktop-container'">
      <div
        class="max-md:w-full md:w-8/12 mx-auto min-h-[70vh] flex flex-col items-center justify-center py-10"
      >
        <v-img
          :src="
            error.statusCode === 404
              ? 'https://cdn.alibaba.ir/h2/desktop/assets/images/error/404-alibaba-a830dd70.png'
              : 'https://sorry.alibaba.ir/statics/images/sorry.png'
          "
          alt="404"
          width="300"
          max-height="400"
          eager
        />
        <div class="text-center">
          <h1 class="text-xl font-bold 2xl:text-2xl mb-5">
            {{ error.statusCode }}
          </h1>
          <p class="text-lg font-bold 2xl:text-2xl mb-5">{{ error.message }}</p>
          <p class="text-xl">
            صفحه مورد نظر در دسترس نمی‌باشد متاسفانه خطایی هنگام انتقال درخواست
            شما رخ داده است برای پیدا کردن مسیر درست میتوانید سری به
            <button class="text-blue-600 hover:underline" @click="errorHandler">
              صفحه اول علی‌بابا
            </button>
            بزنید
          </p>
        </div>
      </div>
    </nuxt-layout>
  </nuxt-layout>
</template>

<script setup>
// https://sorry.alibaba.ir/statics/images/sorry.png
// https://cdn.alibaba.ir/h2/desktop/assets/images/error/404-alibaba-a830dd70.png
//"صفحه مورد نظر در دسترس نمی‌باشد متاسفانه خطایی هنگام انتقال درخواست شما رخ داده است برای پیدا کردن مسیر درست میتوانید سری به صفحه اول علی‌بابا بزنید";

const error = useError();

const { width } = useWindowSize();

const mobile = computed(() => {
  return width.value < 600;
});

const errorHandler = () => {
  clearError({
    redirect: "/plus",
  });
};
</script>

<style lang="scss" scoped></style>
