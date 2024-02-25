<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center" role="status">
      <img class="w-[150px] lg:w-[300px]" src="clear-day-animation.svg" alt="">
      <div class="text-base lg:text-2xl text-center font-medium">
        Loading weather data, please wait a second
        <span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span>
      </div>
    </div>
  </div>
</template>
