<template>
  <BaseModal class="standings-modal-wrapper" @closeModal="onClose">
    <div class="standings-popup border-radius-xl">
      <div class="standings-popup__tabs d-flex position-relative">
        <div
          class="standings-popup__tab text-center cursor-pointer d-flex justify-content-center align-items-center w-50 pt-8 pt-md-16 pb-10 pb-md-16 font-semi-bold font-size-16-md font-size-18"
          :class="activeTab === 1 ? 'font-color-accent-primary' : 'font-color-label-secondary'"
          @click="activeTab = 1"
        >
          {{ $t('common.champions_league') }}
        </div>
        <div
          class="standings-popup__tab text-center cursor-pointer d-flex justify-content-center align-items-center w-50 pt-8 pt-md-16 pb-10 pb-md-16 font-semi-bold font-size-16-md font-size-18"
          :class="activeTab === 2 ? 'font-color-accent-primary' : 'font-color-label-secondary'"
          @click="activeTab = 2"
        >
          {{ $t('common.georgian_championship') }}
        </div>
        <div class="standings-popup__active-marker position-absolute" :class="activeTab === 1 ? 'left' : 'right'" />
      </div>
      <div class="d-none d-md-block">
        <Standings v-if="activeTab === 1" :table="championships.champions_league" :play-off="championships.play_off || []" />
        <Standings v-else :table="championships.georgian_championship" :play-off="championships.play_off || []" />
      </div>
      <div class="d-md-none">
        <StandingsMobile v-if="activeTab === 1" :table="championships.champions_league" :play-off="championships.play_off || []" />
        <StandingsMobile v-else :table="championships.georgian_championship" :play-off="championships.play_off || []" />
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '../common/BaseModal';

export default {
  name: 'StandingsPopup',
  components: { BaseModal },
  props: {
    championships: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 1,
    };
  },
  methods: {
    onClose() {
      this.$emit('closePopup');
    },
  },
};
</script>

<style lang="scss">
.standings-modal-wrapper {
  @include media-breakpoint-up(md) {
    top: 0;
    height: 100%;
  }

  .modal__content {
    height: 100%;
  }
}

.standings-popup {
  background-color: $label-white;
  width: 74vw;
  overflow: auto;

  @include media-breakpoint-up(md) {
    transform: translateY(-50%);
    top: 50%;
    position: relative;
    max-height: 90%;
  }

  @include media-breakpoint-down(md) {
    width: 100vw;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__tabs {
    border-bottom: 2px solid $gray-scale-300;
  }

  &__tab {
    @include media-breakpoint-down(md) {
      font-size: 16px;
      line-height: 1.3;
    }
  }

  &__active-marker {
    background-color: $accent-primary;
    bottom: -2px;
    left: 0;
    width: 50%;
    height: 2px;

    &.left {
      left: 0;
    }

    &.right {
      left: auto;
      right: 0;
    }
  }
}
</style>
