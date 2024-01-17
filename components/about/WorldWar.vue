<template>
  <article class="world-war vw-100 bg-color-gray-scale-50 d-flex align-items-center justify-content-center">
    <div class="world-war__text-desc">
      <span class="gallery__text d-block line-height-1-3 font-semi-bold font-color-label-white">{{ data.title }}</span>
      <span class="gallery__desc d-block font-semi-bold font-size-16 line-height-1-5 font-color-label-secondary mt-20"> {{ data.description }}</span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'WorldWar',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.world-war {
  width: 100vw;

  .gallery__text {
    font-size: clamp(#{rem(40)}, #{vw(76)} + 1px, #{rem(76)});
  }

  &__text-desc {
    width: rem(750);
  }

  @include media-breakpoint-up(md) {
    height: 100vh;
  }

  @include media-breakpoint-down(md) {
    padding: rem(100) rem(24);
  }
}
</style>
