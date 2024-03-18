<template>
  <nav ref="nav" class="left-nav-menu">
    <ul class="left-nav-menu_list p-0 m-0">
      <li class="left-nav-menu__item">
        <a href="#" class="w-100 left-nav-menu__item-link d-flex align-items-center font-size-15 font-size-14-md font-semi-bold text-capitalize text-decoration-none color-label-secondary" @click.prevent="toggleDropdown">
          <ClientOnly class="w-100 d-inline-flex justify-content-between">
            <vue-ellipse-progress :progress="isFinite(progress) ? progress : 0" animation="default 0 0" :size="51" color="#183041" color-fill="transparent" empty-color="transparent" empty-color-fill="transparent" :thickness="2" class="d-flex">
              <component :is="iconName('team')" class="left-nav-menu__svg-icon"></component>
            </vue-ellipse-progress>
            <span class="left-nav-menu__item-text">
              {{ $t('pages.team') }}
            </span>
            <span class="left-nav-menu__item-text flex-grow">
              <SvgIcon name="right-arrow" class="base-button__icon ml-16" :style="arrowStyle" />
            </span>
          </ClientOnly>
        </a>
        <ul v-if="expanded" class="left-nav-menu_list p-0 m-0">
          <li v-for="(route, i) in [{ name: 'team/management' }, { name: 'team/general' }, { name: 'team/young' }]" :key="i" class="left-nav-menu__item" style="margin-bottom: 1px">
            <NuxtLink :to="localePath({ name: route.name })" class="left-nav-menu__item-link d-flex align-items-center font-size-15 font-size-14-md font-semi-bold text-capitalize text-decoration-none color-label-secondary">
              <ClientOnly>
                <vue-ellipse-progress :progress="isFinite(progress) ? progress : 0" animation="default 0 0" :size="51" color="#183041" color-fill="transparent" empty-color="transparent" empty-color-fill="transparent" :thickness="2" class="d-flex">
                  <component :is="iconName(route.name)" class="left-nav-menu__svg-icon"></component>
                </vue-ellipse-progress>
                <span class="left-nav-menu__item-text">
                  {{ $t(`pages.${route.name}`) }}
                </span>
              </ClientOnly>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li v-for="(route, i) in horizontalPageRoutes" :key="i" class="left-nav-menu__item">
        <NuxtLink :to="localePath({ name: route.name })" class="left-nav-menu__item-link d-flex align-items-center font-size-15 font-size-14-md font-semi-bold text-capitalize text-decoration-none color-label-secondary">
          <ClientOnly>
            <vue-ellipse-progress :progress="isFinite(progress) ? progress : 0" animation="default 0 0" :size="51" color="#183041" color-fill="transparent" empty-color="transparent" empty-color-fill="transparent" :thickness="2" class="d-flex">
              <component :is="iconName(route.name)" class="left-nav-menu__svg-icon"></component>
            </vue-ellipse-progress>
            <span class="left-nav-menu__item-text">
              {{ $t(`pages.${route.name}`) }}
            </span>
          </ClientOnly>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script>
import NewsIcon from './icons/NewsIcon';
import StatsIcon from './icons/StatsIcon';
import AcademyIcon from './icons/AcademyIcon';
import HistoryIcon from './icons/HistoryIcon';
import TeamIcon from './icons/TeamIcon';
import ManagementIcon from './icons/ManagementIcon';
import YouthIcon from './icons/YouthIcon';
export default {
  name: 'LeftNavigationMenuList',
  components: { TeamIcon, TeamYoungIcon: YouthIcon, TeamGeneralIcon: YouthIcon, TeamManagementIcon: ManagementIcon, HistoryIcon, AcademyIcon, StatsIcon, NewsIcon },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      expanded: false,
      horizontalPageRoutes: [
        { name: 'academy', active: false },
        { name: 'news', active: false },
        { name: 'stats', active: false },
        { name: 'history', active: false },
      ],
    };
  },
  computed: {
    arrowStyle() {
      if (this.expanded) {
        return {
          fill: 'black',
          transform: 'rotate(90deg)',
        };
      } else {
        return {
          fill: 'black',
        };
      }
    },
  },
  mounted() {
    if (this.$route.name.includes('team')) {
      this.$data.expanded = true;
    }
  },
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf('/' + path) === 0; // current path starts with this path string
      });
    },
    iconName: (iconName) => (iconName.includes('/') ? iconName.replace('/', '-') + '-icon' : iconName + '-icon'),
    toggleDropdown() {
      this.expanded = !this.expanded;
    },
    activeMenuDropDown(name) {
      return !!this.$route.name.includes(name);
    },
  },
};
</script>
<style lang="scss">
.left-nav-menu {
  &__item {
    margin-bottom: rem(24);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item-text {
    max-width: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.15s ease;

    @include media-breakpoint-down(md) {
      max-width: rem(100);
      transform: translateX(#{rem(16)});
      opacity: 1;
      visibility: visible;
    }
  }

  &.active {
    .left-nav-menu__item-text {
      max-width: rem(100);
      transform: translateX(#{rem(16)});
      opacity: 1;
      visibility: visible;
      transition: all 0.2s ease, 0.4s;
    }
  }

  &__svg-icon {
    width: 45px;
    height: 45px;
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

  .ep-legend--value__counter {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
