<template>
  <article class="come-back bg-color-gray-scale-500 d-flex align-items-center justify-content-between">
    <CommonTextDesc :title="data.title" :description="data.description" />
    <img :src="data.image" :alt="data.title" class="come-back__img mt-24 mt-md-0" />
  </article>
</template>

<script>
export default {
  name: 'ComeBack',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.come-back {
  padding: 0 rem(300);

  @include media-breakpoint-up(md) {
    height: 100vh;
  }

  @include media-breakpoint-down(md) {
    flex-direction: column;
    padding: rem(100) 0;
  }

  &__img {
    @include media-breakpoint-up(md) {
      max-width: rem(1000);
      margin-left: rem(160);
    }
    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }
}
</style>
