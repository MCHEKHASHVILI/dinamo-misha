<template>
  <section class="academy position-relative w-100 h-100">
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
        <div data-scroll-section class="academy__section d-flex align-items-center" style="min-width: 1250px">
          <div class="d-flex flex-column">
            <TextSection :title="academy.title" :text="academy.description"></TextSection>
            <a href="#" target="_blank" class="text-decoration-none" @click.prevent="showAcademyFormModal = true">
              <BaseButtonGrey class="w-auto d-flex px-12 py-8 ml-12 ml-md-0 font-semi-bold text-section-button justify-content-between align-items-center">
                <span class="base-button__text font-color-accent-primary">{{ $t('academy.join_academy') }}</span>
                <SvgIcon name="right-arrow" class="base-button__icon ml-8" />
              </BaseButtonGrey>
            </a>
          </div>
          <img :src="academy.main_image" class="academy__image-1 object-fit-cover border-radius-xl" :alt="academy.title" />
        </div>
        <div data-scroll-section class="academy__section">
          <div data-scroll-trigger class="h-100">
            <div class="vertical-scroll age-groups">
              <VerticalTextSection v-for="(item, index) in academy.features" :key="index + 'vertical-text-section'" :data="item" class="mb-48" />
              <!--<div class="pagination">
                <div v-for="item in 3" :key="item + '-pagination-academy-age'" class="dot" :class="activeAgeGroup === item - 1 ? 'active' : ''"></div>
              </div>-->
            </div>
          </div>
        </div>
        <div data-scroll-section class="academy__section academy__images d-flex align-items-center">
          <div v-for="(video, index) in academy.videos" :key="`${index}-academy-video-item`" :class="[`academy__images__part-${index + 1} position-relative d-flex align-items-end border-radius-xl`, { 'cursor-pointer': video.video_id }]" @click="openVideo(video.video_id)">
            <img :src="video.cover_image" class="object-fit-cover w-100 h-100" />
            <div v-if="video.video_id" class="academy__section__video-play-icon-container ml-4 mb-4">
              <SvgIcon name="video-play-icon" class="academy__section__video-play-icon" />
            </div>
          </div>
        </div>
        <div data-scroll-section class="academy__section d-flex align-items-center">
          <div data-scroll-trigger class="h-100 d-flex">
            <TextSection class="align-self-center" :title="academy.packages_title" :text="academy.packages_description"></TextSection>
            <div class="rectangle-wrapper position-relative vertical-scroll">
              <div class="scroll-hider packages">
                <AcademyPackage v-for="(item, index) in academy.packages" :key="index + 'academy-package'" :data="item" />
                <!--<div class="pagination">
                  <div v-for="(item, index) in academy.packages" :key="index + '-pagination-academy-package'" class="dot" :class="activePackage === index ? 'active' : ''"></div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <div data-scroll-section class="academy__section d-flex align-items-center">
          <div data-scroll-trigger class="h-100 d-flex align-items-start">
            <TextSection class="align-self-center" :title="academy.faq_title" :text="academy.faq_description" />
            <AcademyQuestions :questions="academy.faq" />
          </div>
        </div>
      </div>
    </LocomotiveScroll>
    <transition name="fade" mode="out-in">
      <BaseModal v-if="showModal" class="d-flex align-items-center" @closeModal="showModal = false">
        <Youtube ref="youtube" :video-id="videoId" :player-vars="playerVars"></Youtube>
      </BaseModal>
    </transition>
    <transition name="fade" mode="out-in">
      <BaseModal v-if="showAcademyFormModal" @closeModal="showAcademyFormModal = false">
        <AcademyFormModal :packages="academy.packages" @close="showAcademyFormModal = false"></AcademyFormModal>
      </BaseModal>
    </transition>
    <NextPage :data="{ name: 'news', title: $t('pages.news') }" />
  </section>
</template>

