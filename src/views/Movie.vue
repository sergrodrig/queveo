<template>
  <div>
    <div v-show="!pageReady">
      Cargando
    </div>
    <div
      v-show="pageReady"
      class="px-8 pt-8 pb-24 space-y-4 text-white"
    >
      <!-- poster y taggenress -->
      <div class="space-y-2">
        <img
          v-if="movieDetail.poster_path"
          :src="`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`"
          alt="poster"
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

      <!-- movie info -->
      <div class="space-y-8">
        <div>
          <div class="flex items-center space-x-1">
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
        <div>
          <p class="text-sm font-semibold">
            Release date
          </p>
          <p class="font-extralight">
            {{ new Date(movieDetail.release_date).getFullYear() }}
          </p>
        </div>

        <!-- summary -->
        <div>
          <p class="text-sm font-semibold">
            Summary
          </p>
          <p class="font-thin">
            {{ movieDetail.overview }}
          </p>
        </div>

        <!-- Cast -->
        <div>
          <p class="text-sm font-semibold">
            Cast
          </p>
          <ul class="flex space-x-4">
            <li
              v-for="cast in casting"
              :key="cast.id"
            >
              <img
                :src="`https://image.tmdb.org/t/p/original/${cast.profile_path}`"
                alt="actor photo"
                class="object-cover w-12 h-12 rounded-full"
                @load="onImgLoad"
              >
            </li>
          </ul>
        </div>

        <!-- Companies -->
        <div>
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
                :src="`https://image.tmdb.org/t/p/w92/${company.logo_path}`"
                class="w-8"
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SvgStar from '@/components/AppSvgStar'

export default {
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
    console.log('data fetched from api')
  },
  methods: {
    ...mapActions(['fetchMovieById', 'fetchMovieCast']),
    onImgLoad () {
      this.posterLoaded = true
      console.log('image loaded')
    }
  }
}
</script>
