import {BALL_RADIUS, CORRECT_PX} from '../types/index'

export const createBall = platform => {
  return {
    x: platform.cx + platform.x / 2 - BALL_RADIUS / 2 + BALL_RADIUS / 2,
    y: platform.cy - BALL_RADIUS - CORRECT_PX,
    radius: BALL_RADIUS,
    velocity: 6,

    move({platform, blocks}) {
      this.y -= this.velocity

      for (const block of blocks) {
        if (this.collide(block)) {
          block.destroy()
          this.velocity = -6
          return
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
