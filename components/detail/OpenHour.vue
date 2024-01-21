<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="flex items-center gap-5 mb-5">
        <h1 class="font-bold text-xl">ساعات کاری</h1>
        <v-chip
          prepend-icon="mdi-circle"
          size="small"
          :color="isVisible ? 'green' : 'red'"
        >
          {{ isVisible ? "باز" : "بسته" }}
        </v-chip>
      </div>
      <div
        class="flex flex-col gap-5 2xl:border 2xl:border-gray-500 2xl:rounded-md 2xl:p-5 2xl:w-full"
      >
        <div
          class="max-sm:w-full max-sm:mx-auto leading-6 text-xs border-[1.5px] bg-orange-300 bg-opacity-15 rounded-md border-orange-300 text-orange-800 p-4"
        >
          ممکن است ساعت کاری این مجموعه تحت‌تاثیر شرایط کرونا باشد. لطفا قبل از
          راه افتادن، تلفنی چک کنید.
        </div>
        <ul
          class="w-fit flex flex-col gap-3 2xl:grid 2xl:grid-cols-2 2xl:gap-x-10"
        >
          <li
            v-for="day in openHours"
            :key="day.day_of_week"
            class="flex items-center gap-5 justify-between"
          >
            <span class="text-sm text-gray-500">{{
              formatWeekday(day.day_of_week)
            }}</span>
            <span v-if="day.start.hour !== 0">
              {{ "از ساعت " + day.start.hour + " الی " + day.end.hour }}
            </span>
            <span v-else> 24 ساعت </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  openHours: Array,
  isVisible: Boolean,
});
</script>

<style lang="scss" scoped></style>
