<template>
  <article class="live-match-footer d-flex flex-column align-items-center justify-content-start">
    <div class="live-match-footer__text position-relative font-regular font-size-14 line-height-1-4 pr-7 mb-8">live</div>
    <BaseButton class="live-match-footer__button d-flex d-flex align-items-center w-100" @click.native="onClick">
      <SvgIcon name="play-white" class="base-button__icon" />
      <span class="base-button__text w-100 text-align-center font-regular font-size-16 font-size-14-md">{{ $t('stats.watch_live') }}</span>
    </BaseButton>
  </article>
</template>

<script>
import BaseButton from '../common/BaseButton';
export default {
  name: 'LiveMatchFooter',
  components: { BaseButton },
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClick() {
      window.open(this.url, '_blank');
    },
  },
};
</script>

<style lang="scss">
.live-match-footer {
  .base-button__icon {
    width: rem(16);
    height: rem(16);
  }
  .base-button__text {
    justify-self: center;
  }

  &__text {
    color: #d26f85;
    text-transform: uppercase;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
      width: rem(10);
      height: rem(10);
      border-radius: 50%;
      background-color: #d26f85;
      animation: live 1.5s infinite;
    }
  }
}

@keyframes live {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
