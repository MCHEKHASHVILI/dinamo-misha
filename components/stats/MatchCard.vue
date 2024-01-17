<template>
  <article class="match-card border-radius-xl overflow-hidden">
    <div v-if="game" class="d-flex justify-content-between position-relative flex-column h-100 w-100">
      <div class="d-flex flex-column">
        <div class="match-card__score d-flex align-items-center justify-content-between" :class="{ 'flex-row-reverse': game.guest_match }">
          <div class="match-card__team d-flex flex-column align-items-center">
            <div class="match-card__logo-container">
              <img src="/logo.png" alt="" class="match-card__logo" loading="lazy" />
            </div>
          </div>
          <div class="match-card__score-text d-flex justify-content-between flex-1 font-regular font-size-30 font-color-label-primary" :class="{ 'flex-row-reverse': game.guest_match }">
            <span>{{ game.dinamo_goals }}</span>
            <span> - </span>
            <span>{{ game.second_team_goals }}</span>
          </div>
          <div class="match-card__team d-flex flex-column align-items-center">
            <div class="match-card__logo-container">
              <img :src="game.second_team.logo" alt="" class="match-card__logo" loading="lazy" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-6 mb-24" :class="{ 'flex-row-reverse': game.guest_match }">
          <p class="match-card__name font-semi-bold font-size-16 font-size-14-md font-color-label-secondary">{{ $t('common.dinamo_tbilisi') }}</p>
          <p class="match-card__name font-semi-bold font-size-16 font-size-14-md font-color-label-secondary">{{ game.second_team.title }}</p>
        </div>
        <p class="match-card__info-row d-flex align-items-center pb-7">
          <SvgIcon name="pin" class="match-card__info-row__icon mr-6 ml-2" />
          <span class="match-card__info-row__text font-regular font-size-18 font-size-14-md line-height-1-5 font-color-label-primary">{{ location }}</span>
        </p>
        <p class="match-card__info-row d-flex middle align-items-center pb-7 pt-7">
          <SvgIcon name="clock" class="match-card__info-row__icon mr-6 ml-2" />
          <span class="match-card__info-row__text font-regular font-size-18 font-size-14-md line-height-1-5 font-color-label-primary">{{ dateFormat(game.match_date) }}</span>
        </p>
        <p v-if="game.match_time && !game.live_url" class="match-card__info-row d-flex align-items-center pt-7">
          <SvgIcon name="calendar" class="match-card__info-row__icon mr-6 ml-2" />
          <span class="match-card__info-row__text font-regular font-size-18 font-size-14-md line-height-1-5 font-color-label-primary">{{ game.match_time }}</span>
        </p>
      </div>
      <LiveMatchFooter v-if="!game.finished && game.live_url" :url="game.live_url" />
      <UpcomingMatchFooter v-else-if="!game.finished" :date="dateTime" />
      <PastMatchFooter v-else />
    </div>
  </article>
</template>

<script>
import LiveMatchFooter from './LiveMatchFooter.vue';
import PastMatchFooter from './PastMatchFooter.vue';
import UpcomingMatchFooter from './UpcomingMatchFooter.vue';

export default {
  name: 'MatchCard',
  components: { LiveMatchFooter, UpcomingMatchFooter, PastMatchFooter },
  props: {
    game: {
      type: [Object, Boolean],
      required: true,
    },
  },
  computed: {
    location() {
      const { city, country } = this.game;

      const countries = this.$getNames(this.$i18n.locale);
      return `${city}, ${countries[country]}`;
    },
    dateTime() {
      let dateTime = this.game.match_date;
      if (this.game.match_time) {
        dateTime += ' ' + this.game.match_time;
      }
      return new Date(dateTime);
    },
  },
  methods: {
    dateFormat(date) {
      return this.$moment(date).format('DD MMM YYYY');
    },
  },
};
</script>

<style lang="scss">
$logo-offset: rem(24);
$logo-size: rem(64);

.match-card {
  width: rem(400);
  height: rem(500);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  border: 1px solid $gray-scale-400;
  padding: rem(40) rem(48);
  margin: 0 rem(48) 0 0;

  @include media-breakpoint-down(md) {
    width: 100%;
    height: auto;
    margin: 0;
    padding: rem(24);
  }

  &__logo-container {
    width: $logo-size;
    height: $logo-size;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: $logo-offset;
    margin-right: $logo-offset;
  }

  &__logo {
    max-width: $logo-size;
    max-height: $logo-size;
    backface-visibility: hidden;
  }

  &__name {
    width: calc(#{$logo-size} + #{$logo-offset} * 2);
    white-space: normal;
    text-align: center;
    line-height: 1.2;
  }

  &__info-row {
    &:not(:first-of-type) {
      border-top: 1px solid $gray-scale-400;
    }

    &:last-of-type {
      margin-bottom: 3rem;
    }

    &__icon {
      max-width: 16px;
      max-height: 16px;
      fill: $gray-scale-200;
    }
  }
}
</style>
