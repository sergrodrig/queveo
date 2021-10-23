<template>
  <div class="space-y-2">
    <p class="pb-2 text-2xl font-bold border-b border-gray-50">
      Series mas populares
    </p>
    <ul
      v-if="items"
      class="grid grid-cols-3 gap-4 md:grid-cols-5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
    >
      <li
        v-for="item in items"
        :key="item.id"
      >
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
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getPhotoUrl } from '@/helpers/themoviedbapi'

export default {
  props: {
    mediaType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      items: []
    }
  },
  async created () {
    const items = await this.discoverMedia(this.mediaType)
    this.items = items.results.filter(media => {
      if (media.vote_average >= 7 && media.vote_count >= 500) return true
    })
  },
  methods: {
    ...mapActions(['discoverMedia']),
    getPhotoUrl
  }
}
</script>
