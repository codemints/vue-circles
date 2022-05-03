<template>
  <div class="header">
    <Button
      :click="changeVelocity"
      data-function="increase"
    >
      velocity(increase)
    </Button>
    <div class="title">
      <div>
        <h1>Floating Circles</h1>
        <h4>Click anywhere to spawn more</h4>
      </div>
      <div class="controls">
        <Button
          :click="clearCanvas"
          data-type="control"
        >
          canvas.clear()
        </Button>

        <Button
          :click="handleToggle"
          data-type="control"
        >
          {{ stopped ? 'canvas.start()' : 'canvas.stop()' }}
        </Button>

        <Button
          :click="redrawCanvas"
          data-type="control"
        >
          canvas.redraw()
        </Button>
      </div>
    </div>
    <Button
      :click="changeVelocity"
      data-function="decrease"
    >
      velocity(decrease)
    </Button>
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
  import Button from '@comps/Button.vue'
  import animateCanvas from '@scripts/animateCanvas'

  const canvas = ref(null)
  const stopped = ref(false)
  const clicked = ref(null)

  const {
    setCircleData,
    drawToCanvas,
    spawnNewCircle,
    changeVelocity,
    clearCanvas,
    toggleAnimation,
    redrawCanvas,
  } = animateCanvas()

  const handleToggle = (e) => {
    const toggled = toggleAnimation(e)
    toggled === true ? stopped.value = true : stopped.value = false
  }

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
    drawToCanvas()
  })


</script>

<style lang="scss" scoped>

</style>
