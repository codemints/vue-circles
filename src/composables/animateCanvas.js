import { ref } from 'vue'

const animateCanvas = () => {
  const circleData = ref({})
  const $_ = circleData.value
  
  //FUNCTION METHODS
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min
  }
  
  const setRandomPostion = (axis, rad) => {
    return Math.random() * ($_.canvas[axis] - rad * 2) + rad
  }
  
  const getRandomColor = (args) => {
    const select = getRandomNumber(1, 2)
    return select === 1 ? args[0] : args[1]
  }
  
  //CIRCLE FACTORY
  class Circle {
    constructor(x, y, rad, color) {
      this.x = x
      this.y = y
      this.rad = rad
      this.color = color
      this.dx = (Math.random() * $_.velocity) + 1
      this.dx *= Math.floor(Math.random() * 2) === 1 ? 1 : -1
      this.dy = (Math.random() * $_.velocity) + 1
      this.dy *= Math.floor(Math.random() * 2) === 1 ? 1 : -1
    }
    
    drawCircle() {
      $_.ctx.beginPath()
      $_.ctx.fillStyle = this.color
      $_.ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2)
      $_.ctx.fill()
      $_.ctx.shadowOffsetX = 3
      $_.ctx.shadowOffsetY = 3
      $_.ctx.shadowColor = 'rgba(0, 0, 0, 0.075)'
      $_.ctx.shadowBlur = 15
    }
    
    animateCircle() {
      this.x += this.dx
      this.y += this.dy

      if ( this.x + this.rad > $_.canvas.width || this.x - this.rad < 0) this.dx = -this.dx
      if ( this.y + this.rad > $_.canvas.height || this.y - this.rad < 0) this.dy = -this.dy
      
      this.drawCircle()
    }
  }

  //SETTER
  const setCircleData = (obj) => {
    $_.canvas = obj.canvas
    $_.ctx = obj.canvas.getContext('2d')
    $_.seedColors = obj.seedColors
    $_.clickColors = obj.clickColors
    $_.maxSize = obj.maxSize
    $_.minSize = obj.minSize
    $_.maxPop = obj.maxPop
    $_.minPop = obj.minPop
    $_.velocity = obj.velocity
    $_.initVelocity = obj.velocity
    $_.frame = -1
    $_.circles = populateCircles(obj.minPop, obj.maxPop, obj.minSize, obj.maxSize)
  }


  //CREATE ARRAY OF CIRCLES
  const populateCircles = (minPop, maxPop, minSize, maxSize) => {
    const circles = []
    const population = getRandomNumber(minPop, maxPop)
    
    for ( let i = 0; i < population; i++ ) {
      let rad = getRandomNumber(minSize, maxSize)
      let x = setRandomPostion('width', rad)
      let y = setRandomPostion('height', rad)
      let color = getRandomColor($_.seedColors)
      circles.push(new Circle(x, y, rad, color))
    }

    return circles
  }
  
  //DRAW CIRCLES ON CANVAS & ANIMATE
  const drawToCanvas = () => {
    $_.ctx.clearRect(0, 0, $_.canvas.width, $_.canvas.height)
    
    $_.circles.forEach((item, index, array) => array[index].animateCircle())
    
    $_.frame = requestAnimationFrame(drawToCanvas)
  }

  const spawnNewCircle = (e) => {
    const rad = getRandomNumber($_.minSize, $_.maxSize)
    $_.circles.push(new Circle(e.clientX, e.clientY, rad, getRandomColor($_.clickColors)))
  }

  //INITIALIZE FUNCTION  
  const initCircleAnimation = () => {
    drawToCanvas()
  }

  const changeVelocity = (e) => {
    const method = e.target.dataset.function
    method === 'increase' ? $_.velocity += 0.25 : $_.velocity -= 0.25
    $_.circles.forEach(circle => {
      if ( method === 'increase' ) {
        circle.dx *= 1.125
        circle.dy *= 1.125
      } else {
        circle.dx *= 0.875
        circle.dy *= 0.875
      }
    })
  }
  
  const clearCanvas = () => {
    cancelAnimationFrame($_.frame)
    $_.ctx.clearRect(0, 0, $_.canvas.width, $_.canvas.height)
    $_.velocity = $_.initVelocity
    $_.circles = populateCircles($_.minPop, $_.maxPop, $_.minSize, $_.maxSize)

    $_.redrawn = false
    $_.cleared = true
  }
  
  const toggleAnimation = () => {
    if ( $_.cleared === true ) return false
    if ( $_.stopped ) {
      $_.frame = requestAnimationFrame(drawToCanvas)
      return $_.stopped = false
    }
    cancelAnimationFrame($_.frame)
    $_.stopped = true

    return true
  }
  
  const redrawCanvas = () => {
    if ( $_.redrawn === true || $_.redrawn === undefined ) return
    $_.frame = requestAnimationFrame(drawToCanvas)
    $_.redrawn = true
    $_.cleared = false
  }
  
  //RETURNED DATA
  return {
    circleData,
    setCircleData,
    drawToCanvas,
    spawnNewCircle,
    changeVelocity,
    clearCanvas,
    toggleAnimation,
    redrawCanvas,
  }
}

export default animateCanvas