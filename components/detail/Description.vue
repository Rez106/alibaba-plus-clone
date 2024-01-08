<template>
  <div class="mt-5">
    <div
      class="relative overflow-hidden"
      :class="{ 'detail-content': !maxWidthContent }"
    >
      <p
        class="text-justify break-words text-sm duration-300"
        :class="{
          'h-[120px]': !maxWidthContent,
          'h-[500px]': maxWidthContent,
        }"
      >
        {{ content }}
      </p>
    </div>
    <div
      class="w-full flex justify-center"
      :class="{ 'relative -top-12': !maxWidthContent }"
    >
      <v-btn
        class="w-fit"
        :appendIcon="maxWidthContent ? 'mdi-menu-up' : 'mdi-menu-down'"
        :text="maxWidthContent ? 'کمتر' : 'بیشتر'"
        flat
        variant="text"
        color="blue"
        rounded
        @click="maxWidthContent = !maxWidthContent"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: String,
});
const maxWidthContent = ref(false);
</script>

<style scoped>
.detail-content::after {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  content: "";
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, white 51.04%);
  pointer-events: none;
}
</style>
