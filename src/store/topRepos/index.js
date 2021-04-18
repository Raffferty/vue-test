import queryString from 'query-string';
import { API_URL, authorizationToken } from '@/config';
import { reposMapper } from '@/libs/reposMapper';

const getInitialState = () => {
  return {
    query: {
      q: 'is:public',
      sort: 'stars',
      order: 'desc',
      per_page: 100,
    },
    page: 1,
    repos: [],
    totalCount: 0,
    repoInfoToShow: null,
    isLoading: false,
    isLoadingMore: false,
    isSearching: false,
    error: null,
  };
};

const getters = {
  repos: (state) => state.repos,
  repoInfoToShow: (state) => state.repoInfoToShow,
  hasNext: (state) => {
    return state.totalCount > state.repos.length;
  },
  reposUrl: (state) =>
    `${API_URL}?${queryString.stringify({ ...state.query, page: state.page })}`,
};

const mutations = {
  ADD_TO_REPOS(state, repos) {
    state.repos = [...state.repos, ...repos];
  },

  CLEAR_REPOS(state) {
    state.repos = [];
  },

  SET_TOTAL_COUNT(state, totalCount) {
    state.totalCount = totalCount;
  },

  SET_NEXT_PAGE(state) {
    state.page = state.page + 1;
  },

  SET_QUERY_QUALIFIER(state, qualifier) {
    state.query = {
      q: qualifier,
      sort: 'stars',
      order: 'desc',
      per_page: 100,
    };
  },

  SET_REPO_INFO_TO_SHOW(state, repoInfoToShow) {
    if (repoInfoToShow) {
      state.repoInfoToShow = { ...repoInfoToShow };

      state.repos = state.repos.map((r) => {
        if (r.id === repoInfoToShow.id) {
          return {
            ...r,
            isActive: true,
          };
        } else {
          return {
            ...r,
            isActive: false,
          };
        }
      });
    } else {
      state.repoInfoToShow = repoInfoToShow;
    }
  },

  SET_IS_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },

  SET_IS_LOADING_MORE(state, isLoadingMore) {
    state.isLoadingMore = isLoadingMore;
  },

  SET_IS_SEARCHING(state, value) {
    state.isSearching = value;
  },

  SET_IS_FAVORITE(state, id) {
    state.repoInfoToShow = { ...state.repoInfoToShow, isFavorite: true };

    state.repos = state.repos.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          isFavorite: true,
        };
      } else {
        return r;
      }
    });
  },

  SET_NOT_FAVORITE_IN_REPOS(state, id) {
    state.repos = state.repos.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          isFavorite: false,
        };
      } else {
        return r;
      }
    });

    if (state.repoInfoToShow?.id === id) {
      state.repoInfoToShow.isFavorite = false;
    }
  },

  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async fetchRepos(
    { commit, state, getters, rootGetters },
    isLoadingMore = false
  ) {
    let SET_LOADING = 'SET_IS_LOADING';

    if (isLoadingMore) {
      SET_LOADING = 'SET_IS_LOADING_MORE';
    }

    commit(SET_LOADING, true);

    try {
      const response = await fetch(getters.reposUrl, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      const { status } = response;

      if (status >= 400) {
        commit('SET_ERROR', data.message);
        commit(SET_LOADING, false);
        commit('SET_IS_SEARCHING', false);

        return null;
      }

      let mappedData = {};
      const favoriteRepos = rootGetters['favoriteRepos/favoriteRepos'];

      if (state.isSearching) {
        mappedData = reposMapper(data, favoriteRepos);
        commit('SET_IS_SEARCHING', false);
      } else {
        mappedData = reposMapper(data);
      }

      commit('ADD_TO_REPOS', mappedData.repos);
      commit('SET_TOTAL_COUNT', mappedData.totalCount);
      commit(SET_LOADING, false);
    } catch (error) {
      commit('SET_ERROR', error);
      commit(SET_LOADING, false);
      commit('SET_IS_SEARCHING', false);
    }
  },

  fetchMore({ commit, dispatch }) {
    commit('SET_NEXT_PAGE');
    dispatch('fetchRepos', true);
  },

  setIsFavorite({ commit }, id) {
    commit('SET_IS_FAVORITE', id);
  },

  setRepoInfoToShow({ commit }, repoInfoToShow) {
    commit('SET_REPO_INFO_TO_SHOW', repoInfoToShow);
  },

  setNoFavoriteInRepos({ commit }, id) {
    commit('SET_NOT_FAVORITE_IN_REPOS', id);
  },

  search({ commit, dispatch }, searchValue) {
    commit('SET_IS_SEARCHING', true);

    let qualifier = 'is:public';

    if (searchValue) {
      qualifier = `${qualifier} ${searchValue} in:name`;
    }

    commit('CLEAR_REPOS');
    commit('SET_QUERY_QUALIFIER', qualifier);
    dispatch('setRepoInfoToShow', null);
    dispatch('fetchRepos');
  },
};

export default {
  state: getInitialState,
  mutations,
  getters,
  actions,
  namespaced: true,
};
