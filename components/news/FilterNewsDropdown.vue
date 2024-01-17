<template>
  <div class="filter-news-dropdown position-relative">
    <div class="filter-news-dropdown__icon-container cursor-pointer border-radius-50 d-flex align-items-center justify-content-center" :class="{ active }" @click="active = !active">
      <SvgIcon :name="iconName" class="filter-news-dropdown__icon" />
    </div>
    <div class="filter-news-dropdown__content z-index-1 border-radius-xl bg-color-label-white px-8 py-16" :class="{ active }">
      <div class="filter-news-dropdown__content__wrapper w-100">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterNewsDropdown',
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  beforeMount() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.active = false;
      }
    },
  },
};
</script>

<style lang="scss">
.filter-news-dropdown {
  &__icon-container {
    width: rem(42);
    height: rem(42);
    transition: background 0.3s ease;
    &.active,
    &:hover {
      background: $gray-scale-500;
    }

    &:hover,
    &.active {
      .filter-news-dropdown__icon {
        fill: $accent-primary !important;
      }
    }
  }

  &__icon {
    max-height: rem(18);
    max-width: rem(16);
    transition: fill 0.3s ease;
  }

  &__content {
    @include abs-position(calc(#{rem(18)} + 100%), rem(-30), auto, auto);

    min-width: rem(250);
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.12);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;

    @include media-breakpoint-down(sm) {
      right: 0;
    }

    &.active {
      visibility: visible;
      opacity: 1;
    }

    &::after {
      @include abs-position(rem(-12), rem(27), auto, auto);
      width: 0;
      height: 0;
      content: '';
      border-left: rem(24) solid transparent;
      border-right: rem(24) solid transparent;
      border-bottom: rem(24) solid $label-white;

      @include media-breakpoint-down(sm) {
        border-left: rem(20) solid transparent;
        border-right: rem(20) solid transparent;
        border-bottom: rem(20) solid $label-white;
        right: 0;
      }
    }

    &__wrapper {
      max-height: rem(332);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
