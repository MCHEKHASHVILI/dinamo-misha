<template>
  <div class="position-relative d-flex is-nested flex-wrap">
    <MatchStats :game="data"></MatchStats>
    <div class="match-nested-wrapper">
      <div class="match-nested mx-auto pt-16 pb-md-48">
        <Breadcrumbs link-key="stats" :parent="$t('common.stats')" :child="$t('common.game_stats')" />
        <article>
          <div class="ratings-wrapper">
            <table class="team-table w-100 font-semi-bold font-color-label-primary text-left line-height-1-5 font-size-16 mt-24 mt-md-48">
              <tr>
                <th colspan="1" class="ratings-wrapper__title">
                  <p class="mb-12 text-capitalize">{{ $t('common.dinamo') }}</p>
                </th>
                <th colspan="1" class="font-color-label-secondary mb-12 text-center">
                  <p class="mb-12 text-uppercase">{{ $t('stats.g') }}</p>
                </th>
                <th colspan="1" class="font-color-label-secondary mb-12 text-center">
                  <p class="mb-12 text-uppercase">{{ $t('stats.pf') }}</p>
                </th>
                <th colspan="1" class="font-color-label-secondary mb-12 text-center">
                  <p class="mb-12 text-uppercase">{{ $t('stats.s') }}</p>
                </th>
              </tr>
              <tr v-for="(item, key, index) in data.dinamo_players" :key="index">
                <td colspan="1">
                  <NuxtLink :to="localePath({ name: 'team/id/slug', params: { id: item.id, slug: item.slug } })" class="text-decoration-none color-label-primary">
                    <div class="player-name-wrapper d-flex align-items-center mb-8">
                      <div v-if="item.profile_image" class="player-image mr-6" :style="`background-image: url(${item.profile_image})`" />
                      <div v-else class="border-radius-50 overflow-hidden mr-6 player-name-wrapper__avatar-container">
                        <SvgIcon name="player_avatar" class="player-name-wrapper__avatar" />
                      </div>
                      <p class="player-name font-semi-bold font-size-16 flex-1">{{ item.name }}</p>
                    </div>
                  </NuxtLink>
                </td>
                <td colspan="1" class="text-center team-table__col">
                  <p class="mb-8">{{ item.goals }}</p>
                </td>
                <td colspan="1" class="text-center team-table__col">
                  <p class="mb-8">{{ item.shots }}</p>
                </td>
                <td colspan="1" class="text-center team-table__col">
                  <p class="mb-8">{{ item.personal_fouls }}</p>
                </td>
              </tr>
            </table>
            <table v-if="data.second_team_players && data.second_team_players.length > 0" class="team-table w-100 font-semi-bold font-color-label-primary text-left line-height-1-5 font-size-16 my-24 mt-md-48 mb-md-36">
              <tr>
                <th v-if="data.second_team.title" colspan="1" class="ratings-wrapper__title">
                  <p class="mb-12 text-capitalize">{{ data.second_team.title }}</p>
                </th>
                <th colspan="1" class="font-color-label-secondary mb-12 text-center">
                  <p class="mb-12 text-uppercase">{{ $t('stats.pf') }}</p>
                </th>
                <th colspan="1" class="font-color-label-secondary mb-12 text-center">
                  <p class="mb-12 text-uppercase">{{ $t('stats.s') }}</p>
                </th>
                <th colspan="1" class="font-color-label-secondary mb-12 text-center">
                  <p class="mb-12 text-uppercase">{{ $t('stats.g') }}</p>
                </th>
              </tr>
              <tr v-for="(item, key, index) in data.second_team_players" :key="index">
                <td colspan="1">
                  <div class="player-name-wrapper d-flex align-items-center mb-8">
                    <!--                    <div class="player-image mr-6" />-->
                    <div class="border-radius-50 overflow-hidden mr-6 player-name-wrapper__avatar-container">
                      <SvgIcon name="player_avatar" class="player-name-wrapper__avatar" />
                    </div>

                    <p class="player-name font-semi-bold font-size-16 flex-1">{{ item.name }}</p>
                  </div>
                </td>
                <td colspan="1" class="text-center team-table__col">
                  <p class="mb-8">{{ item.personal_fouls }}</p>
                </td>
                <td colspan="1" class="text-center team-table__col">
                  <p class="mb-8">{{ item.shots }}</p>
                </td>
                <td colspan="1" class="text-center team-table__col">
                  <p class="mb-8">{{ item.goals }}</p>
                </td>
              </tr>
            </table>
            <!--            <RelatedNews />-->
            <!--            <RelatedNews class="mt-8" />-->
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Match',
  meta: {
    nested: true,
  },
  layout: 'horizontal-pages',
  async asyncData({ params, $axios }) {
    const data = await $axios.$get('/games/' + params.id);
    return { data };
  },
  data() {
    return {
      relatedPosts: null,
      data: null,
      stats: [
        {
          value1: 29,
          value2: 28,
          statName: 'Shots',
        },
        {
          value1: 29,
          value2: 28,
          statName: 'Shots',
        },
        {
          value1: 29,
          value2: 28,
          statName: 'Shots',
        },
        {
          value1: 29,
          value2: 28,
          statName: 'Shots',
        },
        {
          value1: 29,
          value2: 28,
          statName: 'Shots',
        },
        {
          value1: 29,
          value2: 28,
          statName: 'Shots',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.match-nested-wrapper {
  flex: 1;

  .match-nested {
    width: 77.7%;

    @include media-breakpoint-down(md) {
      width: calc(100% - 30px);
    }

    .ratings-wrapper {
      .team-table {
        th {
          font-size: rem(16);
          @include media-breakpoint-down(md) {
            font-size: 14px;
          }
        }
        th,
        td {
          vertical-align: middle;
          &:first-child {
            width: 50%;
          }
        }
        .player-name-wrapper {
          .player-image {
            width: rem(40);
            height: rem(40);
            background-position: center;
            background-size: cover;
            background-color: gray;
            border-radius: 50%;
          }

          .player-name {
            @include media-breakpoint-down(md) {
              font-size: 14px;
            }
          }

          &__avatar-container {
            width: rem(40);
            height: rem(40);
          }

          &__avatar {
            width: rem(40);
            height: rem(40);
          }
        }
      }

      &__title {
        font-size: rem(24);
        @include media-breakpoint-down(md) {
          font-size: 16px;
        }
      }
    }
  }
}

.team-table {
  &__col {
    width: rem(70);
    @include media-breakpoint-down(md) {
      font-size: 14px;
    }
  }
}
</style>
