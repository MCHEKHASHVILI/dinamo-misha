<template>
  <nav ref="nav" class="left-nav-menu">
    <ul class="left-nav-menu_list p-0 m-0">
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
        <ul v-if="route.hasOwnProperty('children') && route.children.length" v-show="activeMenuDropDown(route.name)">
          <li v-for="child in route.children" :key="child.index">
            <NuxtLink exact :to="localePath({ name: child.name })" class="left-nav-menu__item-link d-flex align-items-center font-size-15 font-size-14-md font-semi-bold text-capitalize text-decoration-none color-label-secondary">
              <ClientOnly>
                <vue-ellipse-progress :progress="isFinite(progress) ? progress : 0" animation="default 0 0" :size="51" color="#183041" color-fill="transparent" empty-color="transparent" empty-color-fill="transparent" :thickness="2" class="d-flex">
                  <component :is="iconName(child.name)" class="left-nav-menu__svg-icon"></component>
                </vue-ellipse-progress>
                <span class="left-nav-menu__item-text">
                  {{ $t(`pages.${child.name}`) }}
                </span>
              </ClientOnly>
            </NuxtLink>
          </li>
        </ul>
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
export default {
  name: 'LeftNavigationMenuList',
  components: { TeamIcon, TeamYouthIcon: TeamIcon, TeamManagementIcon: TeamIcon, HistoryIcon, AcademyIcon, StatsIcon, NewsIcon },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      horizontalPageRoutes: [
        {
          name: 'team',
          active: false,
          children: [
            { name: 'team/youth', active: false },
            { name: 'team/management', active: false },
          ],
        },
        { name: 'academy', active: false },
        { name: 'news', active: false },
        { name: 'stats', active: false },
        { name: 'history', active: false },
      ],
    };
  },
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf('/' + path) === 0; // current path starts with this path string
      });
    },
    iconName: (iconName) => (iconName.includes('/') ? iconName?.replace('/', '-') + '-icon' : iconName + '-icon'),
    // .split('-')
    // .map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
    // .join() + 'Icon',
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
