<template>
  <div class="standings-mobile">
    <div v-for="(item, index) in table" :key="index" class="standings-mobile__item d-flex flex-column px-12 pt-8 pb-10">
      <div class="d-flex align-items-center mb-12">
        <img :src="item.team.logo" alt="club-icon" class="standings-mobile__logo mr-4" />
        <h4 class="font-semi-bold color-label-primary">{{ item.team.name }}</h4>
      </div>
      <div class="d-flex mb-12">
        <div class="standings-mobile__options-wrapper">
          <div class="standings-mobile__option">Games</div>
          <div class="standings-mobile__value">{{ item.games }}</div>
        </div>
        <div class="standings-mobile__options-wrapper">
          <div class="standings-mobile__option">Wins</div>
          <div class="standings-mobile__value">{{ item.wins }}</div>
        </div>
        <div class="standings-mobile__options-wrapper">
          <div class="standings-mobile__option">Draw</div>
          <div class="standings-mobile__value">
            {{ item.draw }}
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="standings-mobile__options-wrapper">
          <div class="standings-mobile__option">Loss</div>
          <div class="standings-mobile__value">{{ item.loss }}</div>
        </div>
        <div class="standings-mobile__options-wrapper">
          <div class="standings-mobile__option">Goals</div>
          <div class="standings-mobile__value">{{ item.gf }} - {{ item.ga }}</div>
        </div>
        <div class="standings-mobile__options-wrapper">
          <div class="standings-mobile__option">Points</div>
          <div class="standings-mobile__value">{{ item.points }}</div>
        </div>
      </div>
    </div>
    <PlayoffMobile v-if="playOff && playOff.length > 0" :play-off="playOff" />
  </div>
</template>

<script>
export default {
  name: 'StandingsMobile',
  props: {
    table: {
      type: Array,
      required: true,
    },
    playOff: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.standings-mobile {
  &__logo {
    max-width: 40px;
    max-height: 40px;
  }

  &__item {
    border-bottom: 1px solid $gray-scale-400;
    &:not(:last-of-type) {
      border-bottom-color: $gray-scale-300;
    }
  }

  &__options-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__option {
    color: $label-secondary;
    font-size: 16px;
    margin-bottom: 16px;
    font-weight: 600;
    font-family: 'fieldwork';
    &:lang(ka) {
      font-family: 'Noto Sans Georgian SemBd', sans-serif;
    }
  }

  &__value {
    font-size: 16px;
    font-weight: 600;
    font-family: 'WPC Dinamo Tbilisi';
    &:lang(ka) {
      font-family: 'Noto Sans Georgian SemBd', sans-serif;
    }
    color: $label-primary;
  }
}
</style>
