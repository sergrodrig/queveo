<template>
  <div class="max-w-4xl min-h-screen px-8 pt-12 pb-32 mx-auto space-y-8 text-white">
    <div>
      <img :src="getPhotoUrl(personDetail.profile_path, 'w780')">
      <p class="text-3xl font-bold">
        {{ personDetail.name }}
      </p>
    </div>
    <div class="space-y-2">
      <p class="text-xl font-bold border-b border-gray-50">
        Movies
      </p>
      <ul class="grid grid-cols-2 gap-4">
        <li
          v-for="movie in personDetail.movies"
          :key="movie.id"
        >
          <router-link :to="{ name: 'MovieDetail', params: { movieId: movie.id }}">
            <img
              :src="getPhotoUrl(movie.poster_path, 'w500')"
              alt="poster photo"
            >
          </router-link>
        </li>
      </ul>
    </div>

    <div class="space-y-2">
      <p class="text-xl font-bold border-b border-gray-50">
        TV Shows
      </p>
      <ul class="grid grid-cols-2 gap-4">
        <li
          v-for="show in personDetail.shows"
          :key="show.id"
        >
          <router-link :to="{ name: 'ShowDetail', params: { showId: show.id }}">
            <img
              :src="getPhotoUrl(show.poster_path, 'w500')"
              alt="poster photo"
            >
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getPhotoUrl } from '@/helpers/themoviedbapi'

export default {
  props: {
    personId: {
      type: String,
      required: true
    }
  },
  emits: ['ready'],
  data () {
    return {
      personDetail: {}
    }
  },
  async created () {
    const person = await this.fetchCrewById(this.personId)
    const credits = await this.fetchCrewCredits(this.personId)
    const movies = [...credits.cast]
      .filter(item => item.media_type === 'movie')
      .sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
      .filter(item => item.vote_count > 300)
    const shows = [...credits.cast]
      .filter(item => item.media_type === 'tv')
      .sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
      .filter(item => item.vote_count > 300)
    this.personDetail = { ...person, movies, shows }
    this.$emit('ready')
  },
  methods: {
    ...mapActions(['fetchCrewById', 'fetchCrewCredits']),
    getPhotoUrl
  }
}
</script>
