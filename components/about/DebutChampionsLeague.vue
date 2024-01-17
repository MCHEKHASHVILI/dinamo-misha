<template>
  <article class="debut-champions-league d-flex align-items-center justify-content-between bg-color-gray-scale-500">
    <CommonTextDesc :title="data.title" :description="data.description" />
    <div class="after-world-war__images">
      <div v-for="(item, index) in data.gallery" :key="index + '-champions-league'" class="debut-champions-league__image-container">
        <img :src="item" alt="" class="w-100 h-100 object-fit-cover" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'DebutChampionsLeague',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.debut-champions-league {
  padding: rem(200) rem(300);

  @include media-breakpoint-down(md) {
    padding: rem(100) 0;
    flex-direction: column;
  }

  &__images {
    margin-left: rem(200);
    display: grid;
    width: rem(700);
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
