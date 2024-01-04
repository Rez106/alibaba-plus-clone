<template>
  <div
    class="relative lg:w-3/12 max-sm:w-full min-h-[calc(100dvh_+_500px)] lg:mx-auto bg-white"
  >
    <div class="w-full flex flex-col gap-3 overflow-x-hidden">
      <slot />
    </div>
    <mobile-footer />
  </div>
  <mobile-share-btn />
  <mobile-menu-list />
</template>
