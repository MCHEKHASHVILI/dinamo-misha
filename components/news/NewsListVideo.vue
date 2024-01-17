<template>
  <article class="news-list-video border-radius-xl overflow-hidden">
    <div class="d-flex justify-content-between position-relative" :class="reverse ? 'flex-column-reverse' : ''">
      <div class="news-list-video__header d-flex flex-column justify-content-between">
        <div class="font-regular font-size-14 font-color-label-secondary d-flex align-items-center">
          <SvgIcon name="video-play-icon" class="play-icon mr-8" />
          <div class="font-regular font-size-14 font-color-label-white d-flex mr-auto">
            <div class="news-list-image__post-time">{{ dateFormat(data.date) }}</div>
            <div class="news-list-image__read-time ml-18">{{ data.reading_time }} {{ $t('news.min_to_read') }}</div>
          </div>
        </div>
        <h3 class="font-regular font-size-24 w-100 white-space-normal label-white">{{ data.title }}</h3>
      </div>
      <ClientOnly>
        <div class="video-background d-flex align-items-center border-radius-m overflow-hidden">
          <video autoplay loop muted>
            <source :src="data.video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video class="w-100 h-auto z-index-1 position-relative" autoplay loop muted>
            <source :src="data.video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </ClientOnly>
    </div>
  </article>
</template>

<script>
export default {
  name: 'NewsListVideo',
  props: {
    data: {
      type: Object,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      playerVars: {
        playlist: this.data.video,
        autoplay: 1,
        loop: 1,
        modestbranding: 1,
        autohide: 1,
        showinfo: 0,
        frameborder: 0,
        controls: 0,
        rel: 0,
        mute: 1,
      },
    };
  },
  methods: {
    dateFormat(date) {
      return this.$moment(date).format('DD MMMM YYYY');
    },
  },
};
</script>

<style lang="scss">
.news-list-video {
  width: rem(420);
  height: rem(520);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  border: 1px solid $gray-scale-400;

  margin: 0 rem(24);
  display: grid;

  @include media-breakpoint-down(md) {
    width: 100%;
    margin: 0 !important;
    height: rem(361);
  }

  &__header {
    height: rem(200);
    padding: rem(32) rem(32) rem(48);

    @include media-breakpoint-down(md) {
      padding: rem(24) rem(24) rem(32);
      height: rem(170);
    }

    h3 {
      &.label-white {
        color: $label-white;
      }

      @include media-breakpoint-down(md) {
        font-weight: 700;
      }
    }
  }

  &__video-length {
    position: relative;
    color: $label-white;
  }

  .play-icon {
    width: rem(40);
    height: rem(40);
  }

  .video-background {
    background: $gray-scale-200;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -11;
    /* overflow: hidden; */
  }
  .video-background {
    video {
      &:first-child {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        pointer-events: none;
        filter: blur(20px);
      }
    }
  }

  /*@media (min-aspect-ratio: 16/9) {
    .video-foreground {
      height: 300%;
      top: -100%;
    }
  }
  @media (max-aspect-ratio: 16/9) {
    .video-foreground {
      width: 300%;
      left: -100%;
    }
  }
  @media all and (max-width: 600px) {
    .vid-info {
      width: 50%;
      padding: 0.5rem;
    }
    .vid-info h1 {
      margin-bottom: 0.2rem;
    }
  }
  @media all and (max-width: 500px) {
    .vid-info .acronym {
      display: none;
    }
  }*/

  .news-list-image__read-time {
    &::after {
      background: $label-white;
    }

    @include media-breakpoint-down(md) {
      font-weight: 700;
    }
  }

  .news-list-image__post-time {
    @include media-breakpoint-down(md) {
      font-weight: 700;
    }
  }
}
</style>
