const state = {
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

const mutations = {
  SET_VIEWPORT(state) {
    state.viewport.width = window.innerWidth;
    state.viewport.height = window.innerHeight;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
