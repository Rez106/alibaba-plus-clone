<template>
  <div
    class="border-t flex flex-col border-gray-400 text-sm mb-15 2xl:border 2xl:rounded-md 2xl:border-gray-200"
  >
    <v-expansion-panels variant="accordion" tag="div">
      <v-expansion-panel v-for="(q, index) in faq" :key="index" elevation="0">
        <v-expansion-panel-title>
          <v-icon
            icon="mdi-help-circle-outline"
            color="blue"
            size="x-large"
            class="-scale-x-[1]"
          />
          <span class="font-bold text-gray-800 leading-6 mr-2 text-sm">{{
            q.question
          }}</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <span v-if="!q.answer.includes('a')"> {{ q.answer }}</span>
          <span v-else v-html="answerText(q.answer)"></span>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import DOMPurify from "dompurify";

defineProps({
  faq: Array,
});

function answerText(text) {
  return DOMPurify.sanitize(text);
}
</script>

<style scoped></style>
