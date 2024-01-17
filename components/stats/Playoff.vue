<template>
  <div class="playoff">
    <div class="mt-16 mb-8 pl-12 pl-md-32 font-semi-bold font-size-18 font-color-label-primary">{{ $t('stats.playoff') }}</div>
    <table class="standings__table w-100 font-regular font-color-label-primary font-size-16 line-height-1-5">
      <tr v-for="(item, index) in playOff" :key="index" class="entry">
        <td class="pr-12 pr-md-32">
          <div class="club-name d-flex align-items-center justify-content-between" :class="{ 'flex-row-reverse': item.guest_match }">
            <div class="d-flex align-items-center flex-column flex-md-row">
              <img src="/logo.png" alt="club-icon" class="club-icon mr-4 mb-2 mb-md-0" />
              <p class="font-regular font-color-label-primary font-size-16 text-nowrap">{{ $t('common.dinamo_tbilisi') }}</p>
            </div>
            <div class="font-color-label-secondary font-size-16font-regular mx-16 text-nowrap">
              <span v-if="item.dinamo_goals != null">{{ item.dinamo_goals + ' - ' + item.second_team_goals }}</span>
              <span v-else>VS</span>
            </div>
            <!--            <div class="font-color-label-secondary font-size-16font-regular mx-8">VS</div>-->
            <div class="d-flex align-items-center flex-column flex-md-row">
              <img :src="item.second_team.logo" alt="club-icon" class="club-icon mr-4 mb-2 mb-md-0" />
              <p class="font-regular font-color-label-primary font-size-16 text-nowrap">{{ item.second_team.title }}</p>
            </div>
          </div>
        </td>
        <td>
          <div class="d-flex align-items-center"><SvgIcon name="cup" class="mr-2" />{{ item.play_off_step }}</div>
        </td>
        <td>
          <div class="d-flex align-items-center"><SvgIcon name="pin" class="mr-2" />{{ item.city }}</div>
        </td>

        <td>
          <div class="d-flex align-items-center"><SvgIcon name="calendar" class="mr-2" />{{ dateFormat(item.match_date) }}</div>
        </td>
        <td>
          <div class="d-flex align-items-center"><SvgIcon name="clock" class="mr-2" />{{ item.match_time }}</div>
        </td>
      </tr>
    </table>
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
      return this.$moment(date).format('DD MMMM YYYY');
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
.playoff {
  .entry {
    td,
    th {
      width: auto !important;

      &:first-child {
        width: 40%;

        @include media-breakpoint-down(md) {
          width: 100%;
          padding-left: rem(24);
        }
      }
    }

    svg {
      height: 16px;
      max-width: 24px;
      fill: $gray-scale-200;
    }
  }
}
</style>
