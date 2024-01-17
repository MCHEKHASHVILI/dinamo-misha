<template>
  <div class="breadcrumbs font-size-16 font-color-label-secondary font-semi-bold d-flex align-items-center">
    <NuxtLink :to="localePath({ name: linkKey })" class="breadcrumbs__link color-label-secondary">
      <div class="mr-6 font-size-14-md">{{ parent }}</div>
    </NuxtLink>
    <SvgIcon name="classic-arrow" class="breadcrumbs__arrow mr-6 mt-2" />
    <div class="font-color-label-primary font-size-14-md">{{ child }}</div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    parent: {
      type: String,
      required: true,
    },
    child: {
      type: String,
      required: true,
    },
    linkKey: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.breadcrumbs {
  &__arrow {
    height: 6px;
    width: 8px;
  }

  &__link {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
