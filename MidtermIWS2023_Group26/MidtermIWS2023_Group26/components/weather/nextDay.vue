<template>
  <div v-if="theme.length != 0" class=" px-1 py-4 lg:px-6 lg:py-8 bg-next flex justify-between rounded-2xl">
    <div v-for="(item, index) in nextWeather" :key="index">
      <div class="flex flex-col px-1 lg:px-6 py-2 lg:py-5 gap-2 w-fit items-center rounded-2xl" :class="index === 0 ?`text-white ${color} shadow` : 'bg-white'">
        <p v-if="index === 0 " class="text-xs">
          Today
        </p>
        <p v-else class="text-xs">
          <span class="hidden lg:block">{{ formatDay(item.date) }}</span>
          <span class="lg:hidden">{{ formatDay(item.date).substring(0, 3) }}</span>
        </p>
        <img v-if="theme === 'light'" class="w-12 lg:w-24" :src="weatherSrcDay(item.day.condition.text.toLowerCase())" alt="">
        <img v-if="theme === 'dark'" class="w-12 lg:w-24" :src="weatherSrcNight(item.day.condition.text.toLowerCase())" alt="">
        <p v-if="tem=== 'F'" class="text-xs">
          {{ Math.round(item.day.avgtemp_f) }}&#176;F
        </p>
        <p v-else class="text-xs">
          {{ Math.round(item.day.avgtemp_c) }}&#176;C
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    nextWeather: {
      type: Array,
      default: () => {
        return []
      }
    },
    tem: {
      type: String,
      default: () => {
        return ''
      }
    },
    theme: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  computed: {
    color () {
      if (this.theme === 'dark') {
        return 'bg-violet-900'
      } else {
        return 'bg-blue-500'
      }
    }
  },
  methods: {
    formatDay (val) {
      return moment(val).format('dddd')
    },
    weatherSrcDay (text) {
      let src = 'clear-day.svg'
      if (text.includes('overcast')) {
        src = 'overcast-day.svg'
      } else if (text.includes('cloudy')) {
        src = 'partly-cloudy-day.svg'
      } else if (text.includes('rain')) {
        src = 'rain.svg'
      } else if (text.includes('snow')) {
        src = 'snow.svg'
      } else if (text.includes('fog')) {
        src = 'fog-day.svg'
      } else if (text.includes('drizzle')) {
        src = 'drizzle.svg'
      } else if (text.includes('mist')) {
        src = 'mist.svg'
      }

      return src
    },
    weatherSrcNight (text) {
      let src = 'clear-night.svg'
      if (text.includes('overcast')) {
        src = 'overcast-night.svg'
      } else if (text.includes('cloudy')) {
        src = 'partly-cloudy-night.svg'
      } else if (text.includes('rain')) {
        src = 'rain.svg'
      } else if (text.includes('snow')) {
        src = 'snow.svg'
      } else if (text.includes('fog')) {
        src = 'fog-day.svg'
      } else if (text.includes('drizzle')) {
        src = 'drizzle.svg'
      } else if (text.includes('mist')) {
        src = 'mist.svg'
      }
      return src
    }
  }
}
</script>
<style lang="css" scoped>
.bg-next{
    background: rgba(255, 255, 255, 0.25);
}

.shadow{
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
