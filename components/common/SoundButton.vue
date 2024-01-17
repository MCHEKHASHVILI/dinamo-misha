<template>
  <div class="button-wrapper" :class="iconOnly ? 'no-responsive' : 'responsive'">
    <div class="button button__sound position-relative d-flex justify-content-center align-items-center mr-8" :class="{ active: soundMessage }" @click="onSoundClick">
      <SvgIcon :name="soundIcon" class="button__icon svg-fill-accent-primary" />
      <span v-if="!iconOnly" class="button__text mobile font-regular color-label-secondary font-size-14 ml-4">{{ soundOn ? $t('front_page.sound_off') : $t('front_page.sound_on') }}</span>
      <transition name="fade">
        <div v-if="soundMessage" class="message sound position-absolute">
          <div class="message__header d-flex justify-content-between align-items-center mb-2">
            <p class="message__title font-regular font-size-16 line-height-1-4 font-color-label-primary">Turn on the sound</p>
            <div class="cursor-pointer" @click="closeMessage">
              <SvgIcon name="close-message" class="message__close" />
            </div>
          </div>
          <p class="message__text font-regular font-size-14 line-height-1-6 font-color-label-secondary">For the best experience we suggest you to turn on the sound</p>
        </div>
      </transition>
    </div>
    <audio ref="audioElm" :src="audioSrc" loop class="hidden"></audio>
  </div>
</template>

<script>
export default {
  name: 'SoundButton',
  props: {
    audioSrc: {
      type: String,
      required: true,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      soundOn: false,
      soundMessage: false,
      audio: null,
    };
  },
  computed: {
    soundIcon() {
      return this.soundOn ? 'sound-on' : 'sound-off';
    },
  },
  beforeMount() {
    document.addEventListener('keydown', this.keyDownListener);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.keyDownListener);
  },
  created() {
    this.$nuxt.$on('loader-close', () => {
      this.initSound();
    });
  },
  methods: {
    toggleSound() {
      const a = this.$refs.audioElm;
      a.paused ? a.play() : a.pause();
    },
    onSoundClick() {
      this.toggleSound();
      this.soundOn = !this.soundOn;
      this.closeMessage();
    },
    initSound() {
      let soundShownCount = localStorage.getItem('soundShownCount') || 0;
      if (soundShownCount < 2) {
        setTimeout(() => {
          this.openMessage();
        }, 4000);
        soundShownCount++;
        localStorage.setItem('soundShownCount', soundShownCount);
      }
    },
    keyDownListener(e) {
      if (e.key === 'Escape') {
        this.closePopup();
      }
    },
    openMessage() {
      this.soundMessage = true;
    },
    closeMessage() {
      this.soundMessage = false;
    },
  },
};
</script>

<style lang="scss">
.message {
  background-color: white;
  padding: rem(18) rem(12);
  border-radius: rem(12);
  right: rem(-20);
  bottom: calc(100% + #{rem(20)});
  width: rem(248);

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: rem(17);
    height: rem(17);
    background-color: white;
    transform: rotate(45deg);
    transform-origin: center;
    right: rem(36);
    top: calc(100% - #{rem(9)});
  }

  &__title {
    font-weight: 600;
  }

  &__close {
    width: rem(20);
    height: rem(20);
  }
}

.button-wrapper {
  position: relative;

  &.responsive {
    @include media-breakpoint-down(md) {
      width: 100%;
      margin-left: 0;
    }

    .button {
      @include media-breakpoint-down(md) {
        width: 100%;
        height: rem(50);
        background-color: white;
        border-radius: rem(12);
      }

      &__icon {
        @include media-breakpoint-down(md) {
          fill: $label-secondary !important;
        }
      }
    }
  }

  .button {
    width: rem(60);
    height: rem(60);
    background-color: white;
    cursor: pointer;
    border-radius: 35%;
    font-weight: 700;

    &.active {
      z-index: 2;
    }

    &__icon {
      width: rem(20);
      height: rem(20);
      fill: $accent-primary !important;
    }
  }
}

.black-opacity {
  background-color: rgba($gray-scale-50, 0.6);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
