<template>
  <button
    @click.stop.prevent="click"
    @mousedown.stop.prevent="clicked = !clicked"
    @mouseup.stop.prevent="clicked = !clicked"
    :data-type="datatype"
    :data-function="datafunction"
    :class="{isClicked: clicked}"
  >
    <slot></slot>
  </button>
</template>

<script setup>
  import { ref } from 'vue'
  const clicked = ref(false)
  const props = defineProps([
    'click',
    'datatype',
    'datafunction'
  ])

  

</script>

<style lang="scss" scoped>

</style>