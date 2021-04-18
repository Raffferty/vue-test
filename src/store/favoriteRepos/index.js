const getInitialState = () => {
  return {
    favoriteRepos: [],
  };
};

const mutations = {
  ADD_TO_FAVORITE_REPOS(state, repo) {
    state.favoriteRepos = [...state.favoriteRepos, repo];
  },
  DELETE_FROM_FAVORITE_REPOS(state, id) {
    state.favoriteRepos = state.favoriteRepos.filter((r) => r.id !== id);
  },
};

const getters = {
  favoriteRepos: (state) => state.favoriteRepos,
  favoriteReposCount: (state) => state.favoriteRepos.length,
};

const actions = {
  addToFavoriteRepos({ commit }, repo) {
    commit('ADD_TO_FAVORITE_REPOS', repo);
  },

  setNoFavoriteInRepos({ commit, dispatch }, id) {
    commit('DELETE_FROM_FAVORITE_REPOS', id);

    dispatch('topRepos/setNoFavoriteInRepos', id, { root: true });
  },
};

export default {
  state: getInitialState,
  mutations,
  getters,
  actions,
  namespaced: true,
};
