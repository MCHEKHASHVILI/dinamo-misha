<template>
  <article @click="isOpen = !isOpen">
    <div class="academy-question cursor-pointer border-radius-xl d-flex flex-column pl-12 pr-12 pt-10 pb-10 mb-10">
      <div class="d-flex justify-content-between align-content-center">
        <div class="white-space-normal font-size-16 line-height-1-3 flex-1 pr-6 font-semi-bold font-color-label-primary">{{ data.question }}</div>
        <SvgIcon name="classic-arrow" class="academy-question__icon svg-fill-label-primary" :class="{ open: isOpen }" />
      </div>
      <div class="academy-question__text-container" :style="`max-height: ${textHeight}`">
        <div ref="text" class="academy-question__text white-space-normal line-height-1-3 font-color-label-secondary font-size-14 font-regular pt-8">
          {{ data.answer }}
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'AcademyQuestion',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    textHeight() {
      return this.isOpen && this.$refs.text?.clientHeight ? this.$refs.text.clientHeight + 'px' : 0;
    },
  },
};
</script>

<style lang="scss">
.academy-question {
  width: rem(570);
  min-height: rem(60);
  border: 1px solid $gray-scale-300;
  cursor: pointer;

  @include media-breakpoint-down(md) {
    width: 100%;
    font-weight: 700;
  }

  &__icon {
    width: rem(10);
    height: rem(14);
    transform: rotate(90deg);
    transition: all 0.2s ease;
    &.open {
      transform: rotate(-90deg);
      fill: $accent-primary;
    }
  }

  &__text-container {
    overflow: hidden;
    transition: max-height 0.2s ease;
  }

  &__text {
    @include media-breakpoint-down(md) {
      color: $label-primary;
      font-weight: 700;
    }
  }
}
</style>
