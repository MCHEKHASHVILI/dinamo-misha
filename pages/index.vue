<template>
  <div class="bg-color-gray-scale-500">
    <div class="main-page w-100 h-100 overflow-hidden position-relative">
      <div class="main-page__content position-relative w-100 h-100 d-flex flex-wrap justify-content-between align-items-start align-content-between">
        <HomeHeader />
        <ClientOnly>
          <HomeFooter :available-locales="availableLocales" :frontpage="frontpage" :audio="audio" class="d-none d-md-flex" />
        </ClientOnly>
      </div>
      <div ref="animation" class="w-100 bg-cover position-absolute main-page__lottie-wrapper">
        <!--      <div class="desktop w-100 bg-cover" :style="`background-image: url(/illustrations/match-day.jpg)`">-->
        <div class="desktop">
          <div id="scene">
            <div data-depth="0.2" class="w-100 bg-cover" :style="`background-image: url(/illustrations/main-illustration.svg)`">
              <HomeMappedSvg />
              <HomeSponsors v-if="frontpage.sponsors" :sponsors="frontpage.sponsors" />
              <HomeMonitor :data="frontpage" />
              <Lottie :options="defaultOptions" :anim-created="handleAnimation" />
            </div>
          </div>
        </div>
        <!--      <div class="mobile position-absolute w-100 h-100" style="top: 0; left: 0">-->
        <!--        <HomeMappedSvg />-->
        <!--        <HomeSponsors />-->
        <!--        <div class="lottie-animation position-absolute w-100 h-100 bg-contain" :style="`background-image: url(/illustrations/match-day.jpg)`">-->
        <!--          <Lottie :options="defaultOptions" :anim-created="handleAnimation" />-->
        <!--        </div>-->
        <!--      </div>-->
        <div class="fullscreen mobile d-flex align-items-center position-absolute" @click="$refs.arena.classList.add('full')">
          <p class="font-regular font-size-14 line-height-1-6 color-label-secondary">{{ $t('front_page.open_arena') }}</p>
          <SvgIcon name="fullscreen" class="fullscreen__icon ml-2" />
        </div>
      </div>
      <div class="nav-menu mobile bg-white">
        <div v-for="(route, i) in horizontalPageRoutes" :key="i" class="nav-menu__item">
          <NuxtLink
            exact
            :to="localePath({ name: route.name })"
            :class="{ 'exact-active-link': subIsActive(localePath({ name: route.name })) }"
            class="nav-menu__item-link d-flex flex-column align-items-center font-size-15 font-size-14-md font-semi-bold text-capitalize text-decoration-none color-label-secondary"
          >
            <ClientOnly>
              <component :is="iconName(route.name)" class="nav-menu__svg-icon" :class="{ active: route.active }"></component>
              <span class="nav-menu__item-text">
                {{ $t(`pages.${route.name}`) }}
              </span>
            </ClientOnly>
          </NuxtLink>
        </div>
        <div class="nav-menu__item">
          <div class="academy">
            <SvgIcon name="right-arrow" class="academy__icon" />
          </div>
          <span class="nav-menu__item-text font-regular color-label-secondary font-size-14-md">{{ $t('academy.join_academy') }}</span>
        </div>
        <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" class="nav-menu__lang w-100 font-regular color-label-secondary font-size-14 text-decoration-none mb-16 d-flex align-items-center pt-8 pb-8 justify-content-center">
          <SvgIcon name="lang-icon" class="nav-menu__lang-icon mr-4" />
          <span class="nav-menu__lang-text">{{ locale.name }}</span>
        </NuxtLink>
        <a href="https://holar.io/" target="_blank" class="font-size-16 font-semi-bold font-color-label-secondary text-decoration-none mx-auto my-2 d-inline-block">Coded by holar</a>
      </div>
      <div ref="arena" class="panzoom-wrapper mobile">
        <div class="panzoom-container">
          <div id="custom-panzoom" class="main-page__zoom-container bg-contain position-relative" style="background-image: url(/illustrations/main-illustration.svg)">
            <HomeMappedSvg />
            <HomeSponsors v-if="frontpage.sponsors" :sponsors="frontpage.sponsors" />
            <HomeMonitor :data="frontpage" />
            <Lottie :options="defaultOptions" :anim-created="handleAnimation" />
          </div>
        </div>
        <div class="close position-absolute d-flex justify-content-center align-items-center" @click="$refs.arena.classList.remove('full')">
          <SvgIcon name="close-black" class="close__icon" />
        </div>
        <div class="sound-button w-100">
          <SoundButton :audio-src="audio" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parallax from 'parallax-js';
