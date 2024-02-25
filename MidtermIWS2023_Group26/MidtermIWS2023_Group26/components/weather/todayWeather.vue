<template>
  <div class="flex justify-between  items-center lg:flex-row flex-col">
    <div class="text-white w-full">
      <div>
        <p class="text-2xl lg:text-4xl font-semibold">
          {{ currentWeather.location.name }}
        </p>
        <p class="text-xl lg:text-2xl font-light">
          {{ currentWeather.location.country }}
        </p>
      </div>
      <div class="flex lg:gap-9 gap-4 items-end mb-4">
        <p v-if="tem ==='C'" class="text-6xl lg:text-8xl w-[104px] lg:w-[142px] font-semibold flex">
          {{ Math.round(currentWeather.current.feelslike_c) }}<span class="flex text-2xl lg:text-4xl lg:mt-3">&#176;C</span>
        </p>
        <p v-else class="text-6xl lg:text-8xl font-semibold w-[104px] lg:w-[142px] flex">
          {{ Math.round(currentWeather.current.feelslike_f) }}<span class="flex text-2xl lg:text-4xl lg:mt-3">&#176;F</span>
        </p>

        <div class="h-14 lg:h-20 w-0.5 bg-white" />
        <div class="text-xl lg:text-2xl font-light">
          <p>{{ time }}</p>
          <p>{{ day }}</p>
        </div>
      </div>
      <div class="w-[120px] lg:w-[160px]">
        <button v-if="tem==='C'" class="mb-4 mt-1 px-4 py-1 border-2 border-white rounded-full text-xs lg:text-sm  w-full hover:bg-white hover:text-black" @click="$emit('changeF')">
          Change to &#176;F
        </button>
        <button v-else class="mb-4 mt-1 px-4 py-1 border-2 border-white rounded-full text-xs lg:text-sm w-full hover:bg-white hover:text-black" @click="$emit('changeC')">
          Change to &#176;C
        </button>
      </div>

      <div class="text-2xl lg:text-3xl font-medium">
        {{ currentWeather.current.condition.text }}
      </div>
    </div>
    <div>
      <img v-if="theme === 'light'" class="w-[300px] lg:mr-20 mr-0" :src="weatherSrcDay(currentWeather.current.condition.text.toLowerCase())" alt="Helo">
      <img v-else class="w-[150px] lg:w-[300px] lg:mr-20 mr-0" :src="weatherSrcNight(currentWeather.current.condition.text.toLowerCase())" alt="Helo">
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    currentWeather: {
      type: Object,
      default: () => {
        return {}
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
    time () {
      const data = this.currentWeather.current.last_updated
      const val = moment(data).format('MMMM Do YYYY, h:mm a')
      const output = val.split(', ')
      return output[1].toUpperCase()
    },
    day () {
      const val = moment(this.currentWeather.current.last_updated).format('MMMM Do YYYY, h:mm a')
      const output = val.split(', ')
      return output[0]
    }
  },
  methods: {
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
