<template>
  <div>
    <div class="left-navigation-menu-mobile-header align-items-center justify-content-between">
      <NuxtLink :to="localePath({ name: 'index' })">
        <Logo class="left-navigation-menu-mobile-header__logo" />
      </NuxtLink>
      <div class="left-navigation-menu-mobile-header__burger-button d-flex align-items-center justify-content-center border-radius-50" @click="isActiveMobile = true">
        <SvgIcon name="burger" class="left-navigation-menu-mobile-header__burger-button__icon" />
      </div>
    </div>
    <div class="left-navigation-wrapper" :class="{ active: isActive, mobileActive: isActiveMobile }" @click="closeMobileMenu">
      <div class="close-navigation-button">
        <SvgIcon name="close-navigation" class="close-navigation-button__icon" />
      </div>
    </div>
    <div class="left-navigation-menu bg-color-gray-scale-600 d-flex flex-column justify-content-between" :class="{ active: isActive, 'position-absolute': isNested, mobileActive: isActiveMobile }" @mouseleave="closeMenu()" @mouseenter="openMenu()">
      <NuxtLink :to="localePath({ name: 'index' })">
        <Logo class="left-navigation-menu__logo" />
      </NuxtLink>
      <LeftNavigationMenuList :class="{ active: isActive }" :progress="getScrollXProgress || getScrollYProgress" />

      <div class="left-navigation-menu__lang mt-12 w-100 d-flex flex-column">
        <div v-if="socialLinks.length > 0" class="left-navigation-menu__social-links position-relative mb-12 pb-12 border-gray-scale-500 d-flex align-items-center justify-content-between">
          <div class="left-navigation-menu__social-links-container w-100 d-flex align-items-center justify-content-between">
            <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="">
              <SvgIcon :name="item.key" class="left-navigation-menu__social-icon"></SvgIcon>
            </a>
          </div>
          <SvgIcon name="more" class="left-navigation-menu__more-icons svg-fill-label-secondary" />
        </div>

        <NuxtLink v-for="locale in availableLocales" :key="locale.code" class="font-regular color-label-secondary font-size-14 text-decoration-none mb-16 d-flex align-items-center" :to="switchLocalePath(locale.code)">
          <SvgIcon name="lang-icon" class="left-navigation-menu__lang-icon mr-4 svg-fill-gray-scale-200" />
          <span class="left-navigation-menu__lang-text">{{ locale.name }}</span>
        </NuxtLink>
        <NuxtLink :to="localePath({ name: 'academy' })" class="w-100 text-decoration-none">
          <BaseButton class="d-flex justify-content-between d-flex align-items-center w-100">
            <span class="base-button__text">{{ $t('academy.academy') }}</span>
            <SvgIcon name="right-arrow" class="base-button__icon" />
          </BaseButton>
        </NuxtLink>
      </div>
      <div v-if="isNested" class="left-navigation-menu__y-track position-absolute">
        <div class="left-navigation-menu__y-track__fill position-absolute bg-color-accent-primary"></div>
        <div class="left-navigation-menu__y-track__progress bg-color-accent-primary" :style="{ height: yProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from '../Logo';
import BaseButton from '../common/BaseButton';
import LeftNavigationMenuList from './LeftNavigationMenuList';

export default {
  name: 'LeftNavigationMenu',
  components: { Logo, LeftNavigationMenuList, BaseButton },
  async fetch() {
    const data = await this.$axios
      .$get('/frontpage')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    this.frontpage = data.frontpage;
  },
  data() {
    return {
      frontpage: null,
      isNested: false,
      isActive: true,
      isActiveMobile: false,
      progress: 0,
      yProgress: 0,
    };
  },
  computed: {
    ...mapGetters('app', ['getScrollXProgress', 'getScrollYProgress']),
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    socialLinks() {
      const socialLinks = [];

      if (!this.frontpage) return socialLinks;

      ['tiktok', 'fb', 'youtube', 'instagram'].forEach((item) => {
        if (this.frontpage[item]) {
          socialLinks.push({
            key: item,
            link: this.frontpage[item],
          });
        }
      });

      return socialLinks;
    },
  },
  watch: {
    getScrollXProgress(to) {
      if (!this.isNested) this.isActive = to < 1;
    },
    getScrollYProgress(to) {
      if (!this.isNested) this.isActive = to < 1;
    },
    // getScrollYProgress(to) {
    //   this.yProgress = to;
    // },
    $route(to, from) {
      this.progressBarChecker(to.params);
      this.closeMobileMenu();
    },
  },
  created() {
    this.progressBarChecker(this.$route.params);
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    closeMobileMenu() {
      this.isActiveMobile = false;
    },
    progressBarChecker(params) {
      let x = 0;

      if (params.id || params.slug) {
        this.isNested = true;
        this.closeMenu();
        x = 1;
      } else {
        this.isNested = false;
        this.openMenu();
      }

      this.$store.commit('app/setScroll', {
        isScrolling: true,
        limit: { x, y: 0 },
        x,
        y: 0,
      });
    },
    closeMenu() {
      if (this.getScrollXProgress > 1 || this.getScrollYProgress > 1 || this.isNested) {
        this.isActive = false;
      }
    },
    openMenu() {
      this.isActive = true;
    },
    handleScroll() {
      this.yProgress = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    },
  },
};
</script>

