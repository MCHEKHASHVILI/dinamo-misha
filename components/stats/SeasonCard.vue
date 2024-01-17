<template>
  <article class="season-card border-radius-xl overflow-hidden">
    <div class="season-card__content w-100 h-100 text-decoration-none bg-color-label-white d-flex flex-column justify-content-center" :class="disabled ? 'disabled' : ''" @click="action">
      <span class="font-regular font-color-label-secondary font-size-16 font-semi-bold text-capitalize">{{ !disabled ? season : $t('common.coming_soon') }}</span>
      <div class="font-semi-bold font-size mt-4 line-height-1-8 font-size-30 font-color-label-primary">{{ text }}</div>
      <SvgIcon name="classic-arrow" class="season-card__icon svg-fill-label-primary" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'SeasonCard',
  props: {
    season: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.season-card {
  width: rem(400);
  height: rem(500);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  border: 1px solid $gray-scale-400;
  margin: 0 rem(48) 0 0;
  position: relative;

  @include media-breakpoint-down(md) {
    width: 100%;
    height: auto;
    margin: 0;
  }

  &__icon {
    width: rem(32);
    height: rem(32);
  }

  &__content {
    padding: rem(32);
    cursor: pointer;

    @include media-breakpoint-down(md) {
      padding: rem(24);
    }

    span,
    span + div {
      font-weight: 700;
    }
    span + div {
      margin-bottom: rem(128);
    }
    @include media-breakpoint-down(sm) {
      span,
      span + div {
        width: 50%;
        text-align: left;
      }
    }

    &.disabled {
      cursor: default;
      pointer-events: none;

      * {
        color: $label-secondary !important;
        fill: $label-secondary !important;
      }
    }
  }
}
</style>
