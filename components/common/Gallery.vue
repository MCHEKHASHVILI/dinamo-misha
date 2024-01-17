<template>
  <BaseModal class="d-flex align-items-center" @closeModal="$emit('close')">
    <div class="gallery d-flex justify-content-around align-items-center">
      <div class="gallery-modal__container text-center">
        <div class="position-relative">
          <div class="gallery-modal__images-container w-100 position-relative overflow-hidden d-flex justify-content-around align-items-center">
            <picture v-for="(image, k) in images" :key="k" :class="{ active: activeImage === k }" class="gallery-modal__image align-items-center d-flex position-absolute">
              <img :src="image" alt="" class="overflow-hidden m-auto" />
            </picture>
          </div>
        </div>
        <div class="gallery-modal__images-arrows-wrapper position-relative mt-md-16">
          <div :class="{ disabled: activeImage === 0 }" class="gallery-modal__images-container-arrow gallery-modal__images-container-arrow--left cursor-pointer d-none d-md-inline-block position-absolute p-y-center" @click="moveSlideLeft(activeImage > 0)">
            <SvgIcon name="classic-arrow" />
          </div>
          <div :class="{ disabled: activeImage >= images.length - 1 }" class="gallery-modal__images-container-arrow gallery-modal__images-container-arrow--right cursor-pointer d-none d-md-inline-block position-absolute p-y-center" @click="moveSlideRight(activeImage < images.length - 1)">
            <SvgIcon name="classic-arrow" />
          </div>
          <div class="gallery-modal__gallery-wrapper overflow-hidden d-inline-block">
            <div ref="gallery" :style="`transform: translateX(${galleryThumbsPosX}px)`" class="gallery-modal__gallery text-nowrap">
              <div v-for="(image, k) in images" :key="k" :style="`background-image: url(${image})`" class="gallery-modal__gallery-item position-relative d-inline-block bg-cover cursor-pointer" :class="{ active: activeImage === k }" @click="moveThumbs(k)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal';
export default {
  name: 'Gallery',
  components: { BaseModal },
  props: {
    images: {
      type: [Array, Object],
      required: true,
    },
    setActiveIndex: {
      type: Number,
      default: 0,
    },
    isOld: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeImage: 0,
      galleryThumbsPosX: 0,
      thumbShapeX: 0,
    };
  },
  mounted() {
    addEventListener('keydown', this.onKeyDownHandler);
    this.moveThumbs(this.setActiveIndex);
  },
  beforeDestroy() {
    removeEventListener('keydown', this.onKeyDownHandler);
  },
  methods: {
    /**
     * Close popup (modal)
     */
    closePopup() {
      this.activeImage = 0;
      this.moveGalleryThumbs();
      this.$emit('close');
    },
    /**
     * Move slide to left side
     */
    moveSlideLeft(allowed) {
      if (allowed) {
        this.activeImage--;
        this.moveGalleryThumbs();
      }
    },
    /**
     * Move slide to right side
     */
    moveSlideRight(allowed) {
      if (allowed) {
        this.activeImage++;
        this.moveGalleryThumbs();
      }
    },
    /**
     * key down event handler
     * @param e event
     */
    onKeyDownHandler(e) {
      switch (e.which) {
        case 37: // left
          if (!this.activeImage < 1) this.moveSlideLeft(true);
          break;

        case 39: // right
          if (!(this.images.length - 2 < this.activeImage)) this.moveSlideRight(true);
          break;

        case 27: // ESC
          this.closePopup();
          break;

        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    },
    /**
     * Move gallery content inside image gallery wrapper
     */
    moveGalleryThumbs() {
      const itemOffsetWidth = this.$refs.gallery.offsetWidth / 5;

      if (this.images.length > 5) {
        if (this.activeImage > this.images.length - 4) {
          this.galleryThumbsPosX = itemOffsetWidth * -(this.images.length - 5);
        } else if (this.activeImage < 4) {
          this.galleryThumbsPosX = 0;
        } else {
          this.galleryThumbsPosX = itemOffsetWidth * -(this.activeImage - 3);
        }
      }

      // Move thumbs shape
      this.thumbShapeX = itemOffsetWidth * this.activeImage;
    },
    moveThumbs(index) {
      this.activeImage = index;
      this.moveGalleryThumbs();
    },
  },
};
</script>

<style lang="scss">
.gallery-modal {
  &__container {
    width: vw(1170);

    @include media-breakpoint-down(md) {
      width: 100vw;
    }

    &-close {
      svg {
        width: rem(24);
        height: rem(24);
      }
    }
  }

  &__images-arrows-wrapper {
    @include media-breakpoint-down(md) {
      position: absolute !important;
      //height: 20vh;
      //top: 85%;
      //transform: translateY(-50%);
      left: 0;
      width: 100%;

      height: auto;
      top: auto;
      bottom: 1rem;
      transform: translateY(0);
    }
  }

  &__images-container {
    height: 60vh;

    &-arrow {
      top: 50%;
      @include media-breakpoint-down(md) {
        padding: rem(22) rem(16);
        // ground: rgba($label-primary, 0.5);
      }
      &.disabled {
        cursor: not-allowed;
        // opacity: 0.5;
        svg {
          fill: $gray-scale-200 !important;
        }
      }
      svg {
        width: rem(20);
        height: rem(35);
        fill: $label-white;
        transition: fill 0.3s ease;

        &:hover {
          fill: $gray-scale-200;
        }
      }

      &--left {
        left: rem(100);
        transform: rotate(180deg) translateY(50%);
        @include media-breakpoint-down(md) {
          left: 0;
        }
      }

      &--right {
        right: rem(100);
        transform: translateY(-50%);
        @include media-breakpoint-down(md) {
          right: 0;
        }
      }
    }
  }

  &__image {
    transition: all 0.2s ease;
    opacity: 0;
    visibility: hidden;
    height: 100%;
    width: 100%;

    img {
      max-height: 100%;
      max-width: 100%;
    }

    &.active {
      visibility: visible;
      opacity: 1;
    }
  }

  &__gallery-wrapper {
    width: calc(100% - #{rem(300)});
    @include media-breakpoint-down(md) {
      width: calc(100% - 30px);
      margin: auto;
    }
  }

  &__gallery {
    margin: 0 -0.4rem;
    transition: transform 0.3s ease;
  }

  &__gallery-item {
    height: 5vw;
    margin: 0 0.4rem;
    width: calc((100% / 5) - 0.8rem);
    opacity: 0.3;
    transition: opacity 0.3s ease;

    @include media-breakpoint-down(md) {
      //width: calc((100% / 5) - 4px);
      height: 14vw;
    }

    &.active {
      opacity: 1;
    }
  }
}
</style>
