import {createCanvas, drawStar} from "./helpers"
import {createPlatform, createBlocks, createBall} from "./modules"
import {NUMBER_STARS_CANVAS, KEYBORD_KEYS, colors} from './types'

const platform = createPlatform()
const blocks = createBlocks()
const ball = createBall(platform)

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

	// Render 'backCanvas' with background and stars
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
			frontCanvasCtx.fillStyle = colors.block
			frontCanvasCtx.fillRect(block.cx, block.cy, block.x, block.y)
		})

		// Draw ball
		frontCanvasCtx.fillStyle = colors.ball
		frontCanvasCtx.beginPath()
		frontCanvasCtx.arc(ball.cx, ball.cy, ball.radius, 0, 2 * Math.PI)
		frontCanvasCtx.closePath()
		frontCanvasCtx.fill()
		
		if (arkanoid.isStart) ball.move()
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
		if (KEYBORD_KEYS[0].includes(e.code)) platform.moveLeft()
		if (KEYBORD_KEYS[1].includes(e.code)) platform.moveRight()
		if (KEYBORD_KEYS[2].includes(e.code)) arkanoid.isStart = !arkanoid.isStart
	})

	requestAnimationFrame(render)
})()