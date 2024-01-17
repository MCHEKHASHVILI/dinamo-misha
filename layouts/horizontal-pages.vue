<template>
  <main class="horizontal-page d-flex justify-content-between">
    <Loader v-if="!websiteLoaded" />
    <div class="horizontal-page__navigation position-sticky z-index-1">
      <LeftNavigationMenu />
    </div>
    <div class="horizontal-page__content">
      <Nuxt />
    </div>
  </main>
</template>

<!--<template>-->
<!--  <main class="horizontal-page d-flex">-->
<!--    <Nuxt />-->
<!--  </main>-->
<!--</template>-->

<script>
import { mapState } from 'vuex';
import LeftNavigationMenu from '../components/left-navigation-menu/LeftNavigationMenu';
import Loader from '../components/Loader';
export default {
  name: 'HorizontalPagesLayout',
  components: { Loader, LeftNavigationMenu },
  computed: { ...mapState('app', { websiteLoaded: (state) => state.websiteLoaded }) },
  watch: {
    '$i18n.locale': {
      handler(to) {
        this.$moment.locale(to);
      },
      immediate: true,
    },
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });

    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        ...i18nHead.htmlAttrs,
      },
    };
  },
};
</script>

<style lang="scss">
//html {
//  @include media-breakpoint-down(md) {
//    font-size: 16px;
//  }
//}
.horizontal-page {
  @include media-breakpoint-down(sm) {
    padding-top: rem(80);
  }

  &__navigation {
    position: fixed !important;
    top: 0;
    height: 100vh;
    z-index: 2;

    @include media-breakpoint-down(md) {
      width: 100%;
      height: rem(80);
    }
  }
  &__content {
    // width: calc(100% - #{rem(240)});
    //padding-left: rem(240);
    //max-width: calc(100vw - 15rem);
    //flex: 1;
    width: 100%;
    @include media-breakpoint-down(md) {
      //padding-top: rem(80);
    }
  }
}

@include media-breakpoint-down(md) {
  .horizontal-page__content {
    padding-left: 0;

    @include media-breakpoint-up(md) {
      top: rem(72);
    }

    .horizontal {
      padding-left: 0;
    }
  }
}
</style>
