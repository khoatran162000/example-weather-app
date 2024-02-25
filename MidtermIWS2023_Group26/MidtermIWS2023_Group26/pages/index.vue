<template>
  <div>
    <KeepAlive>
      <mainScreen />
    </KeepAlive>
  </div>
</template>

<script>
import mainScreen from '~/components/weather/mainScreen.vue'
export default {
  components: {
    mainScreen
  }
}
</script>
<style lang="css" scoped>
</style>
