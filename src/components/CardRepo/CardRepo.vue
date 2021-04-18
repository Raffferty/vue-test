<template>
  <div class="card-repo-container">
    <div
      class="card-repo"
      :class="isActive ? 'card-repo-is-active' : ''"
      @click="$emit('onCardRepoClick')"
    >
      <div class="card-repo__position">{{ position }}</div>
      <div class="card-repo__fullName">{{ fullName }}</div>
      <div class="card-repo__stars">{{ stars }}</div>
      <img
        v-if="isFavorite"
        class="card-repo__icon-star"
        :alt="`star-${fullName}`"
        src="@/assets/icons/star-yellow.svg"
      />
      <img
        v-else
        class="card-repo__icon-star"
        :alt="`star-${fullName}`"
        src="@/assets/icons/star-white.svg"
      />
    </div>

    <div class="card-repo-divider"></div>
  </div>
</template>

<script>
export default {
  name: 'card-repo',
  props: {
    id: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      default: 0,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.card-repo-container {
  display: flex;
  flex-direction: column;
  height: 40px;
}

.card-repo {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  background: rgb(219, 205, 238);
  padding-left: 2rem;
  cursor: pointer;
}

.card-repo-is-active {
  background: rgb(173, 145, 222);
}

.card-repo__position {
  color: blue;
}

.card-repo__fullName {
  width: 100%;
  margin-left: 2rem;
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-repo__stars {
  margin-right: 2rem;
}

.card-repo__icon-star {
  height: 20px;
  width: 20px;
  margin-right: 2.2rem;
  margin-bottom: 2px;
}

.card-repo-divider {
  min-height: 1px;
  width: 100%;
  background: rgb(181, 179, 179);
}
</style>
