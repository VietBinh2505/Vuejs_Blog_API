<template>
<div class="loading">
   <div class="aaa">
      <div class="ldio-8u8adtfaqo">
         <div></div>
         <div></div>
      </div>
   </div>
</div>
</template>

<script>
export default {
   name: "loading",
}
</script>

<style>
.loading {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   opacity: 0;
   visibility: hidden;
   bottom: 0;
   z-index: 100;
   transition: all 0.2s ease;
   background-color: rgba(255, 255, 255, 0.4);
}
.loading.show {
   opacity: 1;
   visibility: visible;
}
.loading .aaa {
   position: fixed;
   top: 32%;
   left: 38%;
   transform: translate(-50%, -50%) scale(0.4);
}
@keyframes ldio-8u8adtfaqo {
   0% {
      top: 203.52px;
      left: 203.52px;
      width: 0;
      height: 0;
      background-color: white;
      opacity: 0.5;
   }
   100% {
      top: 46.64px;
      left: 46.64px;
      width: 313.76px;
      height: 313.76px;
      opacity: 0;
   }
}
.ldio-8u8adtfaqo div {
   position: absolute;
   border-width: 8.48px;
   border-style: solid;
   opacity: 1;
   border-radius: 50%;
   animation: ldio-8u8adtfaqo 1.1627906976744184s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.ldio-8u8adtfaqo div:nth-child(1) {
   border-color: #e90c59
}
.ldio-8u8adtfaqo div:nth-child(2) {
   border-color: #46dff0;
   animation-delay: -0.5813953488372092s;
}
.ldio-8u8adtfaqo {
   width: 100%;
   height: 100%;
   position: relative;
   transform: translateZ(0) scale(1);
   backface-visibility: hidden;
   transform-origin: 0 0;
   /* see note above */
}
.ldio-8u8adtfaqo div {
   box-sizing: content-box;
}
</style>