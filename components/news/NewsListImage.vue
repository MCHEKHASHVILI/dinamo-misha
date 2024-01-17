<template>
  <article class="news-list-image border-radius-xl overflow-hidden">
    <div class="news-list-image__content d-flex justify-content-between position-relative" :class="reverse ? 'reverse' : ''">
      <div class="news-list-image__container overflow-hidden position-relative">
        <div class="news-list-image__mask">
          <img :src="data.list_cover_image" alt="" class="news-list-image__img news-list-item__img h-100 flex-1 object-fit-cover" data-scroll data-scroll-speed="-1.2" />
        </div>
      </div>
      <div class="news-list-image__header d-flex flex-column justify-content-between flex-1">
        <h3 class="font-regular font-size-24 font-size-18-md w-100 white-space-normal font-color-label-primary line-height-1-3">{{ data.title }}</h3>
        <div class="font-regular font-size-14 font-color-label-secondary d-flex">
          <div class="news-list-image__post-time">{{ dateFormat(data.date) }}</div>
          <div class="news-list-image__read-time ml-18">{{ data.reading_time }} {{ $t('news.min_to_read') }}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'NewsListImage',
  props: {
    data: {
      type: Object,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    dateFormat(date) {
      return this.$moment(date).format('DD MMMM YYYY');
    },
  },
};
</script>

<style lang="scss">
.news-list-image {
  width: rem(420);
  height: rem(520);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  border: 1px solid $gray-scale-400;
  margin: 0 rem(24);
  display: grid;
  // grid-template-columns: 8rem 21vmax;
  // grid-template-rows: 8rem 28vmax 1rem;

  @include media-breakpoint-down(md) {
    display: block;
    width: 100%;
    margin: 0 !important;
    height: auto;
  }

  &__content {
    flex-direction: column;

    &.reverse {
      @include media-breakpoint-up(md) {
        flex-direction: column-reverse;
      }
    }

    //@include media-breakpoint-down(md) {
    //  flex-direction: column-reverse;
    //}
  }

  &__header {
    height: rem(200);
    padding: rem(32) rem(32) rem(48);

    @include media-breakpoint-down(md) {
      flex: none !important;
      padding: rem(24) rem(24) rem(32);
      height: rem(170);
    }

    h3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &.label-white {
        color: $label-white;
      }

      @include media-breakpoint-down(md) {
        font-weight: 700;
      }
    }
  }

  &__container {
    height: rem(264);
    width: 100%;

    @include media-breakpoint-down(md) {
      height: rem(193);
    }
  }

  &__mask {
    grid-area: gallery-image;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    will-change: transform;
  }

  &__img {
    background-size: cover;
    background-position: 50% 0;
    width: calc(100% + 10vw);
    margin-left: -5vw;
    height: 100%;
    will-change: transform;
  }

  &__read-time {
    position: relative;

    &::after {
      @include abs-position(50%, auto, auto, rem(-18));
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: $label-secondary;
    }

    @include media-breakpoint-down(md) {
      font-weight: 700;
    }
  }

  &__post-time {
    @include media-breakpoint-down(md) {
      font-weight: 700;
    }
  }
}
</style>
