<template>
  <div class="app-header">
    <h3 class="app-header__title">GitHub Client</h3>

    <div
      :class="isTopRepoActive ? 'active' : ''"
      class="app-header__top-repo"
      @click="onTopReposClicked"
    >
      <p>Top repos</p>
    </div>

    <div
      :class="isFavoriteRepoActive ? 'active' : ''"
      class="app-header__favorite-repo"
      @click="onFavoriteReposClicked"
    >
      <p>Favorite repos</p>
      <span>{{ favoriteReposCount }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'app-header',
  data() {
    return {
      isTopRepoActive: true,
      isFavoriteRepoActive: false,
    };
  },
  computed: {
    ...mapGetters('favoriteRepos', ['favoriteReposCount']),
  },
  methods: {
    onTopReposClicked() {
      if (this.isTopRepoActive) {
        return;
      }

      this.isTopRepoActive = true;
      this.isFavoriteRepoActive = false;

      this.$emit('topReposClicked');
    },

    onFavoriteReposClicked() {
      if (this.isFavoriteRepoActive) {
        return;
      }

      this.isTopRepoActive = false;
      this.isFavoriteRepoActive = true;

      this.$emit('favoriteReposClicked');
    },
  },
};
</script>

<style>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 2.5rem;
  width: 100%;
  background: rgb(103, 57, 182);
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  font-weight: bold;
}

.app-header__title {
  margin-left: 1rem;
}

.app-header__top-repo {
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 1rem;
  width: 10rem;
  text-align: center;
}

.app-header__favorite-repo {
  position: relative;
  font-size: 16px;
  cursor: pointer;
  margin-right: 1rem;
  width: 10rem;
  text-align: center;
}

.app-header__favorite-repo span {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: yellow;
  color: black;
  font-size: small;
  border-radius: 50%;
}

.app-header__top-repo:hover,
.app-header__favorite-repo:hover {
  background: rgb(181, 158, 233);
  color: yellow;
}

.active {
  background: rgb(181, 158, 233);
  color: yellow;
}

@media (min-width: 450px) {
  .app-header__favorite-repo {
    font-size: 18px;
  }

  .app-header__top-repo {
    font-size: 18px;
  }
}
</style>
