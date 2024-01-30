<template>
  <div class="monitor-wrapper">
    <div class="monitor-content-wrapper scalable">
      <a id="home-monitor" class="home-monitor cursor-pointer text-decoration-none d-flex align-items-center justify-content-between text-center" @click="monitorClickHandler">
        <div class="home-monitor__team d-flex flex-column justify-content-between h-100 align-items-center flex-1">
          <img :src="hostLogo" alt="" class="home-monitor__img" />
          <h3 class="home-monitor__title font-semi-bold font-color-label-primary">{{ hostTeamName }}</h3>
        </div>
        <div v-if="!data.game_data.finished && data.game_data.live_url" class="home-monitor__live bg-color-red font-color-label-white font-regular">LIVE</div>
        <div v-else class="d-flex flex-column">
          <div v-if="data.game_data.dinamo_goals" class="home-monitor__stats font-color-label-primary font-regular mb-4">{{ hostGoals }} - {{ guestGoals }}</div>
          <div v-if="data.game_data.match_date" class="home-monitor__date font-color-label-primary font-regular">{{ data.game_data.match_date | moment('DD.MM.YY') }}</div>
        </div>
        <div class="home-monitor__team d-flex flex-column justify-content-between h-100 align-items-center flex-1">
          <img :src="guestLogo" alt="" class="home-monitor__img" />
          <h3 class="home-monitor__title font-semi-bold font-color-label-primary">{{ guestTeamName }}</h3>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Monitor',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hostTeamName() {
      return this.data.game_data.guest_match ? this.data.game_data.second_team.title : this.data.og_title;
    },
    hostLogo() {
      return this.data.game_data.guest_match ? this.data.game_data.second_team.logo : '/logo.png';
    },
    hostGoals() {
      return this.data.game_data.guest_match ? this.data.game_data.second_team_goals : this.data.game_data.dinamo_goals;
    },
    guestTeamName() {
      return !this.data.game_data.guest_match ? this.data.game_data.second_team.title : this.data.og_title;
    },
    guestLogo() {
      return !this.data.game_data.guest_match ? this.data.game_data.second_team.logo : '/logo.png';
    },
    guestGoals() {
      return !this.data.game_data.guest_match ? this.data.game_data.second_team_goals : this.data.game_data.dinamo_goals;
    },
  },
  methods: {
    monitorClickHandler() {
      if (!this.data.game_data.finished && this.data.game_data.live_url) {
        window.open(this.data.game_data.live_url);
      } else {
        this.$router.push(this.localePath({ name: 'stats' }));
      }
    },
  },
};
</script>

<style lang="scss">
//.main-page__zoom-container {
//  .home-monitor {
//    top: calc(100% - 50vw);
//  }
//}

.monitor-wrapper {
  @include abs-position(27%, 7.5%, auto, auto);
  width: 15vw;
  height: 6.3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  @include media-breakpoint-down(md) {
    width: 15%;
    height: 8.75%;
  }
}

.mointor-content-wrapper {
  width: 15vw;
  height: 6.3vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-monitor {
  width: 15vw;
  height: 6.3vw;
  z-index: 1;
  padding: rem(20) rem(15);
  transform: rotate(33deg) skew(33deg);

  @include media-breakpoint-down(md) {
    padding: 2px 3px;
  }

  &__team {
    width: calc(100% / 2);
  }

  &__img {
    max-width: 2.6vw;
    max-height: 2.6vw;
    backface-visibility: hidden;
  }

  &__title {
    backface-visibility: hidden;
    font-size: 0.6vw;
    margin-top: 0.2vw;
    padding-left: 2%;
    padding-right: 2%;

    @include media-breakpoint-down(md) {
      font-size: 3px;
    }
  }

  &__live {
    animation: fadeinout 1.5s ease infinite;
    font-size: 0.7vw;
    padding: 0.3vw 0.4vw;

    @include media-breakpoint-down(md) {
      max-width: 3vw;
      font-size: 3px;
      padding: 1px 2px !important;
    }
  }

  &__stats {
    font-size: 1vw;

    @include media-breakpoint-down(md) {
      font-size: 3px;
    }
  }

  &__date {
    font-size: 0.7vw;

    @include media-breakpoint-down(md) {
      font-size: 3px;
    }
  }
}

@keyframes fadeinout {
  0%,
  100% {
    opacity: 0;
  }
  40%,
  60% {
    opacity: 1;
  }
}
</style>
