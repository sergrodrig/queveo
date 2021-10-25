<template>
  <div class="min-h-screen px-8 pt-12 pb-32 mx-auto space-y-12 text-white max-w-7xl">
    <DiscoverMedia media-type="movie" />
    <DiscoverMedia media-type="tv" />
    <router-link
      :to="{ name: 'Search' }"
      class="flex justify-center pt-8 font-serif font-black text-white bg-gray-900 text-7xl"
    >
      🔍
    </router-link>
  </div>
</template>

<script>
import DiscoverMedia from '@/components/DiscoverMedia.vue'

export default {
  components: {
    DiscoverMedia
  },
  emits: ['ready'],
  created () {
    this.$emit('ready')
  }
}
</script>
