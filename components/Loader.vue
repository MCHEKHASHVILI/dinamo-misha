<template>
  <div ref="loader" class="loader position-fixed d-flex align-items-center justify-content-center" :class="slideUp">
    <div class="loader__logo position-relative">
      <SvgIcon ref="logo-dolphin" name="dolphin" class="loader__logo__dolphin position-absolute" />
      <div ref="logo-dinamo" class="loader__logo__dinamo position-absolute">
        <SvgIcon name="dinamo" />
      </div>
    </div>
    <div class="loader__spinner position-absolute mx-auto">
      <Spinner class="mx-auto" />
      <p class="loader__percent font-regular color-label-white font-size-22 line-height-1-6 mt-2">
        <span ref="loader-percentage">{{ loaderPercentage }}%</span>
      </p>
    </div>
  </div>
</template>
<script>
import Spinner from './Spinner';
export default {
  name: 'Loader',
  components: { Spinner },
  data() {
    return {
      loaderPercentage: 0,
      interval: '',
      secondInterval: '',
    };
  },
  computed: {
    slideUp() {
      return this.loaderPercentage >= 100 ? 'slide-up' : '';
    },
  },
  beforeMount() {
    this.interval = setInterval(() => {
      if (this.loaderPercentage >= 90) {
        clearInterval(this.interval);
        return;
      }
      this.loaderPercentage += 1;
    }, 100);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    clearInterval(this.secondInterval);
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['logo-dolphin'].classList.add('animate');
      this.$refs['logo-dinamo'].classList.add('animate');
      // clearInterval(firstInterval);
      const period = 100 - parseInt(this.$refs['loader-percentage'].textContent);
      this.secondInterval = setInterval(() => {
        if (this.loaderPercentage >= 100) {
          clearInterval(this.secondInterval);
          this.$nuxt.$emit('loader-close');
          setTimeout(() => {
            this.$store.commit('app/SET_WEBSITE_LOADING_STATUS');
          }, 1000);
          return;
        }
        this.loaderPercentage += 1;
      }, 3000 / period);
    });
  },
};
</script>

<style lang="scss">
.loader {
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background-color: $accent-primary;
  z-index: 3;
  transition: transform 1s cubic-bezier(0.79, 0.14, 0.15, 0.86);

  &.slide-up {
    transform: translateY(-100%);
  }

  &__logo {
    width: rem(320);
    height: rem(130);
    overflow: hidden;

    &__dolphin {
      width: rem(130);
      height: rem(94);
      top: 0;
      left: 0;
      opacity: 0;
      transform: rotate(-130deg) translate(-30%, 30%);
      transform-origin: center rem(130);
      transition: all 1s cubic-bezier(0.79, 0.14, 0.15, 0.86);
      transition-delay: 0.5s;

      &.animate {
        transform: rotate(0deg) translate(0, 0);
        opacity: 1;
      }
    }

    &__dinamo {
      width: 0;
      height: rem(90);
      bottom: 0;
      left: rem(26);
      overflow: hidden;
      transition: width 0.5s cubic-bezier(0.79, 0.14, 0.15, 0.86);
      transition-delay: 1.5s;

      svg {
        width: rem(294);
        height: rem(90);
      }

      &.animate {
        width: rem(294);
      }
    }
  }

  &__spinner {
    left: 50%;
    bottom: rem(70);
    transform: translateX(-50%);
    width: 100px;
    text-align: center;
  }
}
</style>
