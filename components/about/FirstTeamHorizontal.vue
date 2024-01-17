<template>
  <div class="first-team-horizontal d-sm-flex align-items-center justify-content-between">
    <CommonTextDesc :title="data.title" :description="data.description" class="px-12 px-md-0" />
    <div class="first-team-horizontal__img-container d-flex flex-column mt-8 mt-sm-0">
      <img :src="data.image" alt="" class="first-team-horizontal__img object-fit-cover" />
      <div class="font-semi-bold font-size-14 line-height-1-4 font-color-label-secondary mt-6 px-12 px-md-0">{{ data.players_names }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstTeamHorizontal',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.first-team-horizontal {
  padding-left: rem(300);
  padding-right: rem(300);

  @include media-breakpoint-down(md) {
    padding: rem(40) 0;
  }

  &__img-container {
    @include media-breakpoint-up(md) {
      max-width: rem(1000);
      margin-left: rem(100);
    }

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__img {
    @include media-breakpoint-up(md) {
      max-height: 56.25vh;
    }
  }
}
</style>
