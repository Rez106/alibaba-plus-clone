<template>
  <v-list>
    <v-list-item v-for="att in attributes" :key="att.attribute.short_id">
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
</template>

<script setup>
defineProps({
  attributes: Array,
});
</script>

<style lang="scss" scoped></style>
