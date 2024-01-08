<template>
  <div class="fixed bottom-20 max-sm:right-5 sm:hidden z-50">
    <v-btn
      :prepend-icon="isShown ? 'mdi-message-plus-outline' : undefined"
      :icon="isShown ? false : 'mdi-message-plus-outline'"
      :text="isShown ? 'اشتراک تجربه' : undefined"
      color="primary"
      size="large"
      :rounded="isShown ? 'xl' : undefined"
      class="duration-300 rounded-full"
    >
    </v-btn>
  </div>
</template>

<script setup>
const { isShown } = useShowMobileMenu();
</script>

<style scoped></style>
