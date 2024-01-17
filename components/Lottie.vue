<template>
  <div ref="container" :style="style"></div>
</template>

<script>
import lottie from 'lottie-web';
export default {
  name: 'Lottie',
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.container,
      renderer: 'svg',
      loop: this.options.loop !== false,
      autoplay: this.options.autoplay !== false,
      animationData: this.options.animationData.default, // ここだけ変更何故かデフォルトを入れないと動かなかった… (要検証)
      rendererSettings: this.options.rendererSettings,
    });
    this.$emit('animCreated', this.anim);
  },
};
</script>
