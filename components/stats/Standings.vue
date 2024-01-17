<template>
  <article class="standings">
    <table class="standings__table font-regular font-color-label-primary font-size-16 line-height-1-5">
      <tr class="header font-color-label-secondary font-size-16 font-semi-bold text-capitalize">
        <th></th>
        <th>{{ $t('stats.games') }}</th>
        <th>{{ $t('stats.win') }}</th>
        <th>{{ $t('stats.draw') }}</th>
        <th>{{ $t('stats.loss') }}</th>
        <th>{{ $t('stats.gf') }}</th>
        <th>{{ $t('stats.ga') }}</th>
        <th>{{ $t('stats.points') }}</th>
      </tr>
      <tr v-for="(item, index) in table" :key="index" class="entry">
        <td>
          <div class="club-name d-flex align-items-center">
            <div class="club-name__icon-wrapper mr-4">
              <img :src="item.team.logo" alt="club-icon" class="club-icon" />
            </div>
            <p class="text-nowrap">{{ item.team.name }}</p>
          </div>
        </td>
        <td>{{ item.games }}</td>
        <td>{{ item.wins }}</td>
        <td>{{ item.draw }}</td>
        <td>{{ item.loss }}</td>
        <td>{{ item.gf }}</td>
        <td>{{ item.ga }}</td>
        <td>{{ item.points }}</td>
      </tr>
    </table>
    <Playoff v-if="playOff && playOff.length > 0" :play-off="playOff" />
  </article>
</template>

<script>
export default {
  name: 'Standings',
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
.standings {
  padding: rem(40) 0;

  &__table {
    width: 100%;

    .header {
      text-align: center;
      height: rem(53);
      vertical-align: middle;
    }

    .entry {
      height: rem(83);
      transform: scale(1);
      position: relative;
      text-align: center;
      &:not(:last-of-type)::after {
        @include abs-position(100%, auto, auto, 50%);
        transform: translateX(-50%);
        width: calc(100% - #{rem(128)});
        height: 1px;
        content: '';
        background: $gray-scale-400;
      }
      &:hover {
        background-color: $gray-scale-500;

        .border {
          opacity: 0;
        }
      }

      .border {
        width: calc(100% - 8rem);
        height: 1px;
        bottom: 0;
        left: 4rem;
      }
    }

    .club-icon {
      max-width: rem(56);
      max-height: rem(56);
    }

    .entry,
    .header {
      td,
      th {
        vertical-align: middle;
        width: calc(80% / 7);

        &:first-child {
          width: 20%;
          padding-left: rem(64);
        }

        &:last-child {
          padding-right: rem(64);
        }
      }
    }
  }

  .club-name {
    &__icon-wrapper {
      width: rem(56);
    }
  }
}
</style>
