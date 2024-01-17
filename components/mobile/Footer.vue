<template>
  <footer class="h-[60vh]">
    <v-expansion-panels
      variant="accordion"
      tag="div"
      class="border-t flex flex-col border-gray-400"
    >
      <v-expansion-panel
        v-for="list in footerLinks"
        :key="list.id"
        elevation="0"
      >
        <v-expansion-panel-title>
          {{ list.name }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="flex flex-col text-sm"
          v-for="link in list.links"
          :key="link"
        >
          <nuxt-link to="/">
            {{ link }}
          </nuxt-link>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <p class="w-full flex items-center justify-between px-5 mt-10">
      <span>تلفن پشتیبانی</span>
      <span style="direction: ltr">021 - 43900000</span>
    </p>
    <div class="flex flex-col items-center mt-10">
      <h1 class="text-sm">در شبکه های اجتماعی:</h1>
      <div class="flex items-center gap-2 text-lg text-gray-600">
        <v-icon icon="mdi-linkedin" />
        <v-icon icon="mdi-instagram" />
        <v-icon icon="mdi-youtube" />
        <v-icon icon="mdi-twitter" />
        <v-icon icon="mdi-telegram" />
      </div>
    </div>
    <div class="flex flex-col gap-5 items-center mt-10">
      <nuxt-img
        src="https://cdn.alibaba.ir/h2/mobile/assets/images/shawl_logotype-d6b14ca0.svg"
        class="h-5"
      />
      <p class="text-[0.5rem] text-gray-600">
        کلیه حقوق محفوظ و متعلق به آژانس هواپیمایی و جهانگردی علی‌بابا می‌باشد.
        (نسخه 2.73.5)
      </p>
    </div>
  </footer>
</template>

<script setup>
import footerLinks from "~/data/footer";
</script>

<style lang="scss" scoped></style>
