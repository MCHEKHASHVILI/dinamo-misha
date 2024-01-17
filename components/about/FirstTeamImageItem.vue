<template>
  <div class="first-step-image-item">
    <img class="first-step-image-item__img object-fit-cover" :src="data.image" alt="" />
    <div class="font-semi-bold font-size-14 line-height-1-4 font-color-label-secondary mt-6">{{ data.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'FirstTeamImageItem',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.first-step-image-item {
  @include media-breakpoint-up(md) {
    margin-bottom: rem(150);
  }

  @include media-breakpoint-down(md) {
    width: 60vw;
  }

  &:nth-of-type(even) {
    @include media-breakpoint-up(md) {
      transform: translateY(#{rem(100)});
    }
  }
  &__img {
    width: 100%;
    height: rem(550);

    @include media-breakpoint-down(md) {
      height: 100vw;
    }
  }
}
</style>
