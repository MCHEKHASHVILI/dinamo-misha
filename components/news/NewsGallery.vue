<template>
  <div class="news-gallery d-flex flex-wrap position-sticky">
    <div v-for="(source, index) in images.slice(0, 4)" :key="index" class="news-gallery__image position-relative" :class="[{ 'news-gallery__image--has-more': imagesLength > 4 && index === 3 }, { 'news-gallery__image--is-single': imagesLength === 1 }]" @click="openFullGallery(index)">
      <img :src="source" alt="" class="w-100 h-100 object-fit-cover" />
      <span v-if="imagesLength > 4 && index === 3" class="news-gallery__more position-absolute position-center font-semi-bold font-color-label-white font-size-28">+{{ imagesLength - 4 }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsGallery',
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imagesLength() {
      return this.images.length;
    },
  },
  methods: {
    openFullGallery(index) {
      if (this.imagesLength > 4 && index === 3) {
        this.$emit('openFullGallery');
      }
    },
  },
};
</script>

<style lang="scss">
.news-gallery {
  top: 0;
  height: 100vh;
  width: 42%;
  justify-content: space-between;
  align-content: space-between;

  @include media-breakpoint-down(md) {
    width: 100%;
    height: 86.89vw;
    position: relative !important;
    z-index: 0;
  }

  &__image {
    &--is-single {
      height: 100% !important;
    }
    &:nth-last-child(1):first-child {
      object-fit: cover;
      width: 100%;

      @include media-breakpoint-down(md) {
        width: 100%;
        height: 100%;
      }
    }

    &:nth-last-child(2):first-child,
    &:nth-last-child(2):first-child ~ .news-gallery__image {
      width: 100%;
      height: calc(50% - 2px);
      object-fit: cover;

      @include media-breakpoint-down(md) {
        height: calc(50% - 2px);
      }
    }

    &:nth-last-child(3):first-child,
    &:nth-last-child(3):first-child ~ .news-gallery__image {
      width: 100%;
      height: calc(33.33% - 3px);
      object-fit: cover;

      @include media-breakpoint-down(md) {
        height: calc(33.33% - 2px);
      }
    }

    &:nth-last-child(4):first-child,
    &:nth-last-child(4):first-child ~ .news-gallery__image:nth-child(2) {
      width: 100%;
      height: calc(33.33% - 3px);
      object-fit: cover;

      @include media-breakpoint-down(md) {
        width: calc(50% - 1px);
        height: calc(50% - 1px);
      }
    }

    &:nth-last-child(4):first-child ~ .news-gallery__image:nth-child(3),
    &:nth-last-child(4):first-child ~ .news-gallery__image:nth-child(4) {
      width: calc(50% - 2px);
      height: calc(33.33% - 3px);
      object-fit: cover;
      position: relative;

      @include media-breakpoint-down(md) {
        width: calc(50% - 1px);
        height: calc(50% - 1px);
      }
    }

    &--has-more {
      cursor: pointer;
      &::after {
        @include abs-position(0, 0, auto auto);

        content: '';
        width: 100%;
        height: 100%;
        background: rgba($gray-scale-50, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  &__more {
    z-index: 1;
  }
}
</style>
