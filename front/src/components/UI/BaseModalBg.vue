<template>
  <transition
    enter-active-class="modal-bg--active"
    enter-from-class="modal-bg--from"
    enter-to-class="modal-bg--to"
    leave-active-class="modal-bg--active"
    leave-from-class="modal-bg--to"
    leave-to-class="modal-bg--from"
  >
    <div v-if="isOpen" class="modal-bg">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        document.body.classList.add("scroll-off");
      } else {
        document.body.classList.remove("scroll-off");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  &--to {
    background-color: rgba(0, 0, 0, 0.7);
  }
  &--from {
    background-color: rgba(0, 0, 0, 0);
  }
  &--active {
    transition: background-color 0.3s ease-in-out;
  }
}
</style>
