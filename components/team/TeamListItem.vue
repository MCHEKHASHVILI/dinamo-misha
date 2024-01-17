<template>
  <figure class="team-grid-item">
    <TeamListItemContent :data="data[0]" class="team-grid-item-content--first" />
    <TeamListItemContent v-if="data[1]" :data="data[1]" class="team-grid-item-content--second" />
  </figure>
</template>

<script>
import TeamListItemContent from './TeamListItemContent';
export default {
  name: 'TeamListItem',
  components: { TeamListItemContent },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.team-grid-item {
  margin: 0 rem(35);
  display: grid;
  grid-template-areas:
    'gallery-image gallery-image'
    'gallery-image-second gallery-image-second';
  grid-template-columns: 25vh;
  grid-template-rows: calc(50% - #{rem(23)}) calc(50% - #{rem(23)});
  row-gap: rem(66);
  /*height: 100%;*/
  /*width: rem(230);*/
  &:nth-child(odd) {
    .team-grid-item-content--first {
      .team-grid-item-content__name {
        @include media-breakpoint-up(md) {
          padding-bottom: rem(40);
        }
      }
    }
  }
  &:nth-child(even) {
    .team-grid-item-content--second {
      .team-grid-item-content__name {
        @include media-breakpoint-up(md) {
          padding-bottom: rem(40);
        }
      }
    }
  }

  @include media-breakpoint-down(md) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 rem(24);
  }
}
</style>