import * as trainingData from 'assets/lottie/training.json';
import * as matchDayData from 'assets/lottie/match-day.json';

import Lottie from '../components/Lottie';
import HomeFooter from '../components/home/HomeFooter';
import SoundButton from '../components/common/SoundButton';
import HomeHeader from '../components/home/HomeHeader';
import NewsIcon from '../components/left-navigation-menu/icons/NewsIcon';
import StatsIcon from '../components/left-navigation-menu/icons/StatsIcon';
import AcademyIcon from '../components/left-navigation-menu/icons/AcademyIcon';
import HistoryIcon from '../components/left-navigation-menu/icons/HistoryIcon';
import TeamIcon from '../components/left-navigation-menu/icons/TeamIcon';

export default {
  name: 'Home',
  components: { HomeFooter, HomeHeader, Lottie, TeamGeneralIcon: TeamIcon, HistoryIcon, AcademyIcon, StatsIcon, NewsIcon, SoundButton },
  async asyncData({ $axios, $context }) {
    const data = await $axios
      .$get('/frontpage')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const isMatchDay = data.frontpage?.game_data?.match_date === today;
    const animationData = isMatchDay ? matchDayData : trainingData;

    return { frontpage: data.frontpage, metaTags: data.meta_tags, defaultOptions: { animationData } };
  },

  data() {
    return {
      defaultOptions: { matchDayData },
      animationSpeed: 1,
      anim: null,
      horizontalPageRoutes: [
        { name: 'team/general', active: false },
        { name: 'academy', active: false },
        { name: 'news', active: false },
        { name: 'stats', active: false },
        { name: 'history', active: false },
      ],
      screenWidth: 0,
      screenHeight: 0,
    };
  },
  computed: {
    panZoomOptions() {
      return { initialX: this.screenWidth * 0.5, initialY: this.screenHeight * 0.5, initialZoom: 3.5, minZoom: 3.5, maxZoom: 5, bounds: true, boundsPadding: 1 };
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    audio() {
      return `/audio/${this.frontpage.is_game_day ? 'game' : 'training'}_sound.mp3`;
    },
  },
  mounted() {
    if (window.innerWidth > 992) {
      const scene = document.getElementById('scene');
      // eslint-disable-next-line no-new
      new Parallax(scene, {
        pointerEvents: true,
      });
    }
  },
  beforeMount() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    },
    iconName: (iconName) => (iconName.includes('/') ? iconName.replace('/', '-') + '-icon' : iconName + '-icon'),
  },
  head() {
    return {
      script: [
        {
          hid: 'stripe',
          src: '/modules/panzoom.js',
          defer: true,
          callback: () => {
            const options = { initialX: screen.width * 0.5, initialY: screen.height * 0.15, initialZoom: 3.5, minZoom: 3.5, maxZoom: 5, bounds: true, boundsPadding: 1 };
            // eslint-disable-next-line
            panzoom(document.querySelector('#custom-panzoom'), options);
          },
        },
      ],
      title: this.metaTags.og_title || 'WPC Dinamo Tbilisi',
      meta: [
        { hid: 'description', name: 'description', content: this.metaTags.og_description || '' },
        { hid: 'og:title', name: 'og:title', content: this.metaTags.og_title || '' },
        { hid: 'og:description', name: 'og:description', content: this.metaTags.og_description || '' },
        { hid: 'og:image', name: 'og:image', content: this.metaTags.og_image || '' },
      ],
    };
  },
};
</script>

