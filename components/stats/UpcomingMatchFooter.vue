<template>
  <ClientOnly>
    <vac :end-time="date" class="d-flex w-100">
      <article slot="process" slot-scope="{ timeObj }" class="upcoming-match-footer w-100 d-flex align-items-center justify-content-between">
        <div class="upcoming-match-footer__section d-flex flex-column">
          <p class="upcoming-match-footer__section__value font-regular font-size-30 font-size-24-md font-color-label-primary">{{ timeObj.d }}</p>
          <p class="upcoming-match-footer__section__text font-regular font-size-14 line-height-1-4 font-color-label-secondary">days</p>
        </div>
        <div class="upcoming-match-footer__separator h-100" />
        <div class="upcoming-match-footer__section d-flex flex-column">
          <p class="upcoming-match-footer__section__value font-regular font-size-30 font-size-24-md font-color-label-primary">{{ timeObj.h }}</p>
          <p class="upcoming-match-footer__section__text font-regular font-size-14 line-height-1-4 font-color-label-secondary">hours</p>
        </div>
        <div class="upcoming-match-footer__separator h-100" />
        <div class="upcoming-match-footer__section d-flex flex-column">
          <p class="upcoming-match-footer__section__value font-regular font-size-30 font-size-24-md font-color-label-primary">{{ timeObj.m }}</p>
          <p class="upcoming-match-footer__section__text font-regular font-size-14 line-height-1-4 font-color-label-secondary">mins</p>
        </div>
        <div class="upcoming-match-footer__separator h-100" />
        <div class="upcoming-match-footer__section d-flex flex-column">
          <p class="upcoming-match-footer__section__value font-regular font-size-30 font-size-24-md font-color-label-primary">{{ timeObj.s }}</p>
          <p class="upcoming-match-footer__section__text font-regular font-size-14 line-height-1-4 font-color-label-secondary">sec</p>
        </div>
      </article>
    </vac>
  </ClientOnly>
</template>

<script>
export default {
  name: 'UpcomingMatchFooter',
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.upcoming-match-footer {
  &__section {
    text-align: center;
    width: calc(100% / 4);
    &__value {
      line-height: 150%;
    }
    &__text {
      text-transform: uppercase;
    }
  }
  &__separator {
    width: 1px;
    background-color: $gray-scale-400;
  }
}
</style>
