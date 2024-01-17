<template>
  <section ref="matchList" class="matches-list position-relative w-100 h-100">
    <nav class="matches-list__nav d-flex justify-content-between z-index-1">
      <div class="d-flex align-items-center" @click="showPopup = true">
        <SvgIcon name="trophy" class="matches-list__nav-icon desktop trophy mr-5" />
        <SvgIcon name="trophy-mobile" class="matches-list__nav-icon mobile trophy mr-5" />
        <p class="season-text mobile font-semi-bold font-size-14 line-height-1-5 font-color-accent-primary">{{ $t('stats.standings') }}</p>
      </div>
      <div class="d-flex align-items-center desktop">
        <div class="mr-20 d-flex align-items-center font-regular font-color-label-primary font-size-16">
          <span class="font-regular font-color-label-tertiary font-size-16 mr-2 mb-2">{{ $t('stats.season') }}:</span>
          <ClientOnly>
            <v-select id="season-select" v-model="season" :options="seasons" label="name" :searchable="false" :clearable="false" :value="seasons[0].slug" :reduce="(option) => option.slug" @input="seasonChange">
              <template v-slot:option="option">
                <p class="font-regular font-color-label-primary font-size-16 line-height-1-5">{{ option.name }}</p>
              </template>
            </v-select>
          </ClientOnly>
        </div>
        <BaseCheckbox v-for="(category, index) in categories" :key="index + '-stats-checkbox-mobile'" v-model="leagues" :custom-value="category.value" class="mr-16">
          {{ category.name }}
        </BaseCheckbox>
      </div>
      <div class="d-flex align-items-center mobile">
        <FilterNewsDropdown icon-name="calendar">
          <BaseCheckbox v-for="(seasonItem, index) in seasons" :key="index + '-seasons-radio-mobile'" v-model="season" type="radio" checkmark-color="#183041" :custom-value="seasonItem.slug" class="mb-10" @input="seasonChange">
            {{ seasonItem.name }}
          </BaseCheckbox>
        </FilterNewsDropdown>
        <FilterNewsDropdown icon-name="filter">
          <BaseCheckbox v-for="(category, index) in categories" :key="index + '-stats-checkbox-mobile'" v-model="leagues" checkmark-color="#183041" :custom-value="category.value" class="mb-10">
            {{ category.name }}
          </BaseCheckbox>
        </FilterNewsDropdown>
      </div>
    </nav>
    <LocomotiveScroll
      ref="scroller"
      :getted-options="{
        smooth: true,
        direction: 'horizontal',
        smartphone: {
          smooth: false,
          direction: 'vertical',
        },
        tablet: {
          smooth: false,
          direction: 'vertical',
        },
      }"
    >
      <div class="horizontal d-flex" data-scroll-container>
        <div
          v-for="(game, index) in filteredGames"
          :key="index + '-' + game.match_date"
          data-scroll-section
          data-scroll-trigger
          :data-month="months.findIndex((item) => $moment(game.match_date).format('MMM') === item)"
          :data-state="game.live_url ? 'live' : game.finished ? 'finished' : 'upcoming'"
          class="matches-list__item-wrapper d-flex flex-column justify-content-center"
        >
          <NuxtLink v-if="game.finished" :to="localePath({ name: 'stats/id/slug', params: { id: game.id, slug: game.slug } })" class="text-decoration-none">
            <MatchCard :game="game" :home-team-name="$t('common.dinamo_tbilisi')" :home-team-score="index === 0 ? null : 9" away-team-name="Telekom Budapest" :away-team-score="index == 0 ? null : 0" time="18:00" date="24 sep, Friday" />
          </NuxtLink>
          <div v-else>
            <MatchCard :game="game" :home-team-name="$t('common.dinamo_tbilisi')" :home-team-score="index === 0 ? null : 9" away-team-name="Telekom Budapest" :away-team-score="index == 0 ? null : 0" time="18:00" date="24 sep, Friday" />
          </div>
        </div>
        <div data-scroll-section data-scroll-trigger class="matches-list__item-wrapper d-flex flex-column justify-content-center">
          <SeasonCard :season="prevSeason ? prevSeason.name : ''" :text="$t('common.previous_season')" :disabled="prevSeason == ''" :action="handlePrevSeasonClick" />
        </div>
        <div data-scroll-section data-scroll-trigger class="matches-list__item-wrapper d-flex flex-column justify-content-center">
          <SeasonCard :season="nextSeason ? nextSeason.name : ''" :text="$t('common.next_season')" :disabled="nextSeason == ''" :action="handleNextSeasonClick" />
        </div>
      </div>
    </LocomotiveScroll>
    <div v-if="months.length > 1" class="matches-list__months position-absolute d-flex overflow-visible align-items-center">
      <div class="scroller position-absolute"></div>
      <div v-for="(month, index) in months" :key="index" :data-month="index" class="month pr-8 pl-8 font-regular font-size-16 font-semi-bold line-height-1-5 font-color-label-primary cursor-pointer" :class="activeMonth === index ? 'active' : ''" @click="scrollToMonth(index)">{{ month }}</div>
    </div>
    <transition name="fade" mode="out-in">
      <StandingsPopup v-if="showPopup" :championships="championships" @closePopup="closePopup" />
    </transition>
    <NextPage :data="{ name: 'history', title: $t('pages.history') }" />
  </section>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MatchCard from '../../components/stats/MatchCard';
