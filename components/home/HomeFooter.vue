<template>
  <div class="home-footer w-100 justify-content-between">
    <div class="d-flex align-self-end">
      <a href="https://holar.io/" target="_blank" class="d-inline-block font-size-16 font-semi-bold font-color-label-secondary text-decoration-none d-inline-block">Coded by holar</a>
    </div>

    <div class="ml-auto d-flex">
      <a v-for="(item, index) in socialLinks" :key="index" :href="item.link" target="_blank" class="button mr-8 d-flex justify-content-center align-items-center">
        <SvgIcon :name="item.key" class="home-footer__social-icon" />
      </a>
      <SoundButton :audio-src="audio" />
      <NuxtLink v-for="locale in availableLocales" :key="locale.code" class="button button__lang d-flex justify-content-center align-items-center" :to="switchLocalePath(locale.code)">
        <SvgIcon name="lang-icon" class="button__icon svg-fill-accent-primary" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import SoundButton from '../common/SoundButton';
export default {
  name: 'HomeFooter',
  components: { SoundButton },
  props: {
    availableLocales: {
      type: Array,
      required: true,
    },
    frontpage: {
      type: Object,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      soundOn: false,
      soundMessage: false,
    };
  },
  computed: {
    soundIcon() {
      return this.soundOn ? 'sound-on' : 'sound-off';
    },
    socialLinks() {
      const socialLinks = [];

      if (!this.frontpage) return socialLinks;
      ['tiktok', 'fb', 'youtube', 'instagram'].forEach((item) => {
        if (this.frontpage[item]) {
          socialLinks.push({
            key: item,
            link: this.frontpage[item],
          });
        }
      });

      return socialLinks;
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
.home-footer {
  pointer-events: auto;
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

  .button {
    width: rem(60);
    height: rem(60);
    background-color: white;
    cursor: pointer;
    border-radius: 35%;

    &__icon {
      width: 20px;
      height: 20px;
      fill: $accent-primary !important;
    }
  }

  .black-opacity {
    background-color: rgba($gray-scale-50, 0.6);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .button {
    transition: 0.15s all ease;
    &:hover {
      box-shadow: $horizontal-box-shadow;
    }
  }

  &__social-icon {
    fill: $accent-primary;
    max-width: 16px;
    max-height: 16px;
  }
}
</style>
