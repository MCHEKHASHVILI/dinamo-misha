<template>
  <div class="home-header w-100 d-flex justify-content-between">
    <NuxtLink :to="localePath({ name: 'index' })">
      <Logo class="left-navigation-menu__logo" />
    </NuxtLink>

    <NuxtLink :to="localePath({ name: 'academy' })" class="text-decoration-none">
      <BaseButton class="home-header__academy-button w-auto d-flex justify-content-between d-flex align-items-center">
        <span class="base-button__text mr-20 font-regular">{{ $t('academy.join_academy') }}</span>
        <SvgIcon name="right-arrow" class="base-button__icon" />
      </BaseButton>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
};
</script>

<style lang="scss">
.home-header {
  pointer-events: auto;
}
</style>
