<template>
  <section class="academy-text-section">
    <h1 class="academy-text-section__title white-space-normal font-semi-bold font-color-label-primary line-height-1-3 mb-12">{{ title }}</h1>
    <div class="academy-text-section__text white-space-normal font-size-16 font-size-14-md line-height-1-5 font-semi-bold font-color-label-secondary mb-24">
      {{ text }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'TextSection',
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.academy-text-section {
  width: rem(400);

  &__title {
    font-size: clamp(#{rem(40)}, #{vw(76)} + 1px, #{rem(76)});
  }

  @include media-breakpoint-down(md) {
    width: 100%;
    padding: 0 rem(24);

    &__text {
      margin-bottom: rem(32) !important;
      color: $label-primary;
      font-weight: 700;
    }
  }

  .text-section-button {
    @include media-breakpoint-down(md) {
      margin-top: rem(8);
      margin-bottom: rem(24);
    }
  }
}
</style>
