<template>
  <main>
    <Loader v-if="!websiteLoaded" />
    <Nuxt />
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '../components/Loader';
export default {
  name: 'DefaultLayout',
  components: { Loader },
  computed: { ...mapState('app', { websiteLoaded: (state) => state.websiteLoaded }) },
  watch: {
    '$i18n.locale'(to) {
      this.$moment.locale(to);
    },
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });

    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        ...i18nHead.htmlAttrs,
      },
    };
  },
};
</script>
