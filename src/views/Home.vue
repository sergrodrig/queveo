<template>
  <div class="max-w-xl min-h-screen p-8 space-y-12 text-white">
    <!-- formulario de busqueda -->
    <form
      class="flex flex-col space-y-3"
      @submit.prevent="search"
    >
      <input
        v-model="text"
        type="text"
        class="px-3 py-2 text-gray-800 rounded-lg"
        placeholder="Ejemplo: &quot;matrix&quot;"
      >
      <button
        class="px-4 py-3 text-white rounded-lg bg-gradient-to-br from-indigo-500 to-pink-800 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-700 active:bg-gradient-to-tr active:from-indigo-400 active:to-pink-900"
        type="submit"
      >
        buscar
      </button>
    </form>

    <!-- resultados -->
    <ul class="grid grid-cols-3 gap-2">
      <li
        v-for="movie in moviesResults"
        :key="movie.id"
      >
        <router-link :to="{ name: 'MovieDetail', params: { movieId: movie.id } }">
          <img :src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  emits: ['ready'],
  data () {
    return {
      text: '',
      moviesResults: []
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    ...mapActions(['searchMovie']),
    async search () {
      const { results } = await this.searchMovie(this.text)
      this.moviesResults = results.filter(movie => movie.poster_path !== null)
    }
  }
}
</script>
