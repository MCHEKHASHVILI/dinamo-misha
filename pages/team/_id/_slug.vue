<template>
  <article class="team-nested d-flex is-nested">
    <div class="team-nested__image-container position-sticky bg-color-gray-scale-500">
      <img :src="data.list_image.sizes['large']" alt="" class="object-fit-cover h-100" />
    </div>
    <div class="team-nested__content">
      <Breadcrumbs link-key="team" :parent="$t('player.team')" :child="data.is_staff ? $t('player.member') : $t('player.player')" />
      <h1 class="team-nested__title font-size-58 font-size-24-md font-semi-bold font-color-label-primary line-height-1-2 mt-18 mt-md-36">{{ fullName }}</h1>
      <div class="team-nested__options font-size-18 font-regular font-color-label-primary mt-16">
        <div v-if="showNationality" class="team-nested__param-item d-flex align-items-center">
          <div v-for="nationality in data.nationality" :key="nationality.value" class="d-flex align-items-center mr-4">
            <img :src="`/flags/${nationality.value.toLowerCase()}.svg`" alt="" class="team-nested__option-icon" />
            <span class="ml-4 font-size-18-md">{{ data.nationality.length > 1 ? nationality.label.slice(0, 3) : nationality.label }}</span>
          </div>
        </div>
        <div v-if="data.date_of_birth" class="team-nested__param-item d-flex align-items-center">
          <img :src="`/team-options/date.svg`" alt="" class="team-nested__option-icon" />
          <span class="ml-4 text-nowrap font-size-18-md">{{ calculateAge }} {{ $t('player.years_old') }}</span>
        </div>
        <div v-if="data.staff_position != null || data.position != null" class="team-nested__param-item d-flex align-items-center">
          <img :src="`/team-options/position.svg`" alt="" class="team-nested__option-icon" />
          <span class="ml-4 text-nowrap font-size-18-md">{{ data.is_staff ? data.staff_position : $t(`player_positions.${data.position.replace(/\s+/g, '_').toLowerCase()}`) }}</span>
        </div>
        <div v-if="parseInt(data.height)" class="team-nested__param-item d-flex align-items-center">
          <img :src="`/team-options/height.svg`" alt="" class="team-nested__option-icon" />
          <span class="ml-4 text-nowrap font-size-18-md">{{ data.height }} {{ $t('player.cm') }}</span>
        </div>
        <div v-if="parseInt(data.weight)" class="team-nested__param-item d-flex align-items-center">
          <img :src="`/team-options/weight.svg`" alt="" class="team-nested__option-icon" />
          <span class="ml-4 text-nowrap font-size-18-md">{{ data.weight }} {{ $t('player.kg') }}</span>
        </div>
        <div v-if="parseInt(data.sciense)" class="team-nested__param-item d-flex align-items-center">
          <img :src="`/team-options/logo.svg`" alt="" class="team-nested__option-icon" />
          <span class="ml-4 font-size-18-md">{{ data.sciense }}</span>
        </div>
      </div>
      <div v-if="data.about_player" class="post-content font-regular font-size-18 font-color-label-secondary line-height-1-2 mt-24" v-html="data.about_player"></div>
      <div v-if="data.videos && data.videos.length > 0">
        <h3 class="mt-40 font-semi-bold font-size-24 font-size-18-md line-height-1-2 font-color-label-primary">{{ $t('player.videos_about') }}</h3>
        <div class="team-nested__video-items-wrapper">
          <div class="team-nested__video-items mt-12">
            <div v-for="(video, index) in data.videos" :key="index + '-team-player-video'" :class="['team-nested__video-item cursor-pointer position-relative', { single: data.videos.length === 1 }]" @click="openVideo(video.video_id)">
              <SvgIcon name="play" class="team-nested__video-item-icon svg-fill-accent-primary" />
              <img :src="youtubeVideoCover(video.cover_image, video.video_id)" alt="" class="w-100 h-100 object-fit-cover border-radius-m" />
            </div>
          </div>
        </div>
      </div>
      <h3 class="mt-20 mt-md-40 font-semi-bold font-size-24 font-size-18-md line-height-1-2 font-color-label-primary">{{ $t('common.social_networks') }}</h3>
      <div class="mt-8">
        <a :href="data.facebook" target="_blank">
          <SvgIcon name="fb" class="team-nested__share-icon mr-12" />
        </a>
        <a :href="data.instagram" target="_blank">
          <SvgIcon name="instagram" class="team-nested__share-icon" />
        </a>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <BaseModal v-if="showModal" class="d-flex align-items-center justify-content-center" @closeModal="showModal = false">
        <Youtube ref="youtube" :video-id="videoId" :player-vars="playerVars"></Youtube>
      </BaseModal>
    </transition>
  </article>
