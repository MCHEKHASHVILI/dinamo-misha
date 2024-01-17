<template>
  <article ref="slider" class="history-grid">
    <div class="history-grid__grid">
      <FirstTeamImageItem v-for="(item, index) in data" :key="index" :data="item" />
    </div>
    <div class="pagination">
      <div v-for="(item, index) in data" :key="index" class="dot" :class="activeSlide === index ? 'active' : ''"></div>
    </div>
    <!--    <diFv class="font-regular font-size-14 line-height-1-4 font-color-label-secondary">And more...</diFv>-->
    <!--    <img src="/history/team.png" alt="" class="mt-10 w-100" />-->
    <!--    <div class="font-regular font-size-14 line-height-1-4 font-color-label-secondary mt-6">From the left to right: ahsadas, sadjask hasdas, hasdhasjd sadas, ashdashj, asdasdsa</div>-->
    <!-- -->
  </article>
</template>

<script>
export default {
  name: 'FirstTeam',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeSlide: 0,
    };
  },
  mounted() {
    if (window.innerWidth < 992) {
      const slider = this.$refs.slider;
      slider.addEventListener('scroll', this.handleHorizontalSlider);
    }
  },
  methods: {
    handleHorizontalSlider(e) {
      const slider = e.target;
      const scrollPercentage = (100 * slider.scrollLeft) / (slider.scrollWidth - slider.clientWidth);
      const numImages = this.data.length;
      const perPercent = parseInt(100 / numImages);
      const activeNum = parseInt(scrollPercentage / perPercent);
      this.activeSlide = activeNum < this.data.length ? activeNum : this.data.length - 1;
    },
  },
};
</script>

<style lang="scss">
@import 'assets/scss/components/history-grid';
</style>
