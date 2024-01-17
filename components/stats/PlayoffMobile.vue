<template>
  <div class="playoff-mobile">
    <div class="mt-16 mb-8 pl-12 font-semi-bold font-size-18 font-color-label-primary">{{ $t('stats.playoff') }}</div>
    <div v-if="playOff" class="standings__table w-100 font-regular font-color-label-primary font-size-16 line-height-1-5">
      <div v-for="(item, index) in playOff" :key="index" class="playoff-mobile__row px-12">
        <div>
          <div class="club-name d-flex align-items-center justify-content-between" :class="{ 'flex-row-reverse': item.guest_match }">
            <div class="d-flex align-items-center flex-column flex-md-row">
              <div class="playoff-mobile__logo-wrapper">
                <img src="/logo.png" alt="club-icon" class="club-icon mr-4 mb-6 mb-md-0" />
              </div>
              <p class="font-regular font-color-label-primary font-size-16 text-center">{{ $t('common.dinamo_tbilisi') }}</p>
            </div>
            <div class="font-color-label-secondary font-size-16font-regular mx-16 text-nowrap">
              <span v-if="item.dinamo_goals != null">{{ item.dinamo_goals + ' - ' + item.second_team_goals }}</span>
              <span v-else>VS</span>
            </div>
            <!--            <div class="font-color-label-secondary font-size-16font-regular mx-8">VS</div>-->
            <div class="d-flex align-items-center flex-column flex-md-row">
              <div class="playoff-mobile__logo-wrapper">
                <img :src="item.second_team.logo" alt="club-icon" class="club-icon mr-4 mb-2 mb-md-0" />
              </div>
              <p class="font-regular font-color-label-primary font-size-16 text-center">{{ item.second_team.title }}</p>
            </div>
          </div>
        </div>
        <div class="mt-12 d-flex">
          <div class="mb-4 flex-1"><SvgIcon name="cup" class="mr-2" />{{ item.play_off_step }}</div>
          <div class="mb-4 flex-1"><SvgIcon name="pin" class="mr-2" />{{ item.city }}</div>
        </div>
        <div class="mb-12 mt-4 d-flex">
          <div class="mb-4 flex-1"><SvgIcon name="calendar" class="mr-2" />{{ dateFormat(item.match_date) }}</div>
          <div class="mb-4 flex-1"><SvgIcon name="clock" class="mr-2" />{{ item.match_time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Playoff',
  props: {
    playOff: {
      type: Array,
      required: true,
    },
  },
  methods: {
    dateFormat(date) {
      return this.$moment(date).format('DD MMM, YYYY');
    },
    dateTime(dateTime) {
      if (dateTime) {
        dateTime += ' ' + dateTime;
      }
      return new Date(dateTime);
    },
  },
};
</script>

<style lang="scss">
.playoff-mobile {
  &__row {
    &:not(:last-child) {
      border-bottom: 1px solid $gray-scale-300;
      margin-bottom: rem(16);
    }
  }

  svg {
    max-width: 16px;
    max-height: 16px;
    fill: $gray-scale-200;
  }

  &__logo-wrapper {
    min-height: rem(56);

    .club-icon {
      max-width: none;
      //max-height: rem(56);
    }
  }
}
</style>