<style lang="scss">
$horizontal-box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);

.left-navigation-wrapper {
  display: none;
  @include media-breakpoint-down(md) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
    touch-action: none;
    &.mobileActive {
      opacity: 1;
      pointer-events: all;
      touch-action: all;
    }
    .close-navigation-button {
      display: block;
      position: absolute;
      top: rem(20);
      right: rem(20);
      padding: rem(15);
      &__icon {
        width: rem(16);
        height: rem(16);
      }
    }
  }
}

.left-navigation-menu-mobile-header {
  box-shadow: $horizontal-box-shadow;

  @include media-breakpoint-up(md) {
    display: none !important;
  }
  display: flex;
  background-color: white;
  width: 100vw;
  height: $mobile-header-height;
  padding: rem(16) rem(24) rem(18);
  &__burger-button {
    width: rem(40);
    height: rem(40);
    box-shadow: 0px 0px rem(16) rgba(0, 0, 0, 0.08);
    &__icon {
      width: rem(14);
      height: rem(12);
    }
  }
  &__logo {
    width: rem(114);
    height: rem(46);
  }
}

.left-navigation-menu {
  left: 0;
  top: 0;
  width: rem(122);
  height: 100vh;
  box-shadow: $horizontal-box-shadow;
  padding: rem(24) rem(31) rem(32);
  @include media-breakpoint-down(md) {
    position: relative;
  }

  @media screen and (max-width: 1440px) {
    padding: rem(24) rem(28) rem(32);
  }

  @include media-breakpoint-down(md) {
    transition: transform 0.3s ease;
    position: fixed !important;
    transform: translateX(calc(-100% - 1px));
    width: rem(240);
    pointer-events: none;
  }

  transition: width 0.3s ease;
  z-index: 1;
  &.active {
    width: rem(240);
    // min-width: rem(240);

    .base-button {
      border-radius: 12px !important;
      width: 100% !important;
      &__text {
        max-width: rem(100);
        visibility: visible;
        opacity: 1;
      }
    }

    .left-navigation-menu__lang-text {
      visibility: visible;
      opacity: 1;
      max-width: 100px;
    }

    .left-navigation-menu__lang-icon {
      transform: translateX(0);
    }

    .logo-full-content {
      visibility: visible;
      opacity: 1;
    }

    .left-navigation-menu__social-links-container {
      opacity: 1;
      visibility: visible;
    }

    .left-navigation-menu__more-icons {
      opacity: 0;
      visibility: hidden;
    }
  }

  &.mobileActive {
    @include media-breakpoint-down(md) {
      transform: translateX(0);
      pointer-events: all;

      .base-button {
        width: 100% !important;
        border-radius: 12px !important;

        &__text {
          max-width: rem(100);
          visibility: visible;
          opacity: 1;
        }
      }

      .left-navigation-menu__lang-text {
        visibility: visible;
        opacity: 1;
        max-width: 100px;
      }

      .left-navigation-menu__lang-icon {
        transform: translateX(0);
      }

      .logo-full-content {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  &__lang {
    margin-top: rem(16) !important;
  }

  &__logo {
    width: rem(130);
    height: rem(54);

    @include media-breakpoint-down(md) {
      width: rem(110);
      height: auto;
    }
  }

  .logo-full-content {
    transition: all 0.2s ease;
    visibility: hidden;
    opacity: 0;
  }

  .base-button {
    border-radius: 18px / 18px !important;
    width: rem(50) !important;
    &__text {
      transition: all 0.3s ease;
      visibility: hidden;
      opacity: 0;
      max-width: 0;
    }

    &__icon {
      fill: $label-white;
      width: rem(17);
      height: rem(14);
    }
  }

  &__lang-icon {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
    transform: translateX(#{rem(17)});
  }

  &__lang-text {
    transition: all 0.2s ease;
    visibility: hidden;
    opacity: 0;
    max-width: 0;
  }

  &__y-track {
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;

    &__fill {
      opacity: 0.2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__progress {
      width: 100%;
      height: 0;
      transform-origin: 0 center;
      transition: transform 0.5s ease-in-out;
    }
  }

  &__social-links {
    border-bottom: 1px solid $gray-scale-500;
  }

  &__social-links-container {
    opacity: 0;
    visibility: hidden;
    transition: 0.15s all ease;
  }

  &__social-icon {
    fill: $label-secondary;
    max-width: 16px;
    max-height: 16px;
    transition: 0.15s all ease;

    &:hover {
      fill: $accent-primary;
    }
  }

  &__more-icons {
    @include abs-position(0, 0, 0, 50%);
    transform: translateX(-50%);

    width: 20px;
    height: 15px;
    opacity: 1;
    visibility: visible;
    transition: 0.15s all ease;
  }
}
</style>
