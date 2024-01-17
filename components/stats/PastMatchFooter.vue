<template>
  <article class="past-match-footer d-flex flex-column align-items-center justify-content-start">
    <BaseButtonGrey class="past-match-footer__button d-flex d-flex align-items-center justify-content-center w-100">
      <span class="base-button__text w-100 text-align-center font-size-16 font-size-14-md font-regular">
        {{ $t('stats.see_game_details') }}
      </span>
    </BaseButtonGrey>
  </article>
</template>

<script>
import BaseButtonGrey from '../common/BaseButtonGrey';
export default {
  name: 'PastMatchFooter',
  components: { BaseButtonGrey },
};
</script>

<style lang="scss"></style>
