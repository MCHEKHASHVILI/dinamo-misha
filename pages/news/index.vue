<template>
  <section class="news-list w-100 h-100">
    <nav class="news-list__nav d-flex justify-content-between">
      <form ref="searchForm" class="d-flex align-items-center" @submit.prevent="onSearchSubmit">
        <SvgIcon name="search" class="news-list__search-icon mr-8 cursor-pointer desktop" @click="onSearchSubmit" />
        <SvgIcon name="search-mobile" class="news-list__search-icon mr-8 cursor-pointer mobile" @click="onSearchSubmit" />
        <input v-model="search" type="text" :placeholder="$t('news.search')" class="news-list__search-input font-semi-bold font-color-label-secondary font-size-18" />
      </form>
      <div class="d-flex align-items-center">
        <div class="d-flex align-items-center">
          <span class="sort-text font-semi-bold font-color-label-secondary font-size-18 mr-14">{{ $t('news.sort_by') }}:</span>
          <!--          <FilterNewsDropdown icon-name="calendar" class="mr-4">-->
          <!--            <BaseCheckbox v-for="year in [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028]" :key="year + '-news-year-checkbox'" v-model="selectedYears" checkmark-color="#183041" :custom-value="year" class="news-list__filter-checkbox" @input="filterNews(true)">-->
          <!--              {{ year }}-->
          <!--            </BaseCheckbox>-->
          <!--          </FilterNewsDropdown>-->
          <FilterNewsDropdown icon-name="filter">
            <BaseCheckbox v-for="category in categories" :key="category.term_taxonomy_id + '-news-category-checkbox'" v-model="selectedCategories" checkmark-color="#183041" :custom-value="category.term_taxonomy_id" class="news-list__filter-checkbox" @input="filterNews(true)">
              {{ category.name }}
            </BaseCheckbox>
          </FilterNewsDropdown>
        </div>
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
      <div class="horizontal d-flex">
        <div v-for="(item, index) in news" :key="index" class="news-list__item-wrapper d-flex flex-column justify-content-center" data-scroll-section data-scroll-trigger>
          <NuxtLink :to="localePath({ name: 'news/id/slug', params: { id: item.id, slug: item.slug } })" class="text-decoration-none"><NewsListItem :data="item" :reverse="index % 2 === 0" /></NuxtLink>
        </div>
      </div>
    </LocomotiveScroll>
    <NextPage :data="{ name: 'stats', title: $t('pages.stats') }" />
  </section>
</template>

<script>
import qs from 'qs';
import FilterNewsDropdown from '../../components/news/FilterNewsDropdown';
import BaseCheckbox from '../../components/common/BaseCheckbox';
import metaTagsMixin from '../../mixins/meta-tags-mixin';

