<template>
  <article class="first-steps vw-100 d-md-flex align-items-center justify-content-between">
    <CommonTextDesc class="pt-8 pt-md-0" :title="data.title" :description="data.description" />
    <div class="first-steps__right-section pl-0 pl-md-48">
      <img :src="data.image" alt="" class="first-steps__img" />
      <div class="font-semi-bold font-size-14 line-height-1-4 font-color-label-secondary mt-4 px-12 px-md-0">{{ data.name }}</div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'FirstSteps',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.first-steps {
  @include media-breakpoint-down(md) {
    padding-bottom: rem(48);
    background-color: transparent;
  }

  &__right-section {
    @include media-breakpoint-up(md) {
      margin-right: vw(370);
    }
  }
  &__img {
    @include media-breakpoint-up(md) {
      max-width: rem(510);
      max-height: rem(680);
    }
    @include media-breakpoint-down(md) {
      width: 100%;
      margin-top: rem(48);
    }
  }
}
</style>