<script>
import { Youtube } from 'vue-youtube';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import VerticalTextSection from '../../components/academy/VerticalTextSection.vue';
// import AcademyPackage from '../../components/academy/AcademyPackage';
// import TextSection from '../../components/academy/TextSection';
// import BaseButtonGrey from '../../components/common/BaseButtonGrey';
// import NextPage from '../../components/common/NextPage';
// import AcademyQuestions from '../../components/academy/AcademyQuestions';
import metaTagsMixin from '../../mixins/meta-tags-mixin';
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Academy',
  components: { Youtube },
  layout: 'horizontal-pages',
  mixins: [metaTagsMixin],
  async asyncData({ $axios }) {
    const data = await $axios.$get('/academy');
    return { academy: data.academy, metaTags: data.meta_tags };
  },
  data() {
    return {
      showModal: false,
      playerVars: {
        autoplay: 1,
      },
      videoId: '',
      activeAgeGroup: 0,
      activePackage: 0,
      academy: null,
      showAcademyFormModal: false,
    };
  },
  mounted() {
    this.initScrolltrigger();
    const elements = document.querySelectorAll('[data-scroll-trigger]');
    elements.forEach((element) => this.elementAnimation(element));
    // add wheel event to handle vertical scroll when needed
    const locomotive = this.$refs.scroller.locomotive;
    locomotive.el.addEventListener('wheel', this.wheelHandler);

    if (window.innerWidth < 992) {
      const ageGroups = document.querySelector('.age-groups');
      ageGroups.addEventListener('scroll', this.handleAgeGroupScroll);

      const packages = document.querySelector('.packages');
      packages.addEventListener('scroll', this.handlePackagesScroll);
    }
  },
  beforeDestroy() {
    // remove wheel event
    const locomotive = this.$refs.scroller.locomotive;
    locomotive.el.removeEventListener('wheel', this.wheelHandler);

    if (window.innerWidth < 992) {
      const ageGroups = document.querySelector('.age-groups');
      ageGroups.removeEventListener('scroll', this.handleAgeGroupScroll);

      const packages = document.querySelector('.packages');
      packages.removeEventListener('scroll', this.handlePackagesScroll);
    }
  },
  methods: {
    openVideo(id) {
      if (id) {
        this.videoId = id;
        this.showModal = true;
      }
    },
    disableHorizontalScroll(elem) {
      const locomotive = this.$refs.scroller.locomotive;
      locomotive.stop();
      if (elem) {
        elem.classList.add('vertical');
      }
    },
    enableHorizontalScroll() {
      document.querySelector('.vertical-2').classList.remove('vertical');
      document.querySelector('.vertical-2').classList.remove('vertical-2');
      const locomotive = this.$refs.scroller.locomotive;
      locomotive.start();
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
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });
    },
    handleRectangleScroll: (el, deltaY, ref) => {
      // handle rectangles scroll
      const parent = document.querySelector('.rectangle-wrapper').parentElement;
      const scrollElement = el.querySelector('.scroll-hider');
      const academyPackages = scrollElement.querySelectorAll('.academy-package');
      if (deltaY > 0) {
        const top1 = academyPackages[0].style.top ? parseInt(academyPackages[0].style.top.replace('px', '')) : 0;
        const top2 = academyPackages[1].style.top ? parseInt(academyPackages[1].style.top.replace('px', '')) : 0;
        const top3 = academyPackages[2].style.top ? parseInt(academyPackages[2].style.top.replace('px', '')) : 0;
        if (top1 + top2 + top3 > -10 && top1 + top2 + top3 < 10) {
          ref.enableHorizontalScroll();
          return;
        }
      }
      ref.disableHorizontalScroll(parent);
      // scroll from anywhere using wheel event
      // scrollElement.scrollTop -= deltaY;
      const speedMultiplier = 1 / 2;
      if (academyPackages.length === 3) {
        const offset = academyPackages[0].offsetTop;
        const secondOffset = offset + 15;
        const thirdOffset = secondOffset + 15;
        if (deltaY < 0) {
          if (academyPackages[1].offsetTop > secondOffset) {
            const top = academyPackages[1].style.top;
            let diff = 0;
            for (let i = -0.1; i > deltaY; i -= 0.1) {
              if (academyPackages[1].offsetTop + diff > secondOffset) {
                diff = i;
              }
            }
            if (academyPackages[1].offsetTop + diff > secondOffset) {
              diff -= 0.1;
            }
            academyPackages[1].style.top = parseFloat(top ? top.replace('px', '') : 0) + diff * speedMultiplier + 'px';
          }
          if (academyPackages[2].offsetTop > thirdOffset) {
            const top = academyPackages[2].style.top;
            let diff = 0;
            for (let i = -0.1; i > deltaY; i -= 0.1) {
              if (academyPackages[2].offsetTop + diff > thirdOffset) {
                diff = i;
              }
            }
            if (academyPackages[2].offsetTop + diff > thirdOffset) {
              diff -= 0.1;
            }
            academyPackages[2].style.top = parseFloat(top ? top.replace('px', '') : 0) + diff * speedMultiplier + 'px';
          } else if (deltaY < 0) {
            ref.enableHorizontalScroll();
          }
        } else {
          const top2 = academyPackages[2].style.top;
          const top2Int = top2 ? parseInt(top2.replace('px', '')) : 0;
          if (top2Int < 0) {
            let diff = 0;
            for (let i = 0.1; i < deltaY; i += 0.1) {
              if (top2Int + diff < 0) {
                diff = i;
              }
            }
            if (top2Int + diff < 0) {
              diff += 0.1;
            }
            academyPackages[2].style.top = top2Int + diff * speedMultiplier + 'px';
          }
          const top1 = academyPackages[1].style.top;
          const top1Int = top1 ? parseInt(top1.replace('px', '')) : 0;
          if (top1Int < 0 && top2Int - top1Int > 0) {
            let diff = 0;
            for (let i = 0.1; i < deltaY; i += 0.1) {
              if (top1Int + diff < 0) {
                diff = i;
              }
            }
            if (top1Int + diff < 0) {
              diff += 0.1;
            }
            academyPackages[1].style.top = top1Int + diff * speedMultiplier + 'px';
          }
        }
      }
    },
    wheelHandler(e) {
      const deltaY = e.wheelDeltaY / 2;
      const parent = document.querySelector('.vertical');
      if (parent) {
        parent.classList.add('vertical-2');
      }
      const el = document.querySelector('.vertical-2 .vertical-scroll');
      if (!el) {
        return;
      }
      if (el.classList.contains('rectangle-wrapper')) {
        this.handleRectangleScroll(el, deltaY, this);
      } else {
        const wrapper = document.querySelector('.vertical-2');
        const currentTransform = el.getAttribute('current-transform');
        let newTransform = (currentTransform ? parseInt(el.getAttribute('current-transform')) : 0) + deltaY;
        newTransform = parseInt(newTransform.toFixed(2));
        // control vertical scroll bounds
        if (deltaY < 0) {
          if (el.offsetTop + el.clientHeight + newTransform < wrapper.offsetTop + wrapper.clientHeight) {
            newTransform = wrapper.offsetTop + wrapper.clientHeight - el.offsetTop - el.clientHeight;
            this.enableHorizontalScroll();
          } else {
            this.disableHorizontalScroll(parent);
          }
        } else if (deltaY > 0) {
          if (newTransform > 0) {
            newTransform = 0;
            this.enableHorizontalScroll();
          } else {
            this.disableHorizontalScroll(parent);
          }
        }
        requestAnimationFrame(() => {
          this.setTransforms(el, newTransform);
        });
      }
    },
    setTransforms(el, newTransform) {
      el.setAttribute('current-transform', newTransform);
      el.style.transform = 'translateY(' + newTransform + 'px)';
    },
    elementAnimation(element) {
      gsap.from(element, {
        scrollTrigger: {
          horizontal: true,
          trigger: element,
          scroller: this.$refs.scroller.locomotive.el,
          start: 'center center',
          end: '+=200',
          // toggleClass: 'vertical',
          onToggle: (self) => {
            if (self.isActive) {
              this.disableHorizontalScroll(element);
            }
          },
        },
      });
    },
    handleAgeGroupScroll(e) {
      const ageGroups = e.target;
      const scrollPercentage = (100 * ageGroups.scrollLeft) / (ageGroups.scrollWidth - ageGroups.clientWidth);
      if (scrollPercentage < 40) {
        this.activeAgeGroup = 0;
      } else if (scrollPercentage < 80) {
        this.activeAgeGroup = 1;
      } else {
        this.activeAgeGroup = 2;
      }
    },
    handlePackagesScroll(e) {
      const packages = e.target;
      const scrollPercentage = (100 * packages.scrollLeft) / (packages.scrollWidth - packages.clientWidth);
      if (scrollPercentage < 40) {
        this.activePackage = 0;
      } else if (scrollPercentage < 80) {
        this.activePackage = 1;
      } else {
        this.activePackage = 2;
      }
    },
  },
  head() {
    return {
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.academy.og_title || '' },
        { hid: 'og:title', name: 'og:title', content: this.academy.og_description || '' },
        { hid: 'og:image', name: 'og:image', content: this.academy.og_image || '' },
      ],
    };
  },
};
</script>

