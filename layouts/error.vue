<template>
  <main class="error horizontal-page d-flex justify-content-between">
    <div class="horizontal-page__navigation position-sticky">
      <LeftNavigationMenu />
    </div>
    <div class="error__content horizontal d-flex flex-column justify-content-center pb-32">
      <img src="/error.svg" alt="" />
      <div v-if="error.statusCode === 404">
        <div class="font-size-24 font-color-label-primary font-regular mb-8 font-regular mt-16">Page not found</div>
        <div class="font-size-15 font-color-label-secondary font-regular font-regular line-height-1-3">The page you were looking for could not be found. It might have been removed, renamed,or did not exist in the first place</div>
      </div>
      <div v-else>
        <div class="font-size-24 font-color-label-secondary font-regular mt-4 mb-8 font-regular">An error occurred</div>
        <div class="font-size-15 font-color-label-secondary font-regular font-regular line-height-1-3">An error occurred</div>
      </div>
      <NuxtLink to="/" class="mt-24">
        <BaseButtonGrey>Go to the Home Page</BaseButtonGrey>
      </NuxtLink>
    </div>
  </main>
</template>

<script>
import BaseButtonGrey from '../components/common/BaseButtonGrey';
import LeftNavigationMenu from '../components/left-navigation-menu/LeftNavigationMenu';
export default {
  name: 'Error',
  components: { LeftNavigationMenu, BaseButtonGrey },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  layout: 'blog', // you can set a custom layout for the error page
};
</script>

<style lang="scss">
.error {
  &__content {
    max-width: rem(600);
    padding-left: rem(130);

    img {
      width: rem(320);
    }
  }
  .horizontal {
    margin-left: $left-offset;
    height: 100vh;
    display: flex;

    @include media-breakpoint-down(md) {
      padding-left: 0;
      height: auto;
      display: block !important;
    }
  }
}
</style>
