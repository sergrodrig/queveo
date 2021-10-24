<template>
  <router-link
    v-if="mediaType === 'movie'"
    :to="{ name: 'MovieDetail', params: { movieId: item.id }}"
  >
    <img
      :src="getPhotoUrl(item.poster_path, 'w185')"
      alt="poster photo"
    >
  </router-link>
  <router-link
    v-if="mediaType === 'tv'"
    :to="{ name: 'ShowDetail', params: { showId: item.id }}"
  >
    <img
      :src="getPhotoUrl(item.poster_path, 'w185')"
      alt="poster photo"
    >
  </router-link>
</template>

<script>
import { getPhotoUrl } from '@/helpers/themoviedbapi'

export default {
  props: {
    mediaType: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPhotoUrl
  }
}
</script>
