<template>
  <div id="app">
    <Header
      @topReposClicked="topReposClicked"
      @favoriteReposClicked="favoriteReposClicked"
    />

    <keep-alive>
      <component :is="currentTabComponent"></component>
    </keep-alive>

    <NotificationManager/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

import Repos from '@/components/Repos';
import FavoriteRepos from '@/components/FavoriteRepos';
import Header from '@/components/Header';
import NotificationManager from '@/components/NotificationManager/NotificationManager';

export default {
  name: 'App',
  components: {
    Header,
    Repos,
    FavoriteRepos,
    NotificationManager
  },
  data() {
    return {
      currentTabComponent: 'Repos',
    };
  },
  created() {
    window.addEventListener('resize', this.setViewport);
    
    this.fetchRepos();
  },
  destroyed() {
    window.removeEventListener('resize', this.setViewport);
  },
  methods: {
    ...mapMutations('viewport', { setViewport: 'SET_VIEWPORT' }),
    ...mapActions('topRepos', ['fetchRepos']),
    topReposClicked() {
      this.currentTabComponent = 'Repos';
    },

    favoriteReposClicked() {
      this.currentTabComponent = 'FavoriteRepos';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 90vh;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
