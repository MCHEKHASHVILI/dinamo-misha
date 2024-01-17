<template>
  <div class="sponsors-wrapper">
    <div class="sponsors-content-wrapper scalable">
      <div v-if="sponsors" class="home-sponsors">
        <a v-for="(sponsor, index) in sponsors" :key="index" :title="sponsor.name" :href="sponsor.url" target="_blank" class="home-sponsors__logo-container">
          <img :src="sponsor.image" :alt="sponsor.name" class="home-sponsors__logo" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSponsors',
  props: {
    sponsors: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
//.main-page__zoom-container {
//  .home-sponsors {
//    top: 47.9%;
//  }
//}

.sponsors-wrapper {
  @include abs-position(46.9%, auto, auto, 28.9%);
  width: 23.4%;
  height: 0.66%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sponsors-content-wrapper {
  width: 23.4vw;
  height: 1.65vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-sponsors {
  z-index: 1;
  width: 23.4vw;
  height: 1.65vw;
  transform: rotate(-25deg) skew(-25deg);
  display: grid;
  gap: 4.5%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__logo {
    display: block;
    max-width: 100%;
    max-height: 1.65vw;
    backface-visibility: hidden;

    @include media-breakpoint-down(md) {
      width: 100%;
      max-height: 1.65vw;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
