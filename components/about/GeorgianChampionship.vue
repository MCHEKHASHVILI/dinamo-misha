<template>
  <article class="georgian-championship bg-color-gray-scale-500 d-flex align-items-center justify-content-between">
    <CommonTextDesc :title="data.title" :description="data.description" />
    <div class="georgian-championship__images d-flex px-12 px-md-0 mt-24 mt-md-0">
      <div v-for="(item, index) in data.gallery" :key="index + '-georgian-championship'" class="georgian-championship__image-container">
        <img :src="item.url" :alt="item.alt" class="georgian-championship__img object-fit-cover" />
        <div class="font-regular font-size-14 line-height-1-4 font-color-label-secondary mt-4">{{ item.title }}</div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'GeorgianChampionship',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.georgian-championship {
  @include media-breakpoint-up(md) {
    height: 100vh;
  }

  @include media-breakpoint-down(md) {
    flex-direction: column;
  }

  &__images {
    @include media-breakpoint-up(md) {
      margin-left: rem(160);
    }

    @include media-breakpoint-down(md) {
      flex-wrap: wrap;
    }
  }

  &__image-container {
    &:not(:last-child) {
      margin-bottom: rem(48);
    }
  }

  &__img {
    @include media-breakpoint-up(md) {
      width: rem(650);
      height: 66vh;
      &:first-child {
        margin-right: rem(130);
      }
    }

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }
}
</style>
