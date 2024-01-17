<template>
  <button v-bind="$attrs" class="base-button font-semi-bold font-size-16">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
};
</script>

<style lang="scss">
.base-button {
  background: $accent-primary;
  border-radius: 12px;
  padding: rem(14) rem(16) rem(16);
  color: $label-white;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: rem(14);
  transition: all 0.2s ease;
  &:is(:hover, :active, :focus) {
    background: $accent-primary-dark;
  }

  &:disabled {
    background: $label-secondary;
  }
}
</style>
