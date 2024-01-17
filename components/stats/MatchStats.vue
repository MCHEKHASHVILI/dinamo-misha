<template>
  <article class="match-stats">
    <div class="d-flex flex-column justify-center align-items-center mt-20">
      <time class="font-size-18 font-regular font-color-label-primary">{{ dateFormat(game.match_date) }} </time>
    </div>
    <div class="match-stats__score-wrapper w-100 d-inline-flex justify-content-center align-self-center" :class="{ 'flex-row-reverse': game.guest_match }">
      <div class="match-stats__team d-flex flex-column align-items-center">
        <div class="match-stats__logo-container">
          <img src="/logo.png" alt="" class="match-stats__logo" />
        </div>
        <div class="match-stats__name-wrapper position-relative mt-6">
          <div class="match-stats__name font-semi-bold position-absolute font-size-18 line-height-1-5 font-color-label-primary">{{ $t('common.dinamo_tbilisi') }}</div>
        </div>
      </div>
      <div class="match-stats__score-text d-flex align-items-center font-regular font-size-38 font-color-label-primary pr-10 pl-10" :class="{ 'flex-row-reverse': game.guest_match }">
        <span>{{ game.dinamo_goals }}</span>
        -
        <span>{{ game.second_team_goals }}</span>
      </div>
      <div class="match-stats__team d-flex flex-column align-items-center">
        <div class="match-stats__logo-container">
          <img :src="game.second_team.logo" alt="" class="match-stats__logo" />
        </div>
        <div class="match-stats__name-wrapper position-relative mt-6">
          <div class="match-stats__name font-semi-bold position-absolute font-size-18 line-height-1-5 font-color-label-primary">{{ game.second_team.title }}</div>
        </div>
      </div>
    </div>
    <div class="match-stats__lines">
      <div v-for="(value, key, index) in game.stats" :key="index" :class="{ 'flex-row-reverse': game.guest_match }" class="match-stats__line font-semi-bold d-flex justify-content-center align-items-center pt-6 pb-10">
        <div class="value font-size-16 font-color-label-primary text-center">{{ value.home }}</div>
        <p class="stat-name font-size-16 font-color-label-primary text-center text-capitalize">{{ $t('games.' + key) }}</p>
        <div class="value font-size-16 font-color-label-primary text-center">{{ value.away }}</div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'MatchStats',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dateFormat(date) {
      return this.$moment(date).format('dddd, DD MMM. YYYY');
    },
  },
};
</script>

<style lang="scss">
.match-stats {
  top: 0;
  height: 100vh;
  width: 44.44%;
  justify-content: space-between;
  align-content: space-between;
  overflow-y: auto;
  background-color: $gray-scale-500;

  @include media-breakpoint-up(md) {
    position: sticky;
  }

  @include media-breakpoint-down(md) {
    width: 100%;
    height: auto;
    overflow-y: visible;
  }

  &__score-wrapper {
    margin-top: rem(42);
    margin-bottom: rem(96);
    @include media-breakpoint-down(md) {
      margin-top: 40px;
      margin-bottom: 60px;
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  &__team {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(50%);
  }

  &__name-wrapper {
    width: rem(96);
    height: rem(28);
    text-align: center;
    width: 100%;
  }

  &__name {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    white-space: normal;
    width: 100%;
    @include media-breakpoint-down(md) {
      font-size: 14px !important;
    }
  }

  &__logo-container {
    width: rem(96);
    height: rem(96);
    display: flex;
    align-items: center;
    justify-content: center;

    @include media-breakpoint-down(md) {
      width: rem(66);
      height: rem(66);
    }
  }

  &__logo {
    max-width: rem(96);
    max-height: rem(96);

    @include media-breakpoint-down(md) {
      max-width: rem(66);
      max-height: rem(66);
    }
  }

  &__score-text {
    width: rem(247);
    height: rem(96);

    @include media-breakpoint-down(md) {
      font-size: 26px;
      width: auto;
    }

    span {
      display: block;
      flex: 1;
      text-align: center;
    }
  }

  &__line {
    &:nth-child(2n + 1) {
      background-color: $gray-scale-400;
    }

    .stat-name {
      width: rem(247);
      @include media-breakpoint-down(md) {
        font-size: 14px;
      }
    }

    .value {
      width: rem(96);
    }
  }
}
</style>
