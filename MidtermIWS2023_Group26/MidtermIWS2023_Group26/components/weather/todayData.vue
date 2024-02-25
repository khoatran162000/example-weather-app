<template>
  <div class="flex justify-center gap-2 lg:justify-between items-center">
    <div class="py-1 pr-4 pl-1 lg:py-2 lg:px-4 rounded-2xl flex lg:gap-2 items-center bg-white">
      <img class="w-[45px] lg:w-[90px]" src="humidity.svg" alt="">
      <div class="lg:pr-8">
        <p class="text-2xl hidden lg:block font-normal">
          Humidity
        </p>
        <p class="text-xl lg:text-2xl font-light">
          {{ currentWeather.current.humidity }}%
        </p>
      </div>
    </div>
    <div class="py-1 pr-4 pl-1 lg:py-2 lg:px-4 rounded-2xl flex lg:gap-2 items-center bg-white">
      <img class="w-[45px] lg:w-[90px]" src="raindrops.svg" alt="">
      <div class="lg:pr-8">
        <p class="text-2xl hidden lg:block font-normal">
          Raindrop
        </p>
        <p class="text-xl lg:text-2xl font-light">
          {{ currentWeather.current.precip_mm }}<span class="text-xs lg:text-2xl">mm</span>
        </p>
      </div>
    </div>
    <div class="py-1 pr-4 pl-1 lg:py-2 lg:px-4 rounded-2xl flex lg:gap-2 items-center bg-white">
      <img class="w-[45px] lg:w-[90px]" :src="uvSrc" alt="">
      <div class="lg:pr-8">
        <p class="text-2xl hidden lg:block font-normal">
          UV Index
        </p>
        <p class="text-xl lg:text-2xl font-light">
          {{ uv }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentWeather: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    uv () {
      let data = ''
      const val = this.currentWeather.current.uv
      if (val <= 2) {
        data = 'Low'
      } else if (val <= 5) {
        data = 'Medium'
      } else if (val <= 7) {
        data = 'High'
      } else if (val <= 10) {
        data = 'Very High'
      } else {
        data = 'Extremely High'
      }
      return data
    },
    uvSrc () {
      const val = 'uv-index-' + this.currentWeather.current.uv + '.svg'
      return val
    }

  }
}
</script>
