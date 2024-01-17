<template>
  <article class="renewed-championship bg-color-old d-flex align-items-center justify-content-between">
    <CommonTextDesc :title="data.title" :description="data.description" class="mb-32" />
    <img :src="data.image" :alt="data.title" class="renewed-championship__img" />
  </article>
</template>

<script>
export default {
  name: 'RenewedChampionship',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.renewed-championship {
  padding-left: rem(300);
  padding-right: rem(300);

  @include media-breakpoint-up(md) {
    height: 100vh;
  }

  @include media-breakpoint-down(md) {
    padding: rem(100) 0;
    flex-direction: column;
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
