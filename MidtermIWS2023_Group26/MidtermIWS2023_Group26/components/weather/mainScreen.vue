<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div v-if="!loading" class="h-full relative pb-10 px-8" :class="theme === 'dark' ? 'dark-bg' : 'light-bg'">
      <toastError v-if="error" class="absolute z-10 right-8 top-8 cursor-pointer" @delete="deleteError" />
      <div class="max-w-5xl mx-auto">
        <searchBar class="lg:w-3/5 py-10 lg:mx-auto" @search="searchWeather" />
        <div v-if="!searchLoading">
          <todayWeather
            class="mb-10"
            :tem="tem"
            :theme="theme"
            :current-weather="currentWeather"
            @changeF="changeToF"
            @changeC="changeToC"
          />
          <todayData :theme="theme" :current-weather="currentWeather" class="mb-12" />
          <nextDay :tem="tem" :theme="theme" :next-weather="currentWeather.forecast.forecastday" />
        </div>
        <div v-else>
          <loadingWeather />
        </div>
      </div>
    </div>
    <div v-else>
      <loadingScreen />
    </div>
  </div>
</template>
<script>
import searchBar from '../search/searchBar.vue'
import toastError from '../common/toastError.vue'
import loadingScreen from '../common/loadingScreen.vue'
import loadingWeather from '../common/loadingWeather.vue'
import todayWeather from './todayWeather.vue'
import todayData from './todayData.vue'
import nextDay from './nextDay.vue'
export default {
  components: {
    todayWeather,
    searchBar,
    todayData,
    nextDay,
    toastError,
    loadingScreen,
    loadingWeather
  },
  data () {
    return {
      currentWeather: {},
      location: 'Hanoi',
      loading: true,
      searchLoading: false,
      error: false,
      tem: 'C'
    }
  },
  computed: {
    theme () {
      if (this.currentWeather.current.is_day === 1) {
        return 'light'
      } else {
        return 'dark'
      }
    }
  },
  async mounted () {
    await this.getWeather()
  },
  methods: {
    async getWeather () {
      try {
        const response = await this.$axios.$get(
          `/forecast.json?key=a4298c89b1c944339c073322232203&q=${this.location}&days=5&aqi=no&alerts=no1`
        )
        if (response) {
          this.currentWeather = response
          console.log(response)
          this.loading = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async searchWeather (val) {
      this.searchLoading = true
      try {
        const response = await this.$axios.$get(
          `/forecast.json?key=a4298c89b1c944339c073322232203&q=${val}&days=5&aqi=no&alerts=no1`
        )
        if (response) {
          this.currentWeather = response
          this.searchLoading = false
        }
      } catch (error) {
        this.error = true
        console.log(error.message)
        this.searchLoading = false
        setTimeout(() => {
          this.deleteError()
        }, 3000)
      }
    },
    deleteError () {
      this.error = false
    },
    changeToF () {
      this.tem = 'F'
    },
    changeToC () {
      this.tem = 'C'
    }
  }
}

</script>
<style lang="css" scoped>
.light-bg {
  background: linear-gradient(90deg, #3B82F6 0%, #2095FF 0.01%, #93C5FD 100%);
}
.dark-bg{
  background: linear-gradient(90deg, #5C25F8 0%, #A77EDF 100%);
}

@keyframes blink {50% { color: transparent }}
.loader__dot { animation: 2s blink infinite }
.loader__dot:nth-child(2) { animation-delay: 500ms }
.loader__dot:nth-child(3) { animation-delay: 1000ms }
</style>