</template>

<script>
import { Youtube } from 'vue-youtube';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default {
  name: 'TeamNested',
  meta: {
    nested: true,
  },
  components: { Breadcrumbs, Youtube },
  layout: 'horizontal-pages',
  async asyncData({ params, $axios, redirect, app, error }) {
    try {
      const data = await $axios.$get('/team/' + params.id);
      if (data.id == null) return redirect(app.localePath({ name: 'team' }));
      if (data.terms?.length > 0) {
        let activeMember = false;
        data.terms.forEach((term) => {
          if (term.slug.includes('active')) activeMember = true;
        });
        if (!activeMember) return redirect(app.localePath({ name: 'team' }));
      }
      return { data };
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found' });
    }
  },
  data() {
    return {
      showModal: false,
      data: null,
      playerVars: {
        autoplay: 1,
      },
      videoId: '',
    };
  },
  computed: {
    showNationality() {
      return this.data.nationality && this.data.nationality.length > 0;
    },
    fullName() {
      return this.data.first_name + ' ' + this.data.second_name;
    },
    calculateAge() {
      const today = new Date();
      const birthDate = new Date(this.data.date_of_birth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
  methods: {
    openVideo(id) {
      this.videoId = id;
      this.showModal = true;
    },
    youtubeVideoCover(defaultCover, youtubeId) {
      const youtubeCover = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
      return defaultCover || youtubeCover;
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
.team-nested {
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  &__content {
    padding: rem(40) rem(100);
    flex: 1;

    @include media-breakpoint-down(md) {
      width: 100%;
      padding: rem(16) rem(24);
    }
  }

  &__options {
    display: grid;
    gap: 34px;
    grid-template-columns: 1fr 1fr 1fr;

    @include media-breakpoint-down(md) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      flex-basis: 50%;

      gap: 20px;
    }
  }

  &__image-container {
    height: 100vh;
    width: rem(600);
    left: 0;
    top: 0;

    @include media-breakpoint-down(md) {
      width: 100%;
      height: 86.9vw;
      position: relative !important;
    }

    img {
      height: 100%;
      width: rem(600);
      @include media-breakpoint-down(md) {
        object-position: top center;
        width: 100%;
      }
    }
  }

  &__param-item {
    width: calc(100% / 3);
  }

  &__video-items-wrapper {
    @include media-breakpoint-down(md) {
      padding-left: rem(24);
      margin-left: rem(-24);
      margin-right: rem(-24);
      overflow-x: auto;
    }
  }

  &__video-items {
    display: grid;
    gap: rem(22);
    grid-template-columns: 1fr 1fr 1fr;

    @include media-breakpoint-down(md) {
      display: flex;
      width: fit-content;
      padding-right: rem(24);
    }
  }

  &__video-item {
    //width: calc((100% - #{rem(22)}) / 3);
    height: rem(160);

    @include media-breakpoint-down(md) {
      width: calc(66vw);
      height: rem(160);

      &.single {
        width: calc(100vw - #{rem(48)});
        height: rem(200);
      }
    }

    &-icon {
      width: rem(40);
      height: rem(40);

      @include abs-position(50%, auto, auto, 50%);

      transform: translate(-50%, -50%);
    }
  }

  &__option-icon {
    max-width: 20px;
    max-height: 20px;
  }

  iframe {
    width: 74vw;
    height: 41.625vw;

    @include media-breakpoint-down(md) {
      width: 100vw;
      height: 56.25vw;
    }
  }

  &__share-icon {
    width: 22px;
    height: 26px;
    transition: fill 0.2s ease;
    cursor: pointer;
    fill: $gray-scale-200;
    &:hover {
      fill: $accent-primary;
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

    li {
      margin: 8px 0;
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
}
</style>
