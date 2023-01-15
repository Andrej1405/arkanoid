import {BALL_RADIUS, CORRECT_PX} from '../types/index'

export const createBall = platform => {
  return {
    x: platform.cx + platform.x / 2 - BALL_RADIUS / 2 + BALL_RADIUS / 2,
    y: platform.cy - BALL_RADIUS - CORRECT_PX,
    radius: BALL_RADIUS,
    velocity: 1,

    move({platform, blocks}) {
      let isCollide = false

      this.y -= this.velocity

      for (const block of blocks) {
        isCollide = this.collide(block)
        
        if (isCollide) {
          block.destroy()
          this.velocity = -1
        }
      }
    },

    collide(element) {
      let isCollide = false

      const x = this.x - this.radius
      const y = this.y - this.radius

      if (
          x * 2 > element.x &&
          x < element.x + element.cx &&
          y * 2 > element.y &&
          y < element.y + element.cy
        ) {

        isCollide = true
        return isCollide
      }

      return isCollide
    },
  }
}
