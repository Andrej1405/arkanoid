import {BALL_RADIUS, CORRECT_PX} from '../types/index'

export const createBall = platform => {
  return {
    radius: BALL_RADIUS,
    cx: platform.cx + platform.x / 2 - BALL_RADIUS / 2 + BALL_RADIUS / 2,
    cy: platform.cy - BALL_RADIUS - CORRECT_PX,

    move() {
      if (this.cy - this.radius - CORRECT_PX >= 0) {
        this.cx -= 1
        this.cy -= 2
        return
      }

      if (this.cy - this.radius - CORRECT_PX <= 0) {
        this.cy += 2
        this.cx -= 1
        return
      }

      if (this.cy >= frontCanvas.height) {
        this.cy -= 2
      }
    },
  }
}
