<template>
  <div class="academy-package position-relative border-radius-xl d-flex flex-column">
    <div class="academy-package__header d-flex align-items-center border-radius-xl pl-20 pr-20 pt-20 pb-16">
      <div class="academy-package__icon-container border-radius-50 d-flex align-items-center justify-content-center">
        <SvgIcon :name="`academy-package-${data.type}`" class="academy-package__icon svg-fill-label-white" />
      </div>
      <div class="academy-package__age-text flex-1 font-semi-bold font-color-label-white font-size-24 font-size-18-md line-height-1-5 ml-8 mr-8">{{ data.title }}</div>
      <div class="academy-package__price">
        <p class="font-regular font-color-label-white font-size-24 font-size-18-md d-flex align-items-end">{{ data.price }} <SvgIcon name="lari" class="academy-package__currency-icon svg-fill-label-white" /></p>
        <div class="d-flex align-items-center">
          <p class="font-light font-color-label-white font-size-16 font-size-14-md line-height-1-5 mr-2">{{ data.pay_per }}</p>
          <SvgIcon name="info" class="academy-package__info cursor-pointer" />
        </div>
      </div>
    </div>
    <div class="academy-package__body position-relative d-flex justify-content-between border-radius-xl py-16 px-22">
      <div class="custom-border position-absolute" />
      <div v-for="(item, index) in data.days" :key="index + '-academy-package-schedule'" class="column h-100 text-center" :style="`width: calc((100% - 2rem) / ${data.days.length})`">
        <p class="font-semi-bold font-color-label-white font-size-18 font-size-16-md line-height-1-6 mb-4">{{ item.day_range }}</p>
        <div class="times-wrapper d-flex flex-column flex-wrap">
          <p v-for="(listItem, listIndex) in item.list.map((item) => item.item)" :key="listIndex + '-academy-package-schedule-day'" class="time-entry text-center font-light font-color-label-white font-size-16 font-size-14-md line-height-1-5 mb-4 opacity-0-7 w-auto">{{ listItem }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcademyPackage',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.academy-package {
  margin-bottom: rem(80);

  @include media-breakpoint-down(md) {
    display: inline-block !important;
    width: 100% !important;
    padding-left: rem(24) !important;
    padding-right: rem(24) !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    top: 0 !important;
    margin-bottom: rem(24);
  }

  &:first-child {
    width: rem(530);
    top: 0;
    margin-left: rem(60);
    margin-right: rem(60);

    .academy-package__header,
    .academy-package__body {
      background-color: $package-blue;
    }
  }

  &:nth-child(2) {
    width: rem(570);
    top: 0;
    margin-left: rem(40);
    margin-right: rem(40);

    .academy-package__header,
    .academy-package__body {
      background-color: $package-green;
    }
  }

  &:nth-child(3) {
    top: 0;
    width: rem(610);
    margin-left: rem(20);
    margin-right: rem(20);

    .academy-package__header,
    .academy-package__body {
      background-color: $package-red;
    }
  }

  &:nth-child(4) {
    top: 0;
    width: rem(650);
    .academy-package__header,
    .academy-package__body {
      background-color: $package-black;
    }
  }

  &__header {
    @include media-breakpoint-down(md) {
      padding: rem(24) !important;
    }
  }

  &__icon-container {
    width: rem(76);
    height: rem(76);
    background-color: rgba($label-white, 0.1);
    background-size: cover;
    background-position: center;

    @include media-breakpoint-down(md) {
      width: rem(48);
      height: rem(48);
    }
  }

  &__icon {
    max-width: rem(34);
    max-height: rem(38);
  }

  &__age-text {
    margin-right: auto;
  }

  &__info {
    width: rem(14);
    height: rem(14);

    @include media-breakpoint-down(md) {
      width: rem(12);
      height: rem(12);
    }
  }

  &__body {
    @include media-breakpoint-down(md) {
      padding-top: rem(24) !important;
      padding-bottom: rem(24) !important;
      padding-left: rem(24);
      padding-right: rem(24);

      .time-entry {
        display: inline-block;
        margin-right: rem(16);

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .custom-border {
      top: 0;
      left: 10%;
      width: 80%;
      height: 2px;
      border-top-style: dashed;
      border-top-width: 1px;
      border-top-color: $label-white;
    }

    .times-wrapper {
      height: 9rem;

      @include media-breakpoint-down(md) {
        flex-direction: row !important;
        height: auto;
      }
    }
  }

  &__currency-icon {
    width: rem(18);
    height: rem(18);
  }
}
</style>
