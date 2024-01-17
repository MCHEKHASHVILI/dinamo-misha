<template>
  <div>
    <LocomotiveScroll
      ref="scroller"
      :getted-options="{
        direction: 'vertical',
        smooth: true,
        smartphone: {
          smooth: false,
          direction: 'vertical',
        },
        tablet: {
          smooth: true,
          direction: 'vertical',
        },
      }"
    >
      <!--      <section data-scroll-trigger class="horizontal">-->
      <!--        <div class="pin-wrap">-->
      <!--          <div class="animation-wrap to-right">-->
      <!--            <div class="item">-->
      <!--              <FirstSteps-->
      <!--                class="left-offset bg-color-gray-scale-500"-->
      <!--                :data="{-->
      <!--                  title: data.first_step_title,-->
      <!--                  description: data.first_step_description,-->
      <!--                  image: data.first_step_image,-->
      <!--                  name: data.first_step_name,-->
      <!--                }"-->
      <!--              />-->
      <!--              <FirstTeamHorizontal-->
      <!--                :data="{-->
      <!--                  title: data.first_team_title,-->
      <!--                  description: data.first_team_description,-->
      <!--                  players_names: data.first_team_players_names,-->
      <!--                  image: data.first_team_image,-->
      <!--                }"-->
      <!--              />-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </section>-->
      <!--      <section class="blank">-->
      <!--        &lt;!&ndash;        <FirstTeam :data="data.first_team_players" />&ndash;&gt;-->
      <!--      </section>-->

      <section data-scroll-trigger class="horizontal">
        <div class="pin-wrap">
          <div class="animation-wrap to-right">
            <div class="item">
              <FirstSteps
                class="left-offset bg-color-gray-scale-500"
                :data="{
                  title: data.first_step_title,
                  description: data.first_step_description,
                  image: data.first_step_image,
                  name: data.first_step_name,
                }"
              />
              <FirstTeamHorizontal
                :data="{
                  title: data.first_team_title,
                  description: data.first_team_description,
                  players_names: data.first_team_players_names,
                  image: data.first_team_image,
                }"
              />
              <WorldWar :data="{ title: data.world_war_title, description: data.world_war_description }" />
              <RenewedChampionship
                :data="{
                  title: data.renewed_championship_title,
                  image: data.renewed_championship_image,
                  description: data.renewed_championship_description,
                }"
              />
              <AfterWorldWar
                :data="{
                  title: data.after_world_war_title,
                  description: data.after_world_war_description,
                  images: data.after_world_war_images,
                }"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="blank">
        <Prizes
          :data="{
            prizes_title: data.after_world_war_prizes_title,
            prizes_description: data.after_world_war_prizes_description,
            prizes: data.after_world_war_prizes,
            georgian_prizes_description: data.after_world_war_georgian_prizes_description,
            georgian_prizes_title: data.after_world_war_georgian_prizes_title,
            georgian_prizes: data.after_world_war_georgian_prizes,
          }"
        />
      </section>

      <section data-scroll-trigger class="horizontal">
        <div class="pin-wrap">
          <div class="animation-wrap to-right">
            <div class="item">
              <GreatestTeam
                :data="{
                  title: data.greatest_team_title,
                  description: data.greatest_team_description,
                }"
              />
              <NoSuccessHistory
                :data="{
                  title: data['80_history_title'],
                  description: data['80_history_description'],
                  stories: data['80_history_stories'],
                }"
              />
              <Ussr :title="data.collapsing_ussr_title" />
              <ComeBack
                :data="{
                  title: data.after_ussr_title,
                  description: data.after_ussr_description,
                  image: data.after_ussr_image,
                }"
              />
              <GeorgianChampionship
                :data="{
                  title: data.rebuilding_georgian_championship_title,
                  description: data.rebuilding_georgian_championship_description,
                  gallery: data.rebuilding_georgian_championship_stories,
                }"
              />
              <DebutChampionsLeague
                :data="{
                  title: data.debut_in_champions_league_title,
                  description: data.debut_in_champions_league_description,
                  gallery: data.debut_in_champions_league_gallery,
                }"
              />
              <Continued
                :data="{
                  title: data.to_be_continued_title,
                  description: data.to_be_continued_description,
                }"
              />
            </div>
          </div>
        </div>
      </section>
    </LocomotiveScroll>
    <NextPage :data="{ name: 'team', title: $t('pages.team') }" />
    <!--    <SoundButton class="history-sound-button" icon-only audio-src="/audio/game_sound.mp3" />-->
  </div>
