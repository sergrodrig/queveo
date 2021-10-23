<template>
  <div>
    <div v-show="!pageReady" />
    <div
      v-show="pageReady"
      class="px-8 pt-8 pb-24 space-y-4 text-white"
    >
      <!-- poster y genres -->
      <div class="space-y-2">
        <img
          v-if="showDetail.poster_path"
          :src="getPhotoUrl(showDetail.poster_path)"
          alt="poster"
          @load="onImgLoad"
        >
        <ul class="flex flex-wrap">
          <li
            v-for="genre in genres"
            :key="genre.id"
            class="inline px-2 py-1 m-1 text-xs tracking-wider uppercase border rounded"
          >
            {{ genre.name }}
          </li>
        </ul>
      </div>

      <!-- show info -->
      <div class="space-y-8">
        <div>
          <div class="flex items-center space-x-1">
            <SvgStar class="text-yellow-300" /><span>{{ showDetail.vote_average }}</span>
          </div>
          <p class="text-3xl font-semibold text-left">
            {{ showDetail.original_name }}
          </p>
          <p class="font-thin">
            {{ showDetail.tagline }}
          </p>
        </div>

        <!-- year -->
        <div>
          <p class="text-sm font-semibold">
            Release date
          </p>
          <p class="font-extralight">
            {{ new Date(showDetail.first_air_date).getFullYear() }}
          </p>
        </div>

        <!-- summary -->
        <div>
          <p class="text-sm font-semibold">
            Summary
          </p>
          <p class="font-thin">
            {{ showDetail.overview }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getPhotoUrl } from '@/helpers/themoviedbapi'
import SvgStar from '@/components/AppSvgStar'

export default {
  name: 'Show',
  components: { SvgStar },
  emits: ['ready'],
  data () {
    return {
      dataFetched: false,
      posterLoaded: false,
      showId: this.$route.params.showId,
      showDetail: {}
    }
  },
  computed: {
    pageReady () {
      if (this.dataFetched && this.posterLoaded) {
        this.$emit('ready')
        return true
      } else return false
    },
    genres () {
      return this.showDetail.genres
    }
  },
  async created () {
    const show = await this.fetchShowById(this.showId)
    this.showDetail = { ...show }
    this.dataFetched = true
  },
  methods: {
    ...mapActions(['fetchShowById']),
    getPhotoUrl,
    onImgLoad () {
      this.posterLoaded = true
    }
  }
}
</script>
