<template>
  <NuxtLink :to="localePath({ name: 'team/id/slug', params: { id: data.id, slug: data.slug } })" class="team-grid-item-anchor text-decoration-none">
    <div class="team-grid-item-content team-grid-item-content-js w-100 h-100 position-relative overflow-hidden d-flex flex-column text-center" data-scroll>
      <div class="team-grid-item-content__img position-relative w-100 h-100 bg-cover bg-color-gray-scale-500 border-radius-l flex-1" :style="`background-image: url(${data.list_image})`">
        <div class="team-grid-item-content__link-icon border-radius-50 z-index-1 d-flex align-items-center justify-content-center"><SvgIcon name="right-arrow" class="team-grid-item-content__link-icon-svg svg-fill-gray-scale-100" /></div>
      </div>
      <div v-if="showNationality" class="team-grid-item-content__name my-6 d-flex align-items-center justify-content-center">
        <img v-for="nationality in data.nationality" :key="nationality.value" :src="`/flags/${nationality.value.toLowerCase()}.svg`" alt="" class="team-grid-item-content__flag mt-1 mr-2" />
        <h4 class="font-semi-bold font-color-label-primary">{{ fullName }}</h4>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'TeamListItemContent',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    showNationality() {
      return this.data.nationality && this.data.nationality.length > 0;
    },
    fullName() {
      return this.data.first_name + ' ' + this.data.second_name;
    },
  },
};
</script>

<style lang="scss">
.team-grid-item-anchor {
  @include media-breakpoint-down(md) {
    width: calc(50% - #{rem(8)});
  }
}
.team-grid-item-content {
  grid-area: gallery-image;
  transform-origin: 50% 100%;

  @include media-breakpoint-down(md) {
    // height: rem(230) !important;
    margin: rem(8) 0;

    &__img {
      flex: none !important;
      height: rem(250) !important;
    }
  }

  &__flag {
    width: 20px;
  }

  &--second {
    grid-area: gallery-image-second;
    transform-origin: 50% 100%;
  }

  &__name {
    @include media-breakpoint-up(md) {
      visibility: hidden;
      opacity: 0;
      transition: all 0.2s ease;
    }
  }

  &:hover {
    .team-grid-item-content__name {
      visibility: visible;
      opacity: 1;
      transition: all 0.2s ease;
    }
  }

  &__link-icon {
    @include abs-position(auto, rem(26), rem(26), auto);
    width: rem(56);
    height: rem(56);
    background: $white;
    transition: all 0.2s ease;
    opacity: 0;

    &-svg {
      max-width: rem(14);
      max-height: rem(14);
    }
  }

  &:hover {
    .team-grid-item-content__link-icon {
      opacity: 1;
      transform: rotate(-45deg);
    }
  }
}
</style>