<style lang="scss">
.academy {
  @include media-breakpoint-down(md) {
    padding-top: rem(48);
  }

  .horizontal {
    padding-right: rem(300);
    padding-left: $left-offset;

    @include media-breakpoint-down(md) {
      display: block !important;
      padding-right: 0;
      padding-left: 0 !important;
      width: 100vw;
    }
  }

  &__section {
    padding: calc((100vh - 38.75rem) / 2) 0;
    margin-right: rem(350);

    @include media-breakpoint-down(md) {
      padding: 0 0;
      margin-right: 0;
      width: 100%;
      flex-wrap: wrap;
      display: block !important;

      div[data-scroll-trigger] {
        display: block !important;
      }
    }

    .pagination {
      display: none;
      /* @include media-breakpoint-down(md) {
        display: flex;
        justify-content: space-between;
        width: rem(40);
        height: rem(8);
        position: sticky;
        bottom: rem(100);
        left: 50%;
        transform: translateX(-50%);

        .dot {
          width: rem(6);
          height: rem(6);
          border-radius: 50%;
          background-color: $gray-scale-300;
          border-width: rem(1);
          border-style: solid;
          border-color: transparent;

          &.active {
            background-color: $gray-scale-100;
            border-color: $gray-scale-100;
          }
        }
      } */
    }

    .vertical {
      .scroll-hider {
        //overflow-y: scroll !important;
      }
    }

    .rectangle-wrapper {
      width: rem(650);
      height: calc(100% + (100vh - 38.75rem) / 2);
      overflow: hidden;

      @include media-breakpoint-down(md) {
        padding: 0 !important;
      }

      .scroll-hider {
        overflow-y: hidden;
        overflow-x: auto;
        width: calc(100% + 30px);
        height: 100%;
        padding-right: 30px;

        @include media-breakpoint-down(md) {
          overflow-y: hidden !important;
          overflow-x: hidden !important;
          white-space: normal;
          width: 100% !important;
          padding-right: 0 !important;
        }
      }
    }

    .vertical-scroll {
      padding-top: 11rem;
      transition: transform 0.075s;
      //overflow-y: auto;

      @include media-breakpoint-down(md) {
        position: relative;
        padding-top: rem(120);
        //display: flex;
        display: block;
        white-space: normal;
        width: 100%;
        overflow-x: auto;
      }

      &:not(:first-child) {
        margin-left: rem(200);

        @include media-breakpoint-down(md) {
          margin-left: 0;
          padding-top: rem(64);
        }
      }
    }

    &__video-play-icon-container {
      opacity: 0;
      transition: all 0.2s ease;
      backface-visibility: hidden;
      transform: scale(0.5);
      vertical-align: top;
      pointer-events: none;
      /* demo purpose*/
    }

    &__video-play-icon {
      width: rem(40);
      height: rem(40);
      display: flex;
    }
  }

  &__image-1 {
    width: rem(700);
    height: rem(715);
    margin-left: rem(150);

    @include media-breakpoint-down(md) {
      margin-top: rem(48);
      margin-left: 0;
      width: 100%;
      height: auto;
      border-radius: 0 !important;
    }
  }

  &__images {
    padding: 24.4vh 0;

    @include media-breakpoint-down(md) {
      padding: 0 rem(24);
      display: flex !important;
      align-content: space-between;
      flex-wrap: wrap;
      flex-direction: column;
      height: rem(825);
      margin-bottom: rem(116);
    }

    & > * {
      opacity: 0.5;
      overflow: hidden;
      transition: opacity 0.25s ease;

      @include media-breakpoint-down(md) {
        margin: 0 !important;
        width: calc(50% - #{rem(8)}) !important;
        overflow: hidden;
        transform: none !important;

        opacity: 1;

        .academy__section__video-play-icon-container {
          transform: scale(1);
          opacity: 1;
        }
      }

      &:hover {
        opacity: 1;

        .academy__section__video-play-icon-container {
          transform: scale(1);
          opacity: 1;
        }
      }
    }

    &__part-1 {
      width: rem(260);
      height: rem(370);
      margin-right: rem(32);
      margin-top: rem(32);

      @include media-breakpoint-down(md) {
        margin-bottom: rem(8) !important;
        margin-top: rem(80) !important;
        height: rem(291);
      }
    }

    &__part-2 {
      width: rem(220);
      height: rem(340);
      align-self: flex-start;
      margin-right: rem(32);
      transform: translateY(#{rem(-20)});
    }

    &__part-3 {
      width: rem(250);
      height: rem(460);
      align-self: flex-end;
      margin-right: rem(32);
      transform: translateY(#{rem(80)});

      @include media-breakpoint-down(md) {
        height: rem(258);
        margin-bottom: rem(16) !important;
      }
    }

    &__part-4 {
      width: rem(170);
      height: rem(300);
      margin-right: rem(32);
      margin-top: rem(32);

      @include media-breakpoint-down(md) {
        height: rem(235);
        margin-bottom: rem(16) !important;
      }
    }

    &__part-5 {
      width: rem(230);
      height: rem(400);
      margin-top: rem(32);

      @include media-breakpoint-down(md) {
        height: rem(300);
      }
    }

    img {
      object-fit: cover;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      @include media-breakpoint-down(md) {
        min-height: 100%;
        min-width: 100%;
      }
    }
  }

  .horizontal {
    padding-left: $left-offset;
    display: flex;

    @include media-breakpoint-up(md) {
      height: 100vh;
    }

    @include media-breakpoint-down(md) {
      padding-bottom: rem(236);
    }
  }

  iframe {
    width: 74vw;
    height: 41.625vw;

    @include media-breakpoint-down(md) {
      width: 100vw;
      height: 56.25vw;
    }
  }

  .base-button {
    &__text {
      max-width: none !important;
      visibility: visible;
      opacity: 1;

      @include media-breakpoint-down(md) {
        color: $accent-primary;
        font-weight: 700;
      }
    }

    &__icon {
      fill: $accent-primary;
      width: rem(15);
      height: rem(13);
    }
  }
}
</style>
