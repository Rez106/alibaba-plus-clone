<template>
  <base-modal />
  <div class="w-dvw min-h-dvh bg-white scroll-fix">
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

html::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}

html::-webkit-scrollbar {
  width: 4px;
  background-color: #fff;
}

html::-webkit-scrollbar-thumb {
  background-color: #adadad;
}
</style>
