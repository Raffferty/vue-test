<template>
  <div class="app-favorite-repos">
      <h1 v-if="!favoriteRepos.length" class="no-favorite-repos">No favorite repositories yet</h1>

    <CardRepoInfo
      v-else
      v-for="favoriteRepo of favoriteRepos"
      :key="favoriteRepo.id"
      :id="favoriteRepo.id"
      :avatarUrl="favoriteRepo.avatarUrl"
      :fullName="favoriteRepo.fullName"
      :name="favoriteRepo.name"
      :description="favoriteRepo.description"
      :stars="favoriteRepo.stars"
      :isFavorite="favoriteRepo.isFavorite"
      :isFavoriteCard="true"
      @onDeleteFromFavoritesClick="setNoFavoriteInRepos(favoriteRepo.id)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardRepoInfo from '@/components/CardRepoInfo';

export default {
  name: 'favorite-repos',
  components: {
    CardRepoInfo,
  },
  computed: {
    ...mapGetters('favoriteRepos', ['favoriteRepos']),
  },
  methods: {
    ...mapActions('favoriteRepos', ['setNoFavoriteInRepos']),
  },
};
</script>

<style>
.app-favorite-repos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 5rem;
  height: 100%;
  width: 100%;
}

.no-favorite-repos {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  height: 4rem;
  width: 100%;
  background: rgb(218, 184, 104);
}

@media (min-width: 768px) {
  .app-favorite-repos {
    justify-content: center;
  }
}
</style>
