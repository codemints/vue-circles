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

  const changeVelocity = (method) => {
    method === 'increase' ? $_.velocity *= 1.125 : $_.velocity *= 0.875
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
    $_.velocity = obj.velocity
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
    
    requestAnimationFrame(drawToCanvas)
  }

  const spawnNewCircle = (e) => {
    const rad = getRandomNumber($_.minSize, $_.maxSize)
    $_.circles.push(new Circle(e.clientX, e.clientY, rad, getRandomColor($_.clickColors)))
  }

  //INITIALIZE FUNCTION  
  const initCircleAnimation = () => {
    drawToCanvas(populateCircles())
  }

  //RETURNED DATA
  return {
    circleData,
    setCircleData,
    initCircleAnimation,
    spawnNewCircle,
    changeVelocity
  }
}

export default animateCanvas