<template>
  <div>
    <div v-show="!pageReady" />
    <div
      v-show="pageReady"
      class="max-w-4xl min-h-screen px-8 pt-12 pb-32 mx-auto space-y-12 text-white"
    >
      <div class="grid grid-cols-1 gap-2 sm:gap-8 sm:grid-cols-5">
        <div class="col-span-5 sm:col-span-2">
          <!-- poster y genres -->
          <div class="col-span-5 space-y-2 sm:col-span-3">
            <img
              v-if="movieDetail.poster_path"
              :src="getPhotoUrl(movieDetail.poster_path, 'w780')"
              alt="poster"
            >
          </div>
        </div>

        <!-- movie details -->
        <div class="col-span-5 space-y-4 sm:col-span-3">
          <!-- genres -->
          <div class="col-span-5 sm:col-span-2 sm:col-start-4">
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

          <!-- rating, title and tagline -->
          <div class="col-span-5 sm:col-span-2 sm:col-start-4">
            <div class="flex items-center space-x-2">
              <SvgStar class="text-yellow-300" /><span>{{ movieDetail.vote_average }}</span>
            </div>
            <p class="text-3xl font-semibold text-left">
              {{ movieDetail.original_title }}
            </p>
            <p class="font-thin">
              {{ movieDetail.tagline }}
            </p>
          </div>

          <!-- year -->
          <div class="col-span-5">
            <p class="text-sm font-semibold">
              Release date
            </p>
            <p class="font-extralight">
              {{ new Date(movieDetail.release_date).getFullYear() }}
            </p>
          </div>

          <!-- summary -->
          <div class="col-span-5">
            <p class="text-sm font-semibold">
              Summary
            </p>
            <p class="font-thin">
              {{ movieDetail.overview }}
            </p>
          </div>

          <!-- Cast -->
          <div class="col-span-5">
            <p class="text-sm font-semibold">
              Cast
            </p>
            <ul class="flex space-x-4">
              <li
                v-for="cast in casting"
                :key="cast.id"
              >
                <img
                  :src="getPhotoUrl(cast.profile_path)"
                  alt="actor photo"
                  class="object-cover w-12 h-12 rounded-full"
                  @load="onImgLoad"
                >
              </li>
            </ul>
          </div>

          <!-- Companies -->
          <div class="col-span-5">
            <p class="text-sm font-semibold">
              Production companies
            </p>
            <ul class="flex items-center justify-start space-x-2">
              <li
                v-for="company in companies"
                :key="company.id"
                class="flex items-center justify-center w-12 h-12 bg-white"
              >
                <img
                  v-show="company.logo_path"
                  :src="getPhotoUrl(company.logo_path)"
                  class="w-8"
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SvgStar from '@/components/AppSvgStar'
import { getPhotoUrl } from '@/helpers/themoviedbapi'

export default {
  name: 'Movie',
  components: { SvgStar },
  emits: ['ready'],
  data () {
    return {
      dataFetched: false,
      posterLoaded: false,
      movieId: this.$route.params.movieId,
      movieDetail: {}
    }
  },
  computed: {
    pageReady () {
      if (this.dataFetched && this.posterLoaded) {
        this.$emit('ready')
        return true
      } else return false
    },
    casting () {
      return this.movieDetail.cast?.filter(item => item.profile_path !== null).slice(0, 5)
    },
    companies () {
      return this.movieDetail.production_companies?.filter(company => company.logo_path !== null)
    },
    genres () {
      return this.movieDetail.genres
    }
  },
  async created () {
    const movie = await this.fetchMovieById(this.movieId)
    const cast = await this.fetchMovieCast(movie.id)
    this.movieDetail = { ...movie, ...cast }
    this.dataFetched = true
  },
  methods: {
    ...mapActions(['fetchMovieById', 'fetchMovieCast']),
    getPhotoUrl,
    onImgLoad () {
      this.posterLoaded = true
    }
  }
}
</script>
