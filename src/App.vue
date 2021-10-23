<template>
  <div class="min-h-screen bg-gray-900">
    <router-link
      :to="{ name: 'Home'}"
      class="flex justify-center pt-8 font-serif font-black text-white bg-gray-900 text-7xl"
    >
      📼
    </router-link>
    <div v-show="showPage">
      <router-view
        v-slot="{ Component }"
        @ready="onPageReady"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="`${$route.path}${JSON.stringify($route.query)}`"
          />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPage: false
    }
  },
  created () {
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  },
  methods: {
    onPageReady () {
      this.showPage = true
    }
  }
}
</script>

<style>
/* vue transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
