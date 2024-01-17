<template>
  <article class="no-success-history d-flex align-items-center">
    <CommonTextDesc :title="data.title" :description="data.description" />
    <div class="no-success-history__items">
      <div class="no-success-history__item d-flex flex-column white-space-normal mb-44 mb-md-0">
        <img :src="data.stories[0].image" alt="" class="mb-8 w-100" />
        <h5 class="font-semi-bold font-color-label-secondary font-size-24 font-size-md-30 line-height-1-5">{{ data.stories[0].title }}</h5>
      </div>
      <div v-for="(story, index) in filteredStories" :key="index + '-story'" class="no-success-history__item flex-1 white-space-normal">
        <h5 class="font-semi-bold font-color-label-secondary line-height-1-3 mb-4">{{ story.title }}</h5>
        <img :src="story.image" alt="" class="object-fit-cover" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'NoSuccessHistory',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredStories() {
      const { stories } = this.data;
      return stories.slice(1, stories.length);
    },
  },
};
</script>

<style lang="scss">
.no-success-history {
  padding-left: rem(300);
  padding-right: rem(300);

  @include media-breakpoint-down(md) {
    padding: rem(100) 0;
    flex-direction: column;
  }

  &__items {
    margin-left: rem(200);
    white-space: nowrap;
    display: flex;

    @include media-breakpoint-down(md) {
      margin-left: 0;
      margin-top: rem(48);
      padding-left: rem(24);
      padding-right: rem(24);
      flex-direction: column;
      white-space: normal;
    }
  }

  &__item {
    @include media-breakpoint-down(md) {
      width: 100%;
      margin-bottom: rem(48);

      img {
        width: 100%;
      }
    }
    &:nth-child(1) {
      @include media-breakpoint-up(md) {
        margin-right: rem(300);
        width: rem(600);
      }
    }

    &:nth-child(2) {
      @include media-breakpoint-up(md) {
        margin-right: rem(110);
        transform: translateY(rem(100));
      }
      img {
        @include media-breakpoint-up(md) {
          width: rem(450);
          height: rem(455);
        }
      }
    }
    &:nth-child(3) {
      @include media-breakpoint-up(md) {
        margin-right: rem(110);
        transform: translateY(rem(-100));
      }
      img {
        @include media-breakpoint-up(md) {
          width: rem(450);
          height: rem(400);
        }
      }
    }
    &:nth-child(4) {
      @include media-breakpoint-up(md) {
        transform: translateY(rem(50));
      }
      img {
        @include media-breakpoint-up(md) {
          width: rem(500);
          height: rem(500);
        }
      }
    }
  }
}
</style>
