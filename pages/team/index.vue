<template>
  <section class="w-100 h-100">
    <LocomotiveScroll ref="scroller" :getted-options="scrollOptions">
      <div class="team d-md-flex h-100 next-page-offset">
        <div class="gallery d-md-flex h-100 py-32" data-scroll-section data-scroll-trigger>
          <div v-for="(type, index) in types.filter((t) => t === getTypeFromRouteName())" :key="index" class="gallery d-md-flex h-100 py-32">
            <div class="gallery__text">
              <TextSection :text="team.titles[type]?.text" :title="team.titles[type]?.title" />
            </div>
            <TeamListItem v-for="item in chunkArray(players, 2, type)" :key="item[0].id" :data="item" />
          </div>
          <!-- // <div class="gallery__text">
          //   <TextSection :text="team.staff_text" :title="team.staff_title" />
          // </div>
          // <TeamListItem v-for="item in chunkArray(players, 2, true)" :key="item[0].id" :data="item" /> -->
        </div>
      </div>
    </LocomotiveScroll>
    <NextPage :data="{ name: 'team/youth', title: $t('pages.team/youth') }" />
  </section>
</template>

<script>
import metaTagsMixin from '../../mixins/meta-tags-mixin';
import TeamListItem from '../../components/team/TeamListItem';
import TextSection from '../../components/academy/TextSection.vue';
import NextPage from '../../components/common/NextPage.vue';

export default {
  name: 'Team',
  components: { TeamListItem, TextSection, NextPage },
  meta: {
    nested: false,
  },
  layout: 'horizontal-pages',
  mixins: [metaTagsMixin],
  async asyncData({ $axios }) {
    const data = await $axios.$get('/team');
    const types = ['team', 'young', 'management'];
    const titles = {
      team: { title: 'გუნდი', text: 'lorem ...' },
      youth: { title: 'ახალგაზრდული', text: 'lorem ...' },
      management: { title: 'მენეჯმენტი', text: 'lorem ...' },
    };
    data.players.map((player) => Object.assign(player, { type: types[Math.floor(Math.random() * types.length)] }));
    Object.assign(data.team, { titles: { ...titles } });
    return { team: data.team, metaTags: data.meta_tags, players: data.players, types };
  },
  data() {
    return {
      team: {},
      players: [],
      scrollOptions: {
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
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.scroller.locomotive.initPosition.x = 20;
      // this.$refs.scroller.locomotive.initPosition.y = 20;
      this.$refs.scroller.locomotive.update();
    });
  },
  methods: {
    chunkArray(array, chunkSize, type = false) {
      const newArray = [];
      // const mappedArray = array.filter((item) => isStaff === item.is_staff);
      const mappedArray = array.filter((item) => item.type === type);
      for (let i = 0; i < mappedArray.length; i += chunkSize) {
        const item = mappedArray.slice(i, chunkSize + i);

        newArray.push(item);
      }
      return newArray;
    },
    getTypeFromRouteName() {
      if (!this.$route.name.includes('/')) return this.$route.name.split('_')[0];
      return this.$route.name.split('/')[1].split('_')[0];
    },
  },
};
</script>

<style lang="scss">
.team {
  @include media-breakpoint-up(md) {
    padding-left: rem(240);
  }

  .rotate {
    transform: rotate(-4deg);
  }

  .gallery {
    display: flex;
    padding: rem(96) 9vw rem(96) 0;

    @media screen and (max-width: 1440px) {
      padding: rem(66) 8vw rem(66) 0;
    }

    @include media-breakpoint-down(md) {
      display: block;
      padding: 0 0 rem(60) !important;
      overflow: hidden;
    }
  }

  .gallery__text {
    margin: 0 rem(150);
    min-width: rem(200);
    max-width: rem(640);
    white-space: normal;

    .academy-text-section {
      min-width: rem(200) !important;
      max-width: rem(640) !important;
      width: auto !important;
    }

    @include media-breakpoint-down(md) {
      margin: rem(40) rem(24);
    }
  }

  @media screen and (min-width: 53em) {
    .frame {
      grid-template-areas: 'title demos demos links';
    }

    .frame__info {
      justify-self: end;
    }
  }

  .gallery__item-number {
    grid-area: gallery-number;
    font-size: 6rem;
    font-size: clamp(2.5rem, 9vw, 6.5rem);
    justify-self: end;
    padding-right: 2rem;
    color: var(--color-gallery-number);
  }

  .gallery__item-title {
    grid-area: gallery-title;
    margin: 0;
    font-size: clamp(2rem, 5vw, 4rem);
    color: var(--color-gallery-title);
  }

  .gallery__item-number,
  .gallery__item-title,
  .gallery__text {
    align-self: center;
  }

  .gallery__item-link {
    grid-area: gallery-link;
    align-self: end;
    font-size: 1.5rem;
    background: var(--color-gallery-link-bg);
    color: var(--color-gallery-link);
    text-decoration: underline;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .gallery__item-link:focus,
  .gallery__item-link:hover {
    background: var(--color-gallery-link-bg-hover);
    color: var(--color-gallery-link-hover);
    text-decoration: none;
  }

  .gallery__item-tags {
    grid-area: gallery-tags;
    justify-self: end;
    font-size: 1.5rem;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1rem;
    cursor: pointer;
  }

  .gallery__text-inner {
    display: block;
  }
}
</style>
