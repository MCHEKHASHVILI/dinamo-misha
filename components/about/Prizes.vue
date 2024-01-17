<template>
  <article class="prizes vw-100">
    <CommonTextDesc :title="data.prizes_title" :description="data.prizes_description" />
    <div ref="slider" class="prizes__horizontal">
      <div class="history-grid__grid mt-28 mt-md-48">
        <FirstTeamImageItem v-for="(item, index) in data.prizes" :key="index + '-prize'" :data="item" />
      </div>
      <div class="pagination">
        <div v-for="(item, index) in data.prizes" :key="index" class="dot" :class="activeSlide === index ? 'active' : ''"></div>
      </div>
    </div>
    <CommonTextDesc :title="data.georgian_prizes_title" :description="data.georgian_prizes_description" />
    <div ref="slider2" class="prizes__horizontal">
      <div class="history-grid__grid mt-28 mt-md-48">
        <FirstTeamImageItem v-for="(item, index) in data.georgian_prizes['after_world_war_prizes']" :key="index + '-georgian-prize'" :data="item" />
      </div>
      <div class="pagination">
        <div v-for="(item, index) in data.georgian_prizes['after_world_war_prizes']" :key="index" class="dot" :class="activeSlide2 === index ? 'active' : ''"></div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Prizes',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeSlide: 0,
      activeSlide2: 0,
    };
  },
  mounted() {
    if (window.innerWidth < 992) {
      const slider = this.$refs.slider;
      slider.addEventListener('scroll', this.handleHorizontalSlider);

      const slider2 = this.$refs.slider2;
      slider2.addEventListener('scroll', this.handleHorizontalSlider2);
    }
  },
  methods: {
    handleHorizontalSlider(e) {
      const slider = e.target;
      const data = this.data.prizes;
      const scrollPercentage = (100 * slider.scrollLeft) / (slider.scrollWidth - slider.clientWidth);
      const numImages = data.length;
      const perPercent = parseInt(100 / numImages);
      const activeNum = parseInt(scrollPercentage / perPercent);
      this.activeSlide = activeNum < data.length ? activeNum : data.length - 1;
    },
    handleHorizontalSlider2(e) {
      const slider = e.target;
      const data = this.data.georgian_prizes.after_world_war_prizes;
      const scrollPercentage = (100 * slider.scrollLeft) / (slider.scrollWidth - slider.clientWidth);
      const numImages = data.length;
      const perPercent = parseInt(100 / numImages);
      const activeNum = parseInt(scrollPercentage / perPercent);
      this.activeSlide2 = activeNum < data.length ? activeNum : data.length - 1;
    },
  },
};
</script>

<style lang="scss">
@import 'assets/scss/components/history-grid';
.prizes {
  padding: 0 vw(400) rem(100);

  @include media-breakpoint-down(md) {
    padding: 0 0 rem(50);
  }

  &__horizontal {
    @include media-breakpoint-down(md) {
      padding: 0 rem(24) rem(60);
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
        display: none;
      }
    }
  }

  &__grid {
    @include media-breakpoint-down(md) {
      width: fit-content;
      display: flex;
      column-gap: rem(16);
      //padding-right: rem(24);
    }
  }

  .pagination {
    display: none;
    @include media-breakpoint-down(md) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 8px;
      position: sticky;
      bottom: 0;
      margin-top: rem(50);
      left: 0;
      .dot {
        width: 6px;
        height: 6px;
        margin: 0 7px;
        border-radius: 50%;
        background-color: $gray-scale-300;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        &.active {
          background-color: $gray-scale-100;
          border-color: $gray-scale-100;
        }
      }
    }
  }
}
</style>
