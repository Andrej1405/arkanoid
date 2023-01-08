import {createCanvas, drawStar} from "./helpers"
import {
	PLATFORM_WIDTH,
	PLATFORM_HEIGHT,
	BALL_RADIUS,
	NUMBER_BLOCKS,
	BLOCK_HEIGHT,
	BLOCK_WIDTH,
	DISTANCE_BLOCK,
	NUMBER_STARS_CANVAS,
	KEYBORD_KEYS,
	CORRECT_PX,
	colors,
} from './types'

const platform = {
	x: PLATFORM_WIDTH,
	y: PLATFORM_HEIGHT,
	cx: innerWidth / 2 - PLATFORM_WIDTH / 2,
	cy: innerHeight - PLATFORM_HEIGHT * 2,
}

const ball = {
	radius: BALL_RADIUS,
	cx: platform.cx + platform.x / 2 - BALL_RADIUS / 2 + BALL_RADIUS / 2,
	cy: platform.cy - BALL_RADIUS - 3,
}

// FIXME Fix calculation of the location of the columns of blocks 
const coordinations = {
	0: {row: 1, col: 1},
	1: {row: 1, col: 2},
	2: {row: 1, col: 3},
	3: {row: 1, col: 4},
	4: {row: 1, col: 5},
	5: {row: 2, col: 1.5},
	6: {row: 2, col: 2.5},
	7: {row: 2, col: 3.5},
	8: {row: 2, col: 4.5},
	9: {row: 3, col: 2},
	10: {row: 3, col: 3},
	11: {row: 3, col: 4},
	12: {row: 4, col: 2.5},
	13: {row: 4, col: 3.5},
	14: {row: 5, col: 3},
}

const blocks = new Array(NUMBER_BLOCKS).fill({}).map((_, i) => {
	const coordination = coordinations[i]

	const cy = BLOCK_HEIGHT * coordination.row
	const cx = BLOCK_WIDTH * coordination.col
	
	return {
		x: BLOCK_WIDTH - DISTANCE_BLOCK,
		y: BLOCK_HEIGHT - DISTANCE_BLOCK,
		cx,
		cy,
		color: colors.block,
	}
})

const arkanoid = {
	isStart: false,
	platform,
	ball,
	blocks,
}

;(function main() {
	const backCanvas = createCanvas('backCanvas', 'position: absolute; top: 0; left: 0')
	const backCanvasCtx = backCanvas.getContext('2d')

	const frontCanvas = createCanvas('frontCanvas', 'position: relative')
	const frontCanvasCtx = frontCanvas.getContext('2d')

	// Render backCanvas with background and stars
	const render = () => {
		backCanvasCtx.fillStyle = colors.backCanvas
    backCanvasCtx.fillRect(0, 0, backCanvas.width, backCanvas.height)

		for (let i = 0; i < NUMBER_STARS_CANVAS; i++) {
			const cx = 8
			const cy = 3
			const x = Math.random() * (backCanvas.width - cx) + cx
			const y = Math.random() * (backCanvas.height - cy) + cy
		
			drawStar(backCanvasCtx, x, y, cx, cy)
		}

		game()
	}

	const game = () => {
		requestAnimationFrame(game) 

		frontCanvasCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height)

		// Draw platform
		frontCanvasCtx.fillStyle = colors.platform
		frontCanvasCtx.fillRect(platform.cx, platform.cy, platform.x, platform.y)
		
		// Draw blocks
		blocks.forEach(block => {
			frontCanvasCtx.fillStyle = block.color
			frontCanvasCtx.fillRect(block.cx, block.cy, block.x, block.y)
		})

		// Draw ball
		frontCanvasCtx.fillStyle = colors.ball
		frontCanvasCtx.beginPath()
		frontCanvasCtx.arc(ball.cx, ball.cy, ball.radius, 0, 2 * Math.PI)
		frontCanvasCtx.closePath()
		frontCanvasCtx.fill()
		
		if (arkanoid.isStart) {
			ball.cy -= 2;
			ball.cx -= 1;
		}
	}
	
	window.addEventListener('resize', () => {
		backCanvas.setAttribute('width', innerWidth)
		backCanvas.setAttribute('height', innerHeight)

		frontCanvas.setAttribute('width', innerWidth)
		frontCanvas.setAttribute('height', innerHeight)

		requestAnimationFrame(render)
	})

	window.addEventListener('keydown', e => {
		if (!KEYBORD_KEYS.flat(1).includes(e.code)) return

		if (KEYBORD_KEYS[0].includes(e.code)) {
			if (platform.cx - CORRECT_PX <= 0) return

			platform.cx -= 6
			return
		}

		if (KEYBORD_KEYS[1].includes(e.code)) {
			if (platform.cx + CORRECT_PX >= frontCanvas.width - platform.x) return

			platform.cx += 6
			return
		}

		if (KEYBORD_KEYS[2].includes(e.code)) arkanoid.isStart = !arkanoid.isStart
	})

	requestAnimationFrame(render)
})()