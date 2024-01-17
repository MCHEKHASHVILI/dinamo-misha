<template>
  <div class="modal position-fixed">
    <div class="d-flex align-items-center justify-content-center w-100 h-100" @click.self="closeModal">
      <div class="close-button position-fixed" @click="closeModal">
        <SvgIcon name="close" class="close-icon" />
      </div>
      <div class="modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  beforeMount() {
    document.addEventListener('keydown', this.keyDownListener);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keyDownListener);
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    keyDownListener(e) {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    },
  },
};
</script>

<style lang="scss">
.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($gray-scale-50, 0.9);
  z-index: 2;
  overflow-y: auto;
  overflow-x: hidden;

  @include media-breakpoint-down(md) {
    overflow-y: visible;
    padding-top: $mobile-header-height !important;
  }

  &__content {
    @include media-breakpoint-down(md) {
      overflow-y: auto;
      height: 100%;
    }
  }

  .close-button {
    top: rem(24);
    right: rem(24);
    width: rem(32);
    height: rem(32);
    cursor: pointer;

    .close-icon {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
