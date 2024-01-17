<template>
  <article class="related-news p-8 border-radius-m d-flex align-items-center">
    <img :src="data.list_cover_image" alt="" class="related-news__img border-radius-m object-fit-cover mr-24" />
    <div class="related-news__text">
      <div class="font-size-18 font-regular font-color-label-primary line-height-1-5">{{ data.title }}</div>
    </div>
    <SvgIcon name="related-news-arrow" class="related-news__arrow svg-fill-label-secondary mr-4" />
  </article>
</template>

<script>
export default {
  name: 'RelatedNews',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.related-news {
  border: 1px solid $gray-scale-300;
  &__text {
    width: rem(344);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &__img {
    width: rem(100);
    height: rem(83);
  }
  &__arrow {
    width: 24px;
    height: 24px;
    margin-left: auto;
    transition: transform;
  }
}
</style>
