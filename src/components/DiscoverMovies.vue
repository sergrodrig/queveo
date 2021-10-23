<template>
  <div class="space-y-2">
    <p class="pb-2 text-2xl font-bold border-b border-gray-50">
      Peliculas mas populares
    </p>
    <ul
      v-if="movies"
      class="grid grid-cols-3 gap-4 md:grid-cols-5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
    >
      <li
        v-for="movie in movies"
        :key="movie.id"
      >
        <router-link :to="{ name: 'MovieDetail', params: { movieId: movie.id }}">
          <img
            :src="getPhotoUrl(movie.poster_path, 'w185')"
            alt="poster photo"
          >
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getPhotoUrl } from '@/helpers/themoviedbapi'

export default {
  data () {
    return {
      movies: []
    }
  },
  async created () {
    const movies = await this.discoverMedia('movie')
    this.movies = movies.results.filter(m => {
      if (m.vote_average >= 7 && m.vote_count >= 500) return true
    })
  },
  methods: {
    ...mapActions(['discoverMedia']),
    getPhotoUrl
  }
}
</script>
