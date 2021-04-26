<template>
  <div :class="isFavoriteCard ? 'card-repo-info-small' : 'card-repo-info'">
    <div class="card-repo-info__title">
      <p>{{ fullName }}</p>

      <span
        class="card-repo-info__icons"
        :style="{ color: isFavorite ? 'yellow' : 'white' }"
        v-html="require('@/assets/icons/star.svg')"
      />

      <div>{{ stars }}</div>
    </div>

    <div class="card-repo-info-divider"></div>

    <div class="card-repo-info__content">
      <div class="card-repo-info__avatar-block">
        <img
          class="card-repo-info__avatar"
          :alt="`avatar-${fullName}`"
          :src="avatarUrl"
        />

        <div class="card-repo-info__description">{{ description }}</div>

        <div
          v-if="!isFavorite"
          class="card-repo-info__add-button"
          @click="$emit('onAddToFavoritesClick')"
        >
          Add to favorites
        </div>

        <div
          v-if="isFavoriteCard"
          class="card-repo-info__delete-button"
          @click="$emit('onDeleteFromFavoritesClick')"
        >
          Delete from favorites
        </div>
      </div>

      <div class="card-repo-info__name-block">
        <div class="card-repo-info__name">{{ name }}</div>

        <span
          class="card-repo-info__icons"
          :style="{ color: 'black' }"
          v-html="require('@/assets/icons/github.svg')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-repo-info',
  props: {
    id: {
      type: Number,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    stars: {
      type: Number,
      default: 0,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isFavoriteCard: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.card-repo-info {
  position: fixed;
  left: 2.4rem;
  top: 5rem;
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 75%;
  padding: 1px;
  background: rgb(219, 205, 238);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 5px 15px 0 rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(103, 57, 182, 0.5);
  border-radius: 5px;
}

.card-repo-info-small {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  min-height: 20rem;
  width: 100%;
  min-width: 20rem;
  padding: 1px;
  background: rgb(219, 205, 238);
  box-shadow: 0 1px 2px 0 rgba(79, 109, 122, 0.05),
    0 1px 3px 0 rgba(79, 109, 122, 0.1), 0 5px 15px 0 rgba(0, 22, 39, 0.15);
  border: 1px solid rgb(181, 179, 179);
  border-radius: 5px;
}

.card-repo-info__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.card-repo-info__title p {
  width: 100%;
  color: blue;
  font-size: large;
  font-weight: bold;
  padding-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-repo-info__icons {
  width: 20px;
  margin-right: 0.2rem;
}

.card-repo-info__icons svg {
  fill: currentColor;
}

.card-repo-info__content {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  height: 100%;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.card-repo-info__avatar-block {
  width: 60%;
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.card-repo-info__avatar {
  height: 6.5rem;
  width: 6.5rem;
  border-radius: 50%;
}

.card-repo-info__description {
  margin-top: 0.5rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.card-repo-info__add-button {
  width: 50%;
  min-width: 140px;
  margin-top: auto;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: blue;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
}

.card-repo-info__add-button:hover {
  background-color: rgb(11, 121, 238);
}

.card-repo-info__add-button:active {
  background-color: blue;
  transform: translateY(2px);
}

.card-repo-info__delete-button {
  width: 65%;
  min-width: 160px;
  margin-top: auto;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: blue;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
}

.card-repo-info__delete-button:hover {
  background-color: rgb(11, 121, 238);
}

.card-repo-info__delete-button:active {
  background-color: blue;
  transform: translateY(2px);
}

.card-repo-info__name-block {
  display: flex;
  flex-direction: row;
  max-width: 40%;
  margin-left: auto;
  color: blue;
  font-weight: bold;
  justify-content: flex-end;
}

.card-repo-info__name {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  word-break: break-all;
}

.card-repo-info-divider {
  min-height: 1px;
  width: 100%;
  background: rgb(181, 179, 179);
}

@media (min-width: 321px) {
  .card-repo-info {
    left: 2.9rem;
  }
}

@media (min-width: 424px) {
  .card-repo-info {
    left: 3rem;
  }
}
@media (min-width: 500px) {
  .card-repo-info {
    left: 4rem;
  }
}

@media (min-width: 600px) {
  .card-repo-info {
    left: 5rem;
  }
}

@media (min-width: 700px) {
  .card-repo-info {
    left: 5.6rem;
  }
}

@media (min-width: 768px) {
  .card-repo-info {
    left: 48%;
    top: 5.5rem;
    margin-left: 1rem;
    width: 48%;
    min-width: 20rem;
  }

  .card-repo-info-small {
    height: 20rem;
    width: 30%;
    min-width: 30rem;
  }
}
</style>
