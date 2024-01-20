<template>
  <desktop-navbar @changeMenu="activeMenu" :status="showMenu" />
  <header
    class="min-w-full sticky left-0 border-b border-gray-500 z-50 py-3 mb-10 bg-white shadow-md duration-500"
    :class="{ 'top-0': isShown, '-top-1/2': !isShown }"
  >
    <div
      class="max-lg:w-9/12 xl:max-w-[1200px] mx-auto flex items-center justify-between"
    >
      <div class="flex items-center gap-3">
        <v-btn
          icon="mdi-menu"
          elevation="0"
          size="large"
          @click="() => (showMenu = true)"
        />
        <v-divider vertical inset class="border-opacity-100" />
        <div class="w-fit mx-auto flex flex-col items-end">
          <nuxt-img
            src="https://cdn.alibaba.ir/h2/mobile/assets/images/alibaba-plus-29830c54.svg"
            class="h-8"
          />
          <span class="relative -top-4 text-xs">جمع تجربه‌های سفر</span>
        </div>
      </div>
      <div class="grow" v-if="!!route.params.id">
        <base-search-bar :header="true" />
      </div>
      <div class="flex items-center gap-3">
        <v-btn text="اشتراک تجربه" rounded="lg" color="primary" elevation="0" />
        <v-btn
          prepend-icon="mdi-account-outline"
          text="ورود یا ثبت‌نام"
          variant="text"
          rounded="lg"
          elevation="0"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();
const showMenu = ref(false);
const { isShown } = useShowMenu();

const activeMenu = (state) => {
  showMenu.value = state;
};
</script>

<style lang="scss" scoped></style>
