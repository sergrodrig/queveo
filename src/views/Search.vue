<template>
  <div class="max-w-md min-h-screen px-8 pt-12 pb-32 mx-auto">
    <form
      class="flex flex-col space-y-4"
      @submit.prevent="buscar"
    >
      <input
        v-model="busqueda"
        type="text"
        placeholder="Ejemplo: 'Matrix'"
        class="px-4 py-2 rounded"
      >
      <button
        type="submit"
        class="block py-3 text-white rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 active:from-indigo-700 active:to-pink-700"
      >
        Buscar
      </button>
    </form>

    <!-- resultados -->
    <div>
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <li
          v-for="item in items"
          :key="item.id"
        >
          <DiscoverMediaItem
            media-type="movie"
            :item="item"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DiscoverMediaItem from '@/components/DiscoverMediaItem'

export default {
  components: {
    DiscoverMediaItem
  },
  emits: ['ready'],
  data () {
    return {
      busqueda: '',
      items: []
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    ...mapActions(['searchMovie']),
    async buscar () {
      const res = await this.searchMovie(this.busqueda)
      this.items = res.results
    }
  }
}
</script>
