<template>
  <base-modal />
  <div class="w-dvw min-h-dvh bg-[#f6f6f6]">
    <slot />
  </div>
</template>

<style>
@font-face {
  font-family: "alibaba";
  src: url("@/assets/fonts/Alibaba-Regular.ttf") format("truetype");
}

*,
*::after,
*::before,
html {
  font-family: "alibaba";
  direction: rtl;
  scroll-behavior: smooth;
  letter-spacing: 0;
}
</style>
