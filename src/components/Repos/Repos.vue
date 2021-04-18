<template>
  <div>
    <div v-if="isLoading" class="spinner-fetch">
      <Spinner />
    </div>

    <div v-else class="app-repos-container">
      <h1 v-if="repos.length === 0 && !repoNameToSearch" class="no-repos">
        No repositories yet
      </h1>

      <div
        v-else
        class="app-repos"
        :class="repoInfoToShow ? 'app-repos-top' : ''"
      >
        <SearchInputDebounced
          ref="searchInputDebounced"
          v-model="repoNameToSearch"
          placeholder="Search repo"
        />

        <h2
          v-if="repos.length === 0 && repoNameToSearch"
          class="no-search-results"
        >
          No results for <span>{{ repoNameToSearch }}</span>
        </h2>

        <div v-else class="app-repos-content">
          <div class="app-repos__header">
            <div>№</div>
            <div class="app-repos__header-repo">Repo</div>
            <div class="app-repos__header-stars">Stars</div>
            <div class="app-repos__header-fav">Fav</div>
          </div>

          <div :style="{ height: `${scrollerHeight}px` }">
            <RecycleScroller
              class="scroller"
              key-field="id"
              :items="repos"
              :item-size="40"
              v-slot="{ item, index }"
            >
              <CardRepo
                :id="item.id"
                :position="index + 1"
                :fullName="item.fullName"
                :stars="item.stars"
                :isFavorite="item.isFavorite"
                :isActive="item.isActive"
                @onCardRepoClick="showRepoInfo(item)"
                v-observe-visibility="
                  !isLoadingMore &&
                  !error &&
                  hasNext &&
                  index === repos.length - 1
                    ? {
                        callback: fetchMore,
                        intersection: {
                          threshold: 0.3,
                        },
                      }
                    : false
                "
              />
            </RecycleScroller>
          </div>
        </div>

        <div v-if="isLoadingMore" class="spinner-fetch-more">
          <Spinner />
        </div>
      </div>

      <div>
        <CardRepoInfo
          v-if="repoInfoToShow"
          :id="repoInfoToShow.id"
          :avatarUrl="repoInfoToShow.avatarUrl"
          :fullName="repoInfoToShow.fullName"
          :name="repoInfoToShow.name"
          :description="repoInfoToShow.description"
          :stars="repoInfoToShow.stars"
          :isFavorite="repoInfoToShow.isFavorite"
          :isFavoriteCard="repoInfoToShow.isFavoriteCard"
          @onAddToFavoritesClick="addToFavorites(repoInfoToShow)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import CardRepo from '@/components/CardRepo';
import CardRepoInfo from '@/components/CardRepoInfo';
import Spinner from '@/components/Spinner';
import SearchInputDebounced from '@/components/SearchInputDebounced';

export default {
  name: 'repos',
  components: {
    SearchInputDebounced,
    CardRepo,
    CardRepoInfo,
    Spinner,
  },
  data() {
    return {
      repoNameToSearch: '',
    };
  },
  activated() {
    if (this.repoNameToSearch) {
      this.setFocusOnSearchInput();
    }
  },
  computed: {
    ...mapState('viewport', ['viewport']),
    ...mapState('topRepos', ['isLoading', 'isLoadingMore', 'error']),
    ...mapGetters('topRepos', ['repos', 'repoInfoToShow', 'hasNext']),
    ...mapGetters('favoriteRepos', ['favoriteRepos']),

    scrollerHeight() {
      if (
        !this.isLoading &&
        (!this.repoInfoToShow || this.viewport.width > 768)
      ) {
        if (this.viewport.height - 173 <= this.repos.length * 40) {
          return this.viewport.height - 173;
        } else {
          return this.repos.length * 40;
        }
      } else {
        if (this.viewport.height - 509 <= this.repos.length * 40) {
          return this.viewport.height - 509;
        } else {
          return this.repos.length * 40;
        }
      }
    },
  },
  watch: {
    error(value) {
      if (value) {
        this.showNotification({
          type: 'error',
          text: value,
          timeout: 5000,
        });
      }
    },

    isLoading(value) {
      if (this.repoNameToSearch && !value) {
        this.setFocusOnSearchInput();
      }
    },

    repoNameToSearch(name) {
      this.search(name);
    },
  },

  methods: {
    ...mapActions('notifications', { showNotification: 'show' }),
    ...mapActions('favoriteRepos', ['addToFavoriteRepos']),
    ...mapActions('topRepos', [
      'setIsFavorite',
      'setRepoInfoToShow',
      'fetchMore',
      'search',
    ]),

    showRepoInfo(repo) {
      if (this.repoNameToSearch) {
        this.setFocusOnSearchInput();
      }

      if (this.repoInfoToShow?.id === repo.id) {
        return;
      }

      this.setRepoInfoToShow(repo);
    },

    addToFavorites(repo) {
      if (this.repoNameToSearch) {
        this.setFocusOnSearchInput();
      }

      this.addToFavoriteRepos({ ...repo, isFavorite: true });

      this.setIsFavorite(repo.id);
    },

    setFocusOnSearchInput() {
      this.$nextTick(() => {
        this.$refs.searchInputDebounced.$refs.input.focus();
      });
    },
  },
};
</script>

<style scoped>
.scroller {
  height: 100%;
}

.app-repos-container {
  display: flex;
  flex-direction: column-reverse;
}

.app-repos-content {
  box-shadow: 0 1px 2px 0 rgba(79, 109, 122, 0.05),
    0 1px 3px 0 rgba(79, 109, 122, 0.5), 0 5px 15px 0 rgba(0, 22, 39, 0.6);
}

.spinner-fetch {
  margin-top: 10rem;
}

.spinner-fetch-more {
  margin-top: -4.5rem;
}

.no-repos {
  margin-top: 10rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 100%;
  background: rgb(218, 184, 104);
}

.no-search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 4rem;
  padding: 0.5rem;
  background: rgb(218, 184, 104);
}

.no-search-results span {
  color: red;
  font-style: italic;
}

.app-repos {
  margin-top: 5rem;
  height: 100%;
  width: 100%;
  padding: 1px;
}

.app-repos-top {
  margin-top: 26rem;
}

.app-repos__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2rem;
  background: rgb(203, 186, 233);
  padding-left: 2rem;
}

.app-repos__header-repo {
  width: 100%;
  text-align: center;
}

.app-repos__header-fav {
  margin-right: 2rem;
}

.app-repos__header-stars {
  margin-right: 2rem;
}

@media (min-width: 768px) {
  .app-repos-container {
    flex-direction: row;
  }

  .app-repos {
    margin-top: 5rem;
    width: 48%;
  }
}
</style>
