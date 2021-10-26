<template>
  <div class="space-y-2">
    <div class="flex justify-between border-b border-gray-50">
      <p
        v-if="mediaType === 'movie'"
        class="pb-2 text-2xl font-bold"
      >
        Peliculas mas populares
      </p>
      <p
        v-if="mediaType === 'tv'"
        class="pb-2 text-2xl font-bold"
      >
        Series mas populares
      </p>
      <select
        v-model="nota"
        class="m-1 text-center text-black rounded"
      >
        <option
          v-for="n in 10"
          :key="n"
        >
          {{ n }}
        </option>
      </select>
    </div>
    <ul
      v-if="items"
      class="grid grid-cols-2 gap-4 md:grid-cols-5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
    >
      <li
        v-for="item in itemsFiltrados"
        :key="item.id"
      >
        <DiscoverMediaItem
          :media-type="mediaType"
          :item="item"
          size="w500"
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
      items: [],
      nota: 7
    }
  },
  computed: {
    pageReady () {
      if (this.dataFetched && this.posterLoaded) {
        this.$emit('ready')
        return true
      } else return false
    },
    itemsFiltrados () {
      return this.items.filter(media => {
        if (media.vote_average >= this.nota && media.vote_count >= 400) return true
      })
    }
  },
  async created () {
    const items = await this.discoverMedia(this.mediaType)
    this.items = items.results
  },
  methods: {
    ...mapActions(['discoverMedia'])
  }
}
</script>
