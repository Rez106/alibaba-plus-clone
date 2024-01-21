<template>
  <div class="2xl:min-w-[50%] 2xl:order-2">
    <v-list class="2xl:grid 2xl:grid-cols-2 2xl:gap-5">
      <v-list-item
        v-for="att in attributes.slice(0, 6)"
        :key="att.attribute.short_id"
      >
        <template v-slot:prepend>
          <v-avatar class="opacity-60" :image="att.attribute.icon.png_url" />
        </template>
        <v-list-item-title style="font-weight: bold">
          {{ att.attribute.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ att.description }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
defineProps({
  attributes: Array,
});
</script>

<style lang="scss" scoped></style>
