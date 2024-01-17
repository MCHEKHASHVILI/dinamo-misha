<template>
  <button class="base-button-grey font-regular font-size-14">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButtonGrey',
};
</script>

<style lang="scss">
.base-button-grey {
  background: $gray-scale-500;
  border-radius: rem(12);
  padding: rem(14) rem(16) rem(16);
  color: $accent-primary;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: rem(14);
  transition: all 0.2s ease;
  width: rem(178);
  &:is(:hover, :active, :focus) {
    background: $gray-scale-300;
  }
}
</style>
