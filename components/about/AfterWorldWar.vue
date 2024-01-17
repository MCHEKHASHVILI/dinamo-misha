<template>
  <article class="after-world-war d-flex align-items-center justify-content-between">
    <CommonTextDesc :title="data.title" :description="data.description" />
    <div class="after-world-war__images">
      <div v-for="(image, index) in data.images" :key="index + '-after-world-war-image'" class="after-world-war__image-container">
        <img :src="image" class="w-100 h-100 object-fit-cover" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'AfterWorldWar',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.after-world-war {
  padding: rem(200) rem(300);

  @include media-breakpoint-down(md) {
    padding: rem(100) 0;
    flex-direction: column;
  }

  &__images {
    margin-left: rem(150);
    width: rem(850);
    height: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr 1fr;
      margin-top: rem(48);
      gap: rem(16);
      width: auto;
      height: 80vw;
      margin-left: 0;
    }

    @include media-breakpoint-down(md) {
      padding: 0 rem(24);
    }
  }

  &__image-container {
    @include media-breakpoint-up(md) {
      &:nth-of-type(1) {
        transform: translateX(#{rem(-60)}) translateY(#{rem(-40)});
      }

      &:nth-of-type(2) {
        transform: translateX(#{rem(80)}) translateY(#{rem(-70)});
      }

      &:nth-of-type(3) {
        transform: translateX(#{rem(10)}) translateY(#{rem(50)});
      }

      &:nth-of-type(4) {
        transform: translateX(#{rem(120)}) translateY(#{rem(90)});
      }
    }
  }
}
</style>
