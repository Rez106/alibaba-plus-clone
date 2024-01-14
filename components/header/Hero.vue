<template>
  <div
    class="w-11/12 max-sm:h-[40vh] sm:h-[60vh] mx-auto max-w-[1200px] rounded-xl bg-no-repeat bg-cover bg-center"
    :style="{
      backgroundImage: mobile
        ? `url(${data.mobile_cover})`
        : `url(${data.desktop_cover})`,
    }"
  >
    <div
      v-if="!mobile"
      class="w-full h-1/2 flex flex-col justify-start pt-10 text-center text-white rounded-b-xl"
    >
      <p>
        <span class="block font-bold text-5xl mb-2 drop-shadow-lg"
          >جمع تجربه‌های ناب سفر</span
        >
        <span class="text-2xl drop-shadow-lg">{{ data.name }}</span>
      </p>
    </div>
    <div v-if="mobile" class="h-full w-full flex flex-col justify-between">
      <div
        class="w-11/12 mx-auto bg-slate-50 py-2 px-2 rounded-xl border border-gray-300 text-slate-400 cursor-pointer mt-4"
        @click="searchModalHandler"
      >
        <v-icon icon="mdi-magnify" />
        <span>شهرها، جاهای دیدنی و...</span>
      </div>
      <div
        class="w-full h-1/2 flex flex-col justify-end pb-10 text-center text-white rounded-b-xl shadow-custom"
      >
        <p>
          <span class="block font-bold">جمع تجربه های ناب سفر</span>
          <span>{{ data.name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
});
const { mobile } = useDisplay();
const { openModal } = useModal();

const searchModalHandler = () => {
  openModal({
    search: true,
    label: "شهرها، جاهای دیدنی و...",
    items: [],
    icon: "",
    prefix: "",
  });
};
</script>

<style scoped>
.shadow-custom {
  box-shadow: inset 0 -90px 30px rgba(0, 0, 0, 0.7);
}
</style>