<style lang="scss">
.main-page {
  height: 100vh !important;
  overflow: hidden;
  //max-width: 1920px;
  //margin: auto;
  @include media-breakpoint-down(md) {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: auto !important;
  }

  .desktop {
    top: 50%;
    transform: translateY(-46%);
    position: relative;
    @include media-breakpoint-down(md) {
      position: absolute;
      transform: translateY(-50%);
    }
  }

  .mobile {
    @include media-breakpoint-up(md) {
      display: none !important;
    }
  }

  &__zoom-container {
    z-index: 0;
  }

  .vue-pan-zoom-scene {
    height: 100vh;
  }

  .panzoom-wrapper {
    //display: none;
    background-color: $gray-scale-500;
    opacity: 0;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    &.full {
      display: block;
      position: fixed;
      opacity: 1;
      visibility: visible;
    }

    .panzoom-container {
      width: 100%;
      height: 100%;
    }

    .close {
      top: rem(20);
      right: rem(24);
      width: rem(40);
      height: rem(40);
      border-radius: 50%;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
      background-color: #fff;
      z-index: 10;

      &__icon {
        width: rem(16);
        height: rem(16);
      }
    }

    .lottie-animation {
      width: 100vw !important;
      height: 100% !important;
      @include media-breakpoint-down(md) {
        height: auto !important;
      }
    }

    .sound-button {
      position: fixed;
      left: 0;
      bottom: rem(48);
      padding: 0 rem(24);
    }
  }

  &__lottie-wrapper {
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100vh;

    @include media-breakpoint-down(md) {
      position: relative !important;
      height: 0;
      padding-top: 64.17%;
      background-position: 50% 50%;
      z-index: 0;
    }
  }

  .lottie-animation {
    top: 0;
    left: 0;
    background-position: 50% 38%;

    @include media-breakpoint-down(md) {
      background-size: contain !important;
      background-position: center;
      background-color: #eff3f6;
    }
  }

  .fullscreen {
    right: rem(22);
    bottom: rem(22);
    &__icon {
      width: rem(16);
      height: rem(16);
    }

    p {
      line-height: 100%;
      @include media-breakpoint-down(md) {
        font-weight: 700;
      }
    }
  }

  &__content {
    padding: rem(30) rem(32);
    flex-basis: 50%;

    @include media-breakpoint-up(md) {
      z-index: 1;
      pointer-events: none;
    }

    @include media-breakpoint-down(md) {
      height: auto !important;
      flex-basis: auto;
      padding: rem(16) rem(24);
      background: $white;
    }

    .base-button {
      // width: rem(180);
      &__text {
        transition: all 0.3s ease;
        visibility: visible;
        opacity: 1;
      }

      &__icon {
        fill: $label-white;
        width: rem(15);
        height: rem(13);
      }
    }
  }

  .nav-menu {
    flex: 1;
    width: 100%;
    padding: rem(24) rem(24);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &__lang-text {
      @include media-breakpoint-down(md) {
        font-weight: 700;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      margin-top: rem(24);
      margin-bottom: rem(24);
      flex-basis: 50%;

      .nav-menu__item-link {
        display: inline-flex !important;
        margin: 0 auto;

        @include media-breakpoint-down(md) {
          color: $label-primary;
          font-weight: 700;
        }
      }

      .academy {
        background-color: $accent-primary;
        width: rem(64);
        height: rem(64);
        margin: 0 auto;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 !important;

        &__icon {
          width: rem(16);
          height: rem(16);
          fill: white;
        }
      }
    }

    &__item-text {
      display: block;
      text-align: center;
      margin-top: rem(20);

      @include media-breakpoint-down(md) {
        color: $label-primary;
        font-weight: 700;
      }
    }

    &__svg-icon {
      width: rem(64);
      height: rem(64);
    }

    &__item-link {
      transition: color 0.2s ease;
      &.active-link,
      &:hover {
        color: $label-primary;
      }

      &:not(.exact-active-link) {
        .ep-svg-container {
          display: none;
        }
      }
    }
    &__lang {
      background-color: $gray-scale-500;
      border-radius: rem(12);
      margin: rem(24) 0;
    }
    &__lang-icon {
      width: rem(18);
      height: rem(18);

      @include media-breakpoint-down(md) {
        fill: $label-secondary;
      }
    }
  }
}
</style>
