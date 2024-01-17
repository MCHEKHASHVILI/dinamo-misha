<template>
  <NewsListVideo v-if="data.video" :data="data" :reverse="reverse" />
  <NewsListImage v-else :data="data" :reverse="reverse" />
</template>

<script>
import NewsListImage from './NewsListImage.vue';
import NewsListVideo from './NewsListVideo.vue';
export default {
  name: 'NewsListItem',
  components: { NewsListImage, NewsListVideo },
  props: {
    data: {
      type: Object,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
