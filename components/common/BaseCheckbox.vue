<template>
  <label class="checkbox d-flex align-items-center cursor-pointer">
    <input :id="customValue" v-model="actualValue" :type="type" :value="customValue" class="hidden" :checked="checked" />
    <span :style="`--checkmark-color: ${checkmarkColor}`" class="checkbox__checkmark border-radius-xxs d-flex align-items-center justify-content-center">
      <SvgIcon name="check" class="checkbox__checkmark-icon svg-fill-label-white" />
    </span>
    <span class="checkbox__name font-regular text-nowrap flex-1 font-color-label-secondary font-size-16 line-height-1-5 ml-4">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    checkmarkColor: {
      type: String,
      default: '#1a1c1f',
    },
    customValue: {
      type: [String, Number, Boolean, Array],
      required: true,
    },
    value: {
      type: [Array, String],
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'checkbox',
    },
  },
  computed: {
    actualValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  // methods: {
  //   onChange(event) {
  //     const { checked, value } = event.target;
  //     this.$emit('input', checked ? value : '');
  //   },
  // },
};
</script>

<style lang="scss">
.checkbox {
  display: block;
  user-select: none;
  &__checkmark {
    left: 0;
    height: rem(18);
    width: rem(18);
    border: 1px solid $label-primary;
    background: $label-white;
    &-icon {
      width: rem(12);
      height: rem(12);
    }
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .checkbox__checkmark {
      background: var(--checkmark-color);
      border: 1px solid var(--checkmark-color);
    }
  }

  .checkbox__name {
    margin-left: 29px;
  }
}
</style>
