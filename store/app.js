export const state = () => ({
  scroll: {
    isScrolling: false,
    limit: {
      x: 0,
      y: 0,
    },
    x: 0,
    y: 0,
  },
  websiteLoaded: false,
});

export const mutations = {
  setScroll: (state, payload) => {
    state.scroll = Object.assign({}, state.scroll, payload);
  },
  SET_WEBSITE_LOADING_STATUS: (state) => {
    state.websiteLoaded = true;
  },
};

export const getters = {
  getScrollXProgress: (state) => {
    let progress = Math.round((state.scroll.x / state.scroll.limit.x) * 100);
    if (progress > 100) {
      progress = 100;
    }
    return progress || 0;
  },
  getScrollYProgress: (state) => {
    let progress = Math.round((state.scroll.y / state.scroll.limit.y) * 100);
    if (progress > 100) {
      progress = 100;
    }
    return !isNaN(progress) ? progress : 0;
  },
  getScroll: (state) => {
    return state.scroll;
  },
};
