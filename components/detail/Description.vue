<template>
  <div class="mt-5 2xl:min-w-[50%]">
    <div
      class="relative overflow-hidden"
      :class="{ 'detail-content': !maxWidthContent }"
    >
      <p
        class="text-justify break-words text-sm duration-300"
        :class="{
          'h-[120px] 2xl:h-[220px]': !maxWidthContent,
          'h-[500px] 2xl:h-[340px]': maxWidthContent,
        }"
      >
        {{ content }}
      </p>
    </div>
    <div
      v-if="content.length > 10"
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
const { content } = defineProps({
  content: String,
});
console.log(content);
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
