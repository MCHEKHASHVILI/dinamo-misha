<template>
  <section class="academy-vertical-text-section">
    <img :src="data.image.url" :alt="data.title" class="academy-vertical-text-section__icon" />
    <h1 class="academy-vertical-text-section__title white-space-normal font-size-36 font-size-28-md font-semi-bold font-color-label-primary line-height-1-6 mb-14 mt-8">{{ data.title }}</h1>
    <div class="academy-vertical-text-section__text white-space-normal font-size-15 font-size-14-md line-height-1-6 font-semi-bold font-color-label-primary mb-24">
      {{ data.description }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'TextSection',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.academy-vertical-text-section {
  width: rem(400);

  @include media-breakpoint-down(md) {
    display: inline-block;
    width: 100%;
    padding: 0 rem(24);
    margin-bottom: rem(112);
  }

  &__text {
    @include media-breakpoint-down(md) {
      font-weight: 700;
    }
  }

  &__icon {
    max-width: rem(70);
    max-height: rem(70);

    @include media-breakpoint-down(md) {
      width: rem(42);
    }
  }
}
</style>