import SeasonCard from '../../components/stats/SeasonCard';
import StandingsPopup from '../../components/stats/StandingsPopup.vue';
import BaseCheckbox from '../../components/common/BaseCheckbox';
import metaTagsMixin from '../../mixins/meta-tags-mixin';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Stats',
  meta: {
    nested: false,
  },
  components: { BaseCheckbox, MatchCard, StandingsPopup, SeasonCard },
  mixins: [metaTagsMixin],
  async asyncData({ $axios, $context }) {
    // const currentYear = new Date().getFullYear(); // 2020
    // const previousYear = currentYear - 1;

    const seasonsPromise = $axios.$get('/taxonomy/seasons');
    const [seasons] = await Promise.all([seasonsPromise]);

    const gamesPromise = $axios.$get(`/games?seasons=${seasons[0].slug}`);
    const championshipsPromise = $axios.$get(`/championships?seasons=${seasons[0].slug}`);

    const [games, championships] = await Promise.all([gamesPromise, championshipsPromise]);
    const nextSeason = '';
    const prevSeason = seasons.length > 1 ? seasons[1] : '';
    return { games: games.games, metaTags: games.meta_tags, seasons, season: seasons[0].slug, championships, nextSeason, prevSeason };
  },
  data() {
    return {
      games: [],
      championships: [],
      loaded: false,
      season: '',
      seasons: [],
      nextSeason: '',
      prevSeason: '',
      activeMonth: 0,
      showPopup: false,
      leagues: [],
      categories: [
        {
          name: this.$t('common.champions_league'),
          value: [2, 13],
        },
        {
          name: this.$t('common.georgian_championship'),
          value: [3, 20],
        },
        {
          name: this.$t('common.other_leagues'),
          value: [1, 11],
        },
      ],
    };
  },
  layout: 'horizontal-pages',
  computed: {
    months() {
      return this.uniqueArrayByProperty(this.filteredGames, (it) => this.$moment(it.match_date).format('MMM'));
    },
    filteredGames() {
      if (this.leagues.length === 0) {
        return this.games;
      }
      return this.games
        .filter((item) => {
          return this.leagues[0].includes(item.category);
        })
        .sort((a, b) => {
          const aDate = new Date(a.match_date);
          const bDate = new Date(b.match_date);
          if (aDate > bDate) {
            return 1;
          }
          if (aDate < bDate) {
            return -1;
          }
          return 0;
        });
    },
  },
  watch: {
    filteredGames() {
      this.updateLocoScroll();
    },
  },
  mounted() {
    this.setupJSEvents();
    this.$nextTick(() => {
      this.scrollToNextMatch();
    });
  },
  methods: {
    setupJSEvents() {
      const monthElement = this.$refs.matchList.querySelector('.matches-list__months .month[data-month="' + this.activeMonth + '"]') || 0;
      const offsetLeft = monthElement.offsetLeft;
      const curWidth = monthElement.offsetWidth;
      const scroller = this.$refs.matchList.querySelector('.matches-list__months .scroller');
      if (scroller) {
        const newLeft = offsetLeft + curWidth / 2;
        scroller.style.left = newLeft + 'px';
        this.initScrolltrigger();
        const elements = this.$refs.matchList.querySelectorAll('[data-scroll-trigger]');
        elements.forEach((element) => this.elementAnimation(element));
        const locomotive = this.$refs.scroller.locomotive;
        const montWrapperOffsetLeft = this.$refs.matchList.querySelector('.matches-list .matches-list__item-wrapper[data-month="0"]').offsetLeft;
        const offset = montWrapperOffsetLeft || 0;
        locomotive.on('scroll', (args) => {
          // calculate current scroll distance
          if (args.delta && args.delta.x) {
            const x = args.delta.x;
            // calculate ratio of distance scrolled between first match cards of current and next months
            const firstElem = this.$refs.matchList.querySelector('.matches-list .matches-list__item-wrapper[data-month="' + this.activeMonth + '"]');
            if (firstElem) {
              const firstElemOffset = firstElem.offsetLeft - offset;
              const nextElem = this.$refs.matchList.querySelector('.matches-list .matches-list__item-wrapper[data-month="' + (this.activeMonth + 1) + '"]');
              if (nextElem) {
                const nextElemOffset = nextElem.offsetLeft - offset;
                const distance = nextElemOffset - firstElemOffset;
                const scrolled = x - firstElemOffset;
                const ratio = scrolled / distance;

                // calculate distance between current and next months
                const monthElement = this.$refs.matchList.querySelector('.matches-list__months .month[data-month="' + this.activeMonth + '"]');
                if (monthElement) {
                  const offsetLeft = monthElement.offsetLeft;
                  const curWidth = monthElement.offsetWidth;

                  const nextMonthElement = this.$refs.matchList.querySelector('.matches-list__months .month[data-month="' + this.activeMonth + '"]');
                  const nextWidth = nextMonthElement.offsetWidth;

                  // calculate new position for the scroller and apply it
                  const scroller = this.$refs.matchList.querySelector('.matches-list__months .scroller');
                  let newLeft = offsetLeft + curWidth / 2 + (curWidth / 2 + nextWidth / 2) * ratio;
                  if ((this.activeMonth === 11 && newLeft > offsetLeft + curWidth / 2) || (this.activeMonth === 0 && newLeft < offsetLeft + curWidth / 2)) {
                    newLeft = offsetLeft + curWidth / 2;
                  }
                  scroller.style.left = newLeft + 'px';
                }
              }
            }
          }
        });
      }
    },
    uniqueArrayByProperty(array, callback) {
      return array.reduce((prev, item) => {
        const v = callback(item);
        if (!prev.includes(v)) prev.push(v);
        return prev;
      }, []);
    },
    updateLocoScroll() {
      this.$nextTick(() => {
        this.$refs.scroller.locomotive.scrollTo(0, 0, 0);
        this.$refs.scroller.locomotive.update();
      });
    },
    handleNextSeasonClick() {
      if (this.nextSeason) {
        this.season = this.nextSeason.slug;
        this.seasonChange();
      }
    },
    handlePrevSeasonClick() {
      if (this.prevSeason) {
        this.season = this.prevSeason.slug;
        this.seasonChange();
      }
    },
    async seasonChange() {
      const gamesPromise = this.$axios.$get(`/games?seasons=${this.season}`);
      const championshipsPromise = this.$axios.$get(`/championships?seasons=${this.season}`);
      const [games, championships] = await Promise.all([gamesPromise, championshipsPromise]);
      this.games = games.games;
      this.championships = championships;

      const index = this.seasons.map((season) => season.slug).indexOf(this.season);
      this.nextSeason = index > 0 ? this.seasons[index - 1] : '';
      this.prevSeason = index < this.seasons.length - 1 ? this.seasons[index + 1] : '';
      this.updateLocoScroll();
      this.$nextTick(() => {
        this.setupJSEvents();
        this.$nextTick(() => {
          this.scrollToNextMatch();
        });
      });
    },
    initScrolltrigger() {
      const locomotive = this.$refs.scroller.locomotive;
      locomotive.on('scroll', ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(locomotive.el, {
        scrollLeft(value) {
          if (arguments.length) {
            locomotive.scrollTo(0, value, 0);
          }
          return locomotive.scroll.instance.scroll.x;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: window.innerWidth - locomotive.el.clientWidth,
            width: locomotive.el.clientWidth,
            height: locomotive.el.clientHeight,
          };
        },
      });
    },
    elementAnimation(element) {
      gsap.from(element, {
        scrollTrigger: {
          horizontal: true,
          trigger: element,
          scroller: this.$refs.scroller.locomotive.el,
          start: 'left ' + (parseInt(window.getComputedStyle(document.querySelector('.horizontal-page__content .horizontal'), null).getPropertyValue('padding-left')) + 5) + 'px',
          end: '+=' + element.clientWidth,
          onToggle: (self) => {
            if (self.isActive) {
              this.activeMonth = parseInt(element.getAttribute('data-month'));
            }
          },
        },
      });
    },
    scrollToMonth(month) {
      const locomotive = this.$refs.scroller.locomotive;
      const target = locomotive.el.querySelector('[data-month="' + month + '"]');
      const offset = -parseInt(window.getComputedStyle(document.querySelector('.horizontal-page__content .horizontal'), null).getPropertyValue('padding-left'));
      locomotive.scrollTo(target, { offset });
    },
    scrollToNextMatch() {
      let nextMatch = document.querySelector('.matches-list__item-wrapper[data-state="live"]');
      if (!nextMatch) {
        nextMatch = document.querySelector('.matches-list__item-wrapper[data-state="upcoming"]');
      }
      if (nextMatch) {
        const locomotive = this.$refs.scroller.locomotive;
        const offset = -parseInt(window.getComputedStyle(document.querySelector('.horizontal-page__content .horizontal'), null).getPropertyValue('padding-left'));
        locomotive.scrollTo(nextMatch, { offset });
      }
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style lang="scss">
.horizontal-page {
  @include media-breakpoint-down(md) {
    height: 100% !important;
  }
}

.matches-list {
  @include media-breakpoint-up(md) {
    .mobile {
      display: none !important;
    }
  }
  @include media-breakpoint-down(md) {
    width: 100%;
    height: auto !important;
    //z-index: 0;

    .desktop {
      display: none !important;
    }
  }
  &__nav {
    @include abs-position(rem(60), rem(60), auto, $left-offset);
    width: calc(100vw - #{rem(90)} - #{$left-offset});
    //z-index: 1;

    @include media-breakpoint-down(md) {
      position: sticky;
      top: $mobile-header-height;
      left: 0;
      width: 100vw;
      background-color: $gray-scale-500;
      padding: rem(8) rem(22);
    }
  }
  .season-text {
    font-weight: 700;
  }

  &__nav-icon {
    height: rem(18);
    max-width: rem(18);
    cursor: pointer;

    &.trophy {
      max-width: rem(50);
      height: rem(50);
    }

    @include media-breakpoint-down(md) {
      width: rem(24);
      height: rem(24) !important;
    }
  }

  &__months {
    @include abs-position(auto, auto, rem(30), 100vw);
    height: rem(50);
    background-color: $gray-scale-500;
    border-radius: rem(12);
    padding: 0 rem(16);
    transform: translateX(calc(-100% - #{rem(92)}));

    @include media-breakpoint-down(md) {
      display: none !important;
    }

    .month {
      position: relative;
      display: flex;
      align-items: center;

      &.active {
        color: $accent-primary;
      }
    }

    .scroller {
      background-color: $gray-scale-500;
      border: 1px solid $accent-primary;
      border-radius: rem(12);
      height: rem(64);
      width: rem(64);
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
  }

  &__item-wrapper {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding: 0 rem(24);
      margin-top: rem(32);

      &:last-child {
        margin-bottom: rem(30);
      }
    }
    &:last-child {
      .match-card {
        margin-right: 0;
      }
    }
  }

  #season-select {
    border-width: 0 !important;

    .vs__dropdown-toggle {
      border-width: 0 !important;
    }

    .vs__selected {
      position: relative !important;
      margin-top: 0;
      background-color: transparent !important;
      border-color: transparent !important;
    }

    .vs__search {
      display: none;
    }

    .vs__open-indicator {
      fill: $label-primary;
    }

    .vs__actions {
      padding-top: 2px;
    }
  }

  .horizontal {
    padding-left: $left-offset;
    //padding-right: calc(100vw - #{$left-offset} - #{rem(360)});
    padding-right: rem(328);
    height: 100vh;
    display: flex;

    @include media-breakpoint-down(md) {
      width: 100vw;
      height: auto;
      padding-left: 0 !important;
      padding-right: 0 !important;
      display: block !important;
      padding-bottom: rem(236);
    }
  }
}
</style>
