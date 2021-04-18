import Vue from 'vue';
import Vuex from 'vuex';

import topRepos from './topRepos';
import favoriteRepos from './favoriteRepos';
import viewport from './viewport';
import notifications from './notifications';

Vue.use(Vuex);

export const appStore = {
  modules: {
    topRepos,
    favoriteRepos,
    viewport,
    notifications,
  },
  strict: true,
  namespaced: true,
};

export default new Vuex.Store(appStore);