const paged = 1;
const numberPosts = 12;
export default {
  name: 'News',
  components: { BaseCheckbox, FilterNewsDropdown },
  meta: {
    nested: false,
  },
  layout: 'horizontal-pages',
  mixins: [metaTagsMixin],
  async asyncData({ $axios }) {
    // category.term_taxonomy_id;

    const categoriesPromise = await $axios.$get('/categories');
    const categories = await Promise.resolve(categoriesPromise);

    const newsPromise = await $axios.$get('/news', {
      params: {
        numberposts: numberPosts,
        paged,
        // category: categories.map((category) => category.term_taxonomy_id),
      },
    });

    const news = await Promise.resolve(newsPromise);

    // const [news, categories] = await Promise.all([newsPromise, categoriesPromise]);

    return { news: news.news, totalPosts: news.total_posts, categories, paged: 2, metaTags: news.meta_tags };
  },
  data() {
    return {
      news: [],
      search: '',
      selectedCategories: [],
      selectedYears: [],
      paged,
      numberPosts,
      totalPosts: 0,
      loading: false,
      championships: [],
    };
  },
  // computed: {
  //   filteredNews() {
  //     if (this.selectedCategories.length > 0) {
  //       return this.news.filter((item) => {
  //         if (this.selectedCategories.includes(item.category)) {
  //           return item;
  //         }
  //       });
  //     }
  //
  //     return this.news;
  //   },
  // },
  mounted() {
    // setInterval(() => {
    //   this.$axios.$get('/news').then(({ news }) => {
    //     this.news = [...this.news, ...news];
    //   });
    //   locomotive.update();
    // }, 10000);
    const locomotive = this.$refs.scroller.locomotive;
    locomotive.on('scroll', (args) => {
      // const scrollProgress = (args.delta.x / args.limit.x) * 100;
      const height = document.documentElement.scrollHeight - 1.25 * document.documentElement.clientHeight;
      const scrollEnded = (args.delta && args.delta.x > 0 && args.delta.x === args.limit.x) || (args.scroll && args.scroll.y > 0 && args.scroll.y >= height);
      if (scrollEnded && !this.loading && this.totalPosts > this.numberPosts * (this.paged - 1)) {
        this.filterNews();
      }
      // if (typeof args.currentElements.hey === 'object') {
      // const progress = args.currentElements.hey.progress;
      // ouput log example: 0.34
      // gsap example : myGsapAnimation.progress(progress);
      // }
    });
  },
  methods: {
    onSearchSubmit() {
      this.filterNews(true);
    },
    async filterNews(reset = false) {
      this.loading = true;
      if (reset) {
        this.paged = 1;
      }
      const data = this.$axios.$get('/news', {
        params: {
          s: this.search,
          category: this.selectedCategories,
          years: this.selectedYears,
          numberposts: this.numberPosts,
          paged: this.paged,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });

      const { news } = await Promise.resolve(data);

      if (reset) {
        this.news = news;
      } else {
        this.news = [...this.news, ...news];
      }
      this.$nextTick(() => {
        this.$refs.scroller.locomotive.update();
        if (reset) {
          this.$refs.scroller.locomotive.scrollTo('top', { offset: 0, duration: 200 });
        }
        this.paged++;
        this.loading = false;
      });
    },
  },
  head() {
    return {
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.news.og_title || '' },
        { hid: 'og:title', name: 'og:title', content: this.news.og_description || '' },
        { hid: 'og:image', name: 'og:image', content: this.news.og_image || '' },
      ],
    };
  },
};
</script>

<style lang="scss">
.news-list {
  @include media-breakpoint-down(md) {
    z-index: 0;
    position: relative;
  }

  .desktop {
    display: block;
    @include media-breakpoint-down(md) {
      display: none;
    }
  }

  .mobile {
    display: none;
    @include media-breakpoint-down(md) {
      display: block;
    }
  }

  &__nav {
    @include abs-position(rem(60), rem(80), auto, $left-offset);
    width: calc(100vw - #{rem(90)} - #{$left-offset});
    z-index: 1;

    @include media-breakpoint-down(md) {
      position: sticky;
      width: 100%;
      padding: rem(8) rem(24) rem(7);
      background-color: $gray-scale-500;
      margin-bottom: rem(24);
      top: $mobile-header-height;
      right: auto;
      left: auto;
      box-sizing: border-box;
      .sort-text {
        display: none;
      }
    }
  }

  &__search-input {
    border: none;
    outline: none;
    &::placeholder {
      color: $label-tertiary;
    }

    @include media-breakpoint-down(md) {
      background-color: transparent;
      max-width: 50%;
    }
  }

  &__search-icon {
    height: rem(50);
    width: rem(50);

    &.mobile {
      height: rem(24);
      width: rem(24);
      margin-right: rem(8);
    }
  }

  &__filter-checkbox {
    &:not(:last-child) {
      margin-bottom: rem(20);
    }
  }

  &__item-wrapper {
    &:first-child {
      .news-list-image,
      .news-list-video {
        margin-left: 0;
      }
    }

    @include media-breakpoint-down(md) {
      display: block !important;
      padding: 0 rem(24) rem(32);
      width: 100%;
    }
  }

  .horizontal {
    padding-left: $left-offset;
    height: 100vh;
    display: flex;
    padding-right: rem(328);

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
