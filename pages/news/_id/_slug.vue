<template>
  <article class="news-page-inner position-relative d-flex is-nested">
    <NewsGallery :images="data.image_gallery" @openFullGallery="showGallery = true"></NewsGallery>
    <div class="news-nested-wrapper">
      <div class="news-nested mx-auto pt-16 pb-48">
        <Breadcrumbs link-key="news" :parent="$t('news.news')" :child="$t('news.single_news')" />
        <article>
          <h2 class="news-title font-semi-bold font-size-38 font-size-30-md font-color-label-primary line-height-1-3 mb-16 mt-48">{{ data.title }}</h2>
          <div class="time-texts-wrapper d-flex align-items-center justify-content-between mt-14 mb-14">
            <div class="time-texts font-regular font-size-14 font-color-label-secondary d-flex">
              <div>{{ dateFormat(data.date) }}</div>
              <div class="news-list-item__read-time ml-18">{{ data.reading_time }} {{ $t('news.min_to_read') }}</div>
            </div>
            <div class="d-flex">
              <a :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`" target="_blank">
                <SvgIcon name="fb" class="news-nested__share-icon mr-12" />
              </a>
            </div>
          </div>
          <div class="post-content font-regular font-color-label-primary font-size-18 line-height-1-5 mb-48" v-html="data.content"></div>
          <div v-if="relatedPosts" class="">
            <div class="font-size-24 font-regular font-color-label-primary line-height-1-5 mb-10">{{ $t('common.continue_reading') }}</div>
            <div v-for="post in relatedPosts" :key="post.id" class="w-100 mb-8">
              <NuxtLink :to="localePath({ name: 'news/id/slug', params: { slug: post.slug, id: post.id } })" class="text-decoration-none">
                <RelatedNews :data="post" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
    <transition name="fade">
      <Gallery v-if="showGallery" :images="data.image_gallery" is-old :set-active-index="galleryImageActiveIndex" @close="showGallery = false" />
    </transition>
  </article>
</template>

<script>
import RelatedNews from '../../../components/news/RelatedNews';
import Breadcrumbs from '../../../components/Breadcrumbs';
import NewsGallery from '../../../components/news/NewsGallery.vue';
import Gallery from '../../../components/common/Gallery';

export default {
  name: 'NewsNested',
  meta: {
    nested: true,
  },
  components: { Gallery, Breadcrumbs, RelatedNews, NewsGallery },
  layout: 'horizontal-pages',
  async asyncData({ params, $axios }) {
    const data = await $axios.$get('/news/' + params.id);
    return { data: data.data, relatedPosts: data.related_posts };
  },
  data() {
    return {
      data: null,
      relatedPosts: null,
      galleryImageActiveIndex: 3,
      showGallery: false,
    };
  },
  computed: {
    url() {
      return `${process.env.baseUrl}/news/${this.$route.params.id}`;
    },
  },
  methods: {
    dateFormat(date) {
      return this.$moment(date).format('DD MMMM YYYY');
    },
  },
  head() {
    return {
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.data.og_title || '' },
        { hid: 'og:title', name: 'og:title', content: this.data.og_description || '' },
        { hid: 'og:image', name: 'og:image', content: this.data.og_image || '' },
      ],
    };
  },
};
</script>

<style lang="scss">
.news-page-inner {
  @include media-breakpoint-down(md) {
    width: 100%;
    flex-direction: column;
  }
}
.news-nested-wrapper {
  flex: 1;
}

.news-nested {
  width: 80%;

  @include media-breakpoint-down(md) {
    width: 100%;
    padding: 0 rem(24);
  }

  &__share-icon {
    width: 16px;
    height: 18px;
    transition: fill 0.2s ease;
    fill: $gray-scale-200;
    &:hover {
      fill: $accent-primary;
    }
  }

  .news-title {
    @include media-breakpoint-down(md) {
      margin-top: rem(32) !important;
      margin-bottom: rem(8) !important;

      & + div {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
    }
  }

  .time-texts-wrapper {
    .time-texts {
      div {
        font-weight: 700;
      }
    }
  }
}

.post-content {
  max-width: 100%;
  @include media-breakpoint-down(md) {
    margin-top: rem(16);
  }

  p {
    display: inline-block;
    margin: 16px 0;
    max-width: 100%;
  }

  strong {
    max-width: 100%;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    height: auto;
  }

  iframe {
    max-width: 100%;
  }

  video {
    max-width: 100% !important;
  }
}

.news-nested-aside {
  // @include abs-position(50%, rem(170), auto, auto);
  position: fixed;
  right: rem(170);
  top: 50%;
  transform: translateY(-50%);

  &__share-item {
    width: 42px;
    height: 42px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
}

.wp-embed-responsive .wp-block-embed .wp-block-embed__wrapper:before {
  position: relative;
}
</style>