</template>

<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// /import SoundButton from '../../components/common/SoundButton';
import metaTagsMixin from '../../mixins/meta-tags-mixin';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'History',
  layout: 'horizontal-pages',
  mixins: [metaTagsMixin],
  // components: { SoundButton },
  async asyncData({ $axios }) {
    const dataPromise = await $axios.$get('/about');

    const [data] = await Promise.all([dataPromise]);

    return { data: data.about, metaTags: data.meta_tags };
  },
  mounted() {
    this.initScrolltrigger();
    // this.$refs.scroller.locomotive.update();

    this.$nextTick(() => {
      const elements = document.querySelectorAll('[data-scroll-trigger]');
      elements.forEach((element, index) => this.elementAnimation(element, index));
      this.$refs.scroller.locomotive.update();

      // setTimeout(() => {
      //   this.$refs.scroller.locomotive.update();
      // }, 1000);
    });
  },
  methods: {
    initScrolltrigger() {
      const locomotive = this.$refs.scroller.locomotive;
      locomotive.on('scroll', () => ScrollTrigger.update());

      // locomotive.setPosition(0, 0);
      // locomotive.track.xAxis.element.remove();
      ScrollTrigger.scrollerProxy(locomotive.el, {
        scrollTop(value) {
          return arguments.length ? locomotive.scrollTo(value, 0, 0) : locomotive.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });
    },
    elementAnimation(element, index) {
      const thisPinWrap = element.querySelector('.pin-wrap');
      const thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

      const getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

      ScrollTrigger.matchMedia({
        '(min-width: 800px)': () => {
          gsap.fromTo(
            thisAnimWrap,
            {
              x: () => {
                return thisAnimWrap.classList.contains('to-right') ? 0 : getToValue();
              },
              // backgroundColor: this.color[index - 1] ? this.color[index - 1] : 'red',
            },
            {
              x: () => {
                return thisAnimWrap.classList.contains('to-right') ? getToValue() : 0;
              },
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                pinType: 'transform',
                scroller: this.$refs.scroller.locomotive.el,
                start: 'top top',
                end: () => '+=' + thisAnimWrap.scrollWidth,
                pin: thisPinWrap,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                scrub: true,
              },
              // backgroundColor: this.color[index],
            }
          );
        },
      });
    },
  },
};
</script>

<style lang="scss">
section.horizontal {
  overflow-x: hidden;

  .left-offset {
    @include media-breakpoint-down(md) {
      padding-left: 0;
    }
  }
}

section.horizontal .pin-wrap,
section.horizontal .animation-wrap {
  @include media-breakpoint-up(md) {
    display: flex;
    position: relative;
    z-index: 1;
    height: 100vh;
  }
}

section.horizontal .item {
  // flex: 1;

  @include media-breakpoint-up(md) {
    height: 100vh;
    display: flex;
  }
}

section.horizontal .animation-wrap.to-right {
  @include media-breakpoint-up(md) {
    counter-reset: item;
    float: left;
  }
}

section.horizontal .animation-wrap.to-left {
  @include media-breakpoint-up(md) {
    counter-reset: item 11;
    float: right;
  }
}

.history-sound-button {
  position: fixed;
  bottom: rem(32);
  right: 28.82%;
  z-index: 1;

  @include media-breakpoint-down(md) {
    bottom: rem(32);
    right: rem(15);
  }
}
</style>
