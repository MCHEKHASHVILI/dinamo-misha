<template>
  <article class="greatest-team bg-color-gray-scale-500 d-flex align-items-center justify-content-between">
    <CommonTextDesc class="mr-md-48" :title="data.title" :description="data.description" />
    <div class="greatest-team__image-container position-relative">
      <img src="/about/greate.png" alt="" class="greatest-team__img" />
      <div v-for="player in players[$i18n.locale]" :key="player" class="greatest-team__player-container">
        <div class="greatest-team__player-dots"></div>
        <div class="greatest-team__player px-6 py-4 py-sm-8 bg-color-label-white font-semi-bold font-size-14 z-index-1">{{ player }}</div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'GreatestTeam',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      players: {
        en: ['Nodar Gvakharia', 'Irakli Chkhikvadze', 'Jumber Tsiklauri', 'Jimi Tortsladze', 'Boris Margievi', 'Utsnobi', 'Iashvili', 'Soso Nizharadze', 'Zurab Lomidze', 'Boris Megedi', 'Givi Chikvanaia', 'Vasil Sanadze', 'Malkhaz Kapanadze', 'Leri Gogoladze'],
        ka: ['ნოდარ გვახარია', 'ირაკლი ჩხიკვაძე', 'ჯუმბერ წიკლაური', 'ჯიმი თორთლაძე', 'ბორის მარგიევი', 'უცნობი', 'იაშვილი', 'სოსო ნიჟარაძე', 'ზურაბ ლომიძე', 'ბორის მეგედი', 'გივი ჩიქვანაია', 'ვასილ სანაძე', 'მალხაზ კაპანაძე', 'ლერი გოგოლაძე'],
      },
    };
  },
};
</script>

<style lang="scss">
.greatest-team {
  @include media-breakpoint-up(md) {
    padding-left: rem(300);
    padding-right: rem(300);
    height: 100vh;
  }

  @include media-breakpoint-down(md) {
    flex-direction: column;
    padding-top: rem(100);
    padding-bottom: rem(100);
  }

  &__image-container {
    @include media-breakpoint-down(md) {
      margin-top: rem(48);
    }
  }

  &__img {
    max-width: rem(1000);

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__player-container {
    position: absolute;
    width: 16px;
    height: 16px;
    left: 10%;
    top: 34%;

    @include media-breakpoint-down(md) {
      left: 9%;
    }

    &:nth-of-type(2) {
      left: 19%;
      top: 37%;

      @include media-breakpoint-down(md) {
        left: 17%;
      }
    }

    &:nth-of-type(3) {
      left: 27%;
      top: 37%;
      @include media-breakpoint-down(md) {
        left: 26%;
      }
    }

    &:nth-of-type(4) {
      left: 37%;
      top: 32%;

      @include media-breakpoint-down(md) {
        left: 36%;
      }
    }

    &:nth-of-type(5) {
      left: 44%;
      top: 37%;
      @include media-breakpoint-down(md) {
        left: 43%;
      }
    }

    &:nth-of-type(6) {
      left: 52%;
      top: 37%;

      @include media-breakpoint-down(md) {
        left: 50%;
      }
    }

    &:nth-of-type(7) {
      left: 60%;
      top: 37%;
      @include media-breakpoint-down(md) {
        left: 58%;
      }
    }

    &:nth-of-type(8) {
      left: 72%;
      top: 30%;
    }

    &:nth-of-type(9) {
      left: 88%;
      top: 30%;
    }

    &:nth-of-type(10) {
      left: 21%;
      top: 62%;

      @include media-breakpoint-down(md) {
        left: 19%;
      }
    }

    &:nth-of-type(11) {
      left: 34%;
      top: 62%;

      @include media-breakpoint-down(md) {
        left: 32%;
      }
    }

    &:nth-of-type(12) {
      left: 44%;
      top: 62%;
    }

    &:nth-of-type(13) {
      left: 59%;
      top: 62%;

      @include media-breakpoint-down(md) {
        left: 57%;
      }
    }

    &:nth-of-type(14) {
      left: 74%;
      top: 62%;
      @include media-breakpoint-down(md) {
        left: 71%;
      }
    }

    &:hover,
    &:active {
      .greatest-team__player {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  $dot-width: 10px;
  &__player-dots {
    width: $dot-width * 2;
    height: $dot-width * 2;
    background: rgba($label-white, 0.4);
    border-radius: 50%;
    transition: transform 0.3s ease;

    &:hover,
    &:active {
      transform: scale(2);
      @include media-breakpoint-down(sm) {
        transform: scale(1.2);
      }
    }

    &::before {
      transition: all 0.3s ease;

      width: $dot-width;
      height: $dot-width;
      background: $label-white;
      border-radius: 50%;
      @include abs-position(calc($dot-width / 2), auto, auto, calc($dot-width / 2));
      content: '';
    }
  }

  &__player {
    @include abs-position(calc(100% + 22px), auto, auto, 50%);

    transform: translateX(-50%);
    border-radius: 12px;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    transition: all 0.15s ease;

    &::before {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -11px;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 12px 12px 12px;
      border-color: transparent transparent #fff transparent;
    }
  }
}
</style>
