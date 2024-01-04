<template>
  <header class="w-full flex items-center justify-between p-4 h-16">
    <div class="flex items-center min-h-full">
      <v-icon icon="mdi-arrow-right" size="default" @click="handler('back')" />
    </div>
    <nuxt-link to="/plus">
      <div class="flex flex-col items-end pt-4">
        <nuxt-img
          src="https://cdn.alibaba.ir/h2/mobile/assets/images/alibaba-plus-29830c54.svg"
          class="h-8"
        />
        <span class="relative -top-4 text-xs">جمع تجربه‌های سفر</span>
      </div>
    </nuxt-link>
    <div class="flex items-center min-h-full">
      <v-icon icon="mdi-magnify" size="default" @click="handler('search')" />
    </div>
  </header>
</template>

<script setup>
const { openModal } = useModal();
const router = useRouter();

const handler = (action) => {
  if (action === "search") {
    openModal({
      search: true,
      label: "شهرها، جاهای دیدنی و...",
      items: [],
      icon: "",
      prefix: "",
    });
  }
  if (action === "back") {
    router.back();
  }

  return;
};
</script>

<style lang="scss" scoped></style>
