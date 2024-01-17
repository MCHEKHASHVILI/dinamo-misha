<template>
  <div class="questions-wrapper vertical-scroll">
    <AcademyQuestion v-for="(item, index) in questions" :key="index + '-academy-question'" :data="item" />
  </div>
</template>

<script>
import AcademyQuestion from './AcademyQuestion';
export default {
  name: 'AcademyQuestions',
  components: { AcademyQuestion },
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.questions-wrapper {
  @include media-breakpoint-down(md) {
    padding-left: rem(24);
    padding-right: rem(24);
    padding-top: 0;
  }
}
</style>
