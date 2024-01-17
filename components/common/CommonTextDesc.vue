<template>
  <div class="text-desc px-12 px-md-0">
    <span :class="`text-desc__title d-block line-height-1-3 font-semi-bold font-color-label-primary`">{{ title }}</span>
    <span class="text-desc__desc d-block font-semi-bold font-size-16 line-height-1-5 font-color-label-secondary mt-6 mt-md-20">{{ description }}</span>
  </div>
</template>

<script>
export default {
  name: 'CommonTextDesc',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.text-desc {
  @include media-breakpoint-up(md) {
    width: rem(550);
  }

  &__title {
    font-size: clamp(#{rem(40)}, #{vw(76)} + 1px, #{rem(76)});
  }
}
</style>
