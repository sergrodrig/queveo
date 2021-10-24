<template>
  <div class="space-y-2">
    <p
      v-if="mediaType === 'movie'"
      class="pb-2 text-2xl font-bold border-b border-gray-50"
    >
      Peliculas mas populares
    </p>
    <p
      v-if="mediaType === 'tv'"
      class="pb-2 text-2xl font-bold border-b border-gray-50"
    >
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
        <DiscoverMediaItem
          :media-type="mediaType"
          :item="item"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DiscoverMediaItem from '@/components/DiscoverMediaItem'

export default {
  name: 'DiscoverMedia',
  components: {
    DiscoverMediaItem
  },
  props: {
    mediaType: {
      type: String,
      required: true
    }
  },
  emits: ['ready'],
  data () {
    return {
      dataFetched: false,
      posterLoaded: false,
      items: []
    }
  },
  computed: {
    pageReady () {
      if (this.dataFetched && this.posterLoaded) {
        this.$emit('ready')
        return true
      } else return false
    }
  },
  async created () {
    const items = await this.discoverMedia(this.mediaType)
    this.items = items.results.filter(media => {
      if (media.vote_average >= 7 && media.vote_count >= 500) return true
    })
  },
  methods: {
    ...mapActions(['discoverMedia'])
  }
}
</script>
