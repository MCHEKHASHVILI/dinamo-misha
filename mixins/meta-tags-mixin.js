export default {
  head() {
    return {
      title: this.metaTags.og_title || 'WPC Dinamo Tbilisi',
      meta: [
        { hid: 'description', name: 'description', content: this.metaTags.og_description || '' },
        { hid: 'og:title', name: 'og:title', content: this.metaTags.og_title || '' },
        { hid: 'og:description', name: 'og:description', content: this.metaTags.og_description || '' },
        { hid: 'og:image', name: 'og:image', content: this.metaTags.og_image || '' },
      ],
    };
  },
};
