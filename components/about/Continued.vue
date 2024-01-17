<template>
  <article class="continued bg-color-gray-scale-500 d-flex align-items-center justify-content-between">
    <CommonTextDesc :title="data.title" :description="data.description" />
  </article>
</template>

<script>
export default {
  name: 'Continued',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.continued {
  padding-left: rem(100);
  padding-right: rem(350);

  @include media-breakpoint-up(md) {
    height: 100%;
  }

  @include media-breakpoint-down(md) {
    padding: rem(40) 0 rem(300);
  }
}
</style>
