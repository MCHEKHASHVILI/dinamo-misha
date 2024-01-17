<template>
  <div class="next-page position-fixed">
    <!--    <div class="next-page__overlay position-fixed position-full bg-color-label-primary" :class="{ active }"></div>-->
    <NuxtLink :to="localePath({ name: data.name })" class="next-page__content position-fixed text-decoration-none bg-color-label-white h-100 d-flex flex-column justify-content-center pl-24" :class="{ active }">
      <span class="font-regular font-color-label-secondary font-size-16 font-semi-bold text-capitalize">{{ $t('common.next') }}</span>
      <div class="font-semi-bold font-size mt-4 line-height-1-8 font-size-30 font-color-label-primary">{{ data.title }}</div>
      <div class="next-page__icon-container border-radius-50 d-flex align-items-center justify-content-center">
        <SvgIcon name="right-arrow" class="next-page__icon svg-fill-label-primary" />
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'NextPage',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('app', { scroll: (state) => state.scroll }),
    active() {
      const scroll = this.scroll;
      const xActive = scroll.x !== 0 && scroll.limit.x - 100 < scroll.x;
      const yActive = scroll.y !== 0 && scroll.limit.y - 100 < scroll.y;
      return xActive || yActive;
    },
  },
};
</script>

<style lang="scss">
.next-page {
  z-index: 1;

  @include media-breakpoint-down(sm) {
    padding: 0 !important;
  }

  &__overlay {
    z-index: 8;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;

    &.active {
      visibility: visible;
      opacity: 0.4;
    }
  }

  &__content {
    @include abs-position(0, 0, auto, auto);

    width: rem(280);
    border-bottom-left-radius: 32px;
    border-top-left-radius: 32px;
    z-index: 9;
    transform: translate(100%);
    transition: transform 0.6s ease;

    box-shadow: $horizontal-box-shadow;

    &.active {
      transform: translate(0, 0);
    }

    @include media-breakpoint-down(sm) {
      top: auto !important;
      bottom: 0;
      left: 0;
      width: 100% !important;
      height: rem(236) !important;
      border-bottom-left-radius: 0;
      border-top-left-radius: rem(32);
      border-top-right-radius: rem(32);
      transform: translate(0, 100%);
      padding: 0 rem(24) !important;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: space-between;
      align-items: center;

      span,
      span + div {
        width: 50%;
        text-align: left;
      }
    }
  }

  &__icon-container {
    margin-top: rem(130);
    width: rem(115);
    height: rem(115);
    border: 1px solid $gray-scale-300;

    @include media-breakpoint-down(sm) {
      margin-top: rem(82);
      margin-bottom: rem(20);
      width: rem(72);
      height: rem(72);
      transform: rotate(90deg);
    }
  }

  &__icon {
    width: rem(30);
    height: rem(24);

    @include media-breakpoint-down(sm) {
      transform: rotate(0deg);
    }
  }
}

.next-page-offset {
  @include media-breakpoint-up(md) {
    padding-right: rem(200);
  }

  @include media-breakpoint-down(md) {
    padding-right: 0;
    padding-bottom: rem(236);
  }
}
</style>
