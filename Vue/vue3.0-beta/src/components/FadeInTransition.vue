<template functional>
  <transition name="fade" :appear="appear" :mode="mode">
    <slot />
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: "FadeInTransition",
  functional: true,
  props: {
    appear: {
      type: Boolean
    },
    mode: {
      type: String,
      default: "out-in"
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>