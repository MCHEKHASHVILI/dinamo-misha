<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <form class="academy-form-modal bg-white border-radius-xl px-24 pb-28 pt-24" @submit.prevent="handleSubmit(onSubmit)">
      <div v-if="success" class="academy-form-modal__success py-24 py-md-48 text-center m-auto">
        <div class="academy-form-modal__success-icon-wrapper border-radius-50 d-flex align-items-center justify-content-center m-auto">
          <SvgIcon name="check-success" class="academy-form-modal__success-icon svg-fill-label-white" />
        </div>
        <h5 class="font-color-label-primary font-semi-bold mt-12 font-size-24">{{ $t('academy.success_msg_title') }}</h5>
        <div class="font-size-18 font-color-label-secondary font-regular mt-6 line-height-1-4">{{ $t('academy.success_msg_desc') }}</div>
      </div>
      <div v-else>
        <h2 class="font-regular font-color-label-primary font-size-24 mb-18">{{ $t('academy.join_our_academy') }}</h2>

        <div class="d-flex flex-column flex-md-row flex-md-wrap academy-form-modal__package-wrapper mb-28 overflow-auto">
          <div v-for="item in packages" :key="item.type" class="academy-form-modal__package flex-1 w-100">
            <input :id="item.type" v-model="form.package" :value="item" type="radio" name="package" class="academy-form-modal__checkmark hidden" />
            <label :for="item.type" class="cursor-pointer position-relative border-radius-xl d-flex flex-column">
              <div class="academy-form-modal__package-content z-index-1 relative d-flex flex-column justify-content-between align-items-center border-radius-xl p-12 h-100">
                <div class="mb-16 d-flex flex-column align-items-center">
                  <div class="academy-form-modal__package-icon-wrapper mb-4 border-radius-50 d-flex align-items-center justify-content-center">
                    <SvgIcon :name="`academy-package-${item.type}`" class="academy-form-modal__icon svg-fill-label-white" />
                  </div>
                  <h4 class="font-regular font-color-label-white font-size-14 line-height-1-5">{{ item.title }}</h4>
                </div>
                <div class="academy-form-modal__price bg-color-label-white py-4 px-5 border-radius-l">
                  <p class="font-regular font-size-14 d-flex align-items-end">{{ item.price }} <SvgIcon name="lari" class="academy-form-modal__currency-icon" /></p>
                </div>
              </div>
              <div class="academy-form-modal__radio-icon"></div>
            </label>
          </div>
        </div>

        <div>
          <ValidationProvider v-slot="{ errors }" rules="required" name="branch">
            <div class="academy-form-modal__input-wrapper w-100 mb-28">
              <select v-model="form.branch" type="text" :placeholder="$t('academy.branch')" class="w-100" :class="{ error: errors.length > 0 }">
                <option value="null" selected disabled>{{ $t('academy.branch') }}</option>
                <option value="1">Main Branch</option>
                <option value="2">Second Branch</option>
              </select>
              <span v-if="errors.length > 0" class="academy-form-modal__input-error font-regular">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" rules="required" name="name">
            <div class="academy-form-modal__input-wrapper w-100 mb-28">
              <input v-model="form.name" type="text" :placeholder="$t('academy.tell_full_name')" class="w-100" :class="{ error: errors.length > 0 }" />
              <span v-if="errors.length > 0" class="academy-form-modal__input-error font-regular">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" rules="required" name="number">
            <div class="academy-form-modal__input-wrapper w-100 mb-28">
              <input v-model="form.number" type="tel" :placeholder="$t('academy.tell_number')" class="w-100" :class="{ error: errors.length > 0 }" />
              <span v-if="errors.length > 0" class="academy-form-modal__input-error font-regular">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="text-decoration-none d-flex align-items-center flex-wrap">
          <BaseButton type="submit" :disabled="invalid || isLoading" class="d-flex justify-content-between align-items-center">
            <span class="mr-32">{{ $t('academy.join_academy') }}</span>
            <SvgIcon name="right-arrow" class="academy-form-modal__submit-button svg-fill-label-white" />
          </BaseButton>
          <div v-if="hasError" class="font-regular font-size-14 font-color-red mt-6 mt-md-0 ml-md-12">{{ $t('academy.error_message') }}</div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate';
import BaseButton from '../../common/BaseButton.vue';
export default {
  name: 'AcademyFormModal',
  components: {
    ValidationProvider,
    ValidationObserver,
    BaseButton,
  },
  props: {
    packages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: { name: null, number: null, package: null },
      isLoading: false,
      success: false,
      hasError: false,
    };
  },
  watch: {
    '$i18n.locale': {
      handler(code) {
        import(`@/assets/error-messages/${code}.json`).then((locale) => {
          localize(code, locale);
        });
      },
      immediate: true,
    },
  },
  mounted() {
    this.form.package = this.packages[0];
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      this.$nuxt.$loading.start();
      this.hasError = false;

      const formData = {
        name: this.form.name,
        number: this.form.number,
        package: this.form.package.type,
      };
      this.$axios
        .$post('/academy-registration', formData, {})
        .then(() => {
          this.success = true;

          setTimeout(() => {
            this.$emit('close');
            this.success = false;
          }, 5000);
        })
        .catch((error) => {
          this.hasError = true;
          // eslint-disable-next-line no-console
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.$nuxt.$loading.finish();
        });
    },
  },
};
</script>

<style lang="scss">
.academy-form-modal {
  @include media-breakpoint-up(md) {
    width: rem(760);
  }

  &__submit-button {
    width: rem(16);
    height: rem(16);
  }

  &__input-wrapper {
    input {
      border: none;
      outline: none;
      border-bottom: 1px solid $gray-scale-400;
      padding-bottom: rem(24);
      font-size: rem(18);
      color: $label-primary;
      &::placeholder {
        color: $label-secondary;
      }

      &.error {
        border-bottom: 1px solid $danger;
      }
    }

    select {
      border: none;
      outline: none;
      border-bottom: 1px solid $gray-scale-400;
      padding-bottom: rem(24);
      font-size: rem(18);
      color: $label-primary;
      &::placeholder {
        color: $label-secondary;
      }
    }
  }

  &__radio-icon {
    width: 18px;
    height: 18px;
    position: absolute;
    left: rem(12);
    top: rem(12);
    z-index: 1;
    border-radius: 50%;
    border: 1px solid $label-white;

    &::after {
      width: 8px;
      height: 8px;
      content: '';
      background: $label-white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      visibility: hidden;
      opacity: 0;
      transition: all 0.15s ease;

      @include abs-position(50%, auto, auto, 50%);
    }
  }

  &__input-error {
    font-size: rem(14);
    color: $danger;
    margin-top: rem(8);
    display: inline-block;
  }

  &__package-icon-wrapper {
    width: rem(60);
    height: rem(60);
    background-color: rgba($label-white, 0.1);
    background-size: cover;
    background-position: center;

    @include media-breakpoint-down(md) {
      width: rem(48);
      height: rem(48);
    }
  }

  &__icon {
    max-width: rem(26);
    max-height: rem(30);
  }

  &__package-wrapper {
    margin-left: rem(-16);
    margin-right: rem(-16);
  }

  &__checkmark:checked {
    ~ label {
      &::after,
      &::before {
        visibility: visible;
        opacity: 1;
      }

      .academy-form-modal__radio-icon {
        &::after {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }

  &__price {
    color: $package-blue;
    svg {
      fill: $package-blue;
    }
  }

  &__package {
    @include media-breakpoint-down(md) {
      width: rem(200);
    }

    &:nth-child(2) {
      label {
        &::after {
          background: $package-green;
        }
        .academy-form-modal__package-content {
          background-color: $package-green;
        }
      }

      .academy-form-modal__price {
        color: $package-green;
        svg {
          fill: $package-green;
        }
      }
    }

    &:nth-child(3) {
      label {
        &::after {
          background: $package-red;
        }

        .academy-form-modal__package-content {
          background-color: $package-red;
        }
      }
      .academy-form-modal__price {
        color: $package-red;
        svg {
          fill: $package-red;
        }
      }
    }
  }

  label {
    margin: rem(16);

    &::after,
    &::before {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + #{rem(8)});
      height: calc(100% + #{rem(8)});
      border-radius: rem(14);
      background: $package-blue;
      content: '';
      visibility: hidden;
      opacity: 0;
      transition: all 0.15s ease;
    }

    &:hover {
      &::after,
      &::before {
        visibility: visible;
        opacity: 1;
      }
    }

    &::before {
      z-index: 1;
      background: $label-white;
    }

    &::after {
      width: calc(100% + #{rem(12)});
      height: calc(100% + #{rem(12)});
      background: $package-blue;
    }

    .academy-form-modal__package-content {
      background-color: $package-blue;
    }
  }

  &__currency-icon {
    height: rem(12);
    max-width: rem(14);
  }

  &__success {
    max-width: rem(250);
  }

  &__success-icon-wrapper {
    width: rem(106);
    height: rem(106);
    background: $package-green;
  }

  &__success-icon {
    width: rem(44);
    height: rem(49);
  }
}
</style>
