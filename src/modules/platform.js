import {PLATFORM_WIDTH, PLATFORM_HEIGHT, CORRECT_PX} from '../types/index'

export const createPlatform = () => {
  return {
    x: PLATFORM_WIDTH,
    y: PLATFORM_HEIGHT,
    cx: innerWidth / 2 - PLATFORM_WIDTH / 2,
    cy: innerHeight - PLATFORM_HEIGHT * 2,
    velocity: 12,

    moveLeft() {
      if (this.cx - CORRECT_PX <= 0) return
      this.cx -= this.velocity
    },

    moveRight() {
      if (this.cx + CORRECT_PX >= frontCanvas.width - this.x) return
      this.cx += this.velocity
    },
  }
}
