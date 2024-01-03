<template>
  <nuxt-link
    class="flex flex-col items-center text-sm max-sm:text-xs"
    :to="item.link"
  >
    <div>
      <svg
        :viewBox="item.id === 2 ? '0 0 19 19' : '0 0 24 24'"
        width="24px"
        height="24px"
        fill="currentColor"
        ref="iconHolder"
      ></svg>
    </div>
    <span>
      {{ item.name }}
    </span>
  </nuxt-link>
</template>

<script setup>
const { item } = defineProps({
  item: Object,
});

const iconHolder = ref();

onMounted(() => {
  iconHolder.value.innerHTML = item.icon;
});
</script>

<style scoped>
.router-link-exact-active {
  @apply text-blue-500;
}
</style>
