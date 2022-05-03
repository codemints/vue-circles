<template>
  <div class="header">
    <button @click="changeVelocity('increase')">changeVelocity(increase)</button>
    <div class="title">
      <h1>Floating Circles</h1>
      <h4>Click anywhere to spawn more</h4>
    </div>
    <button @click="changeVelocity('decrease')" data-type="secondary">changeVelocity(decrease)</button>
  </div>
  <canvas
    @click="spawnNewCircle"
    id="thisCanvas"
    ref="canvas"
  >
  </canvas>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import animateCanvas from '@scripts/animateCanvas'

  const canvas = ref(null)
  const { setCircleData, initCircleAnimation, spawnNewCircle, changeVelocity } = animateCanvas()

  onMounted(() => {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    setCircleData({
      canvas: canvas.value,
      seedColors: ['#212933', '#323e4c'],
      clickColors: ['#ff5850', '#00a7af'],
      maxSize: 150,
      minSize: 10,
      maxPop: 12,
      minPop: 8,
      velocity: 1.5,
    })
    initCircleAnimation()
  })


</script>

<style lang="scss" scoped>

</style>
