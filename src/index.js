import {createCanvas, drawStar} from "./helpers"

const NUMBER_STARS_CANVAS = 100
const PLATFORM_WIDTH = 200
const PLATFORM_HEIGHT = 30
const BALL_WIDTH = 25
const BALL_HEIGHT = 25
const KEYBORD_KEYS = [['ArrowLeft', 'a'], ['ArrowRight', 'd'], ['Space']]

const platform = {
	x: PLATFORM_WIDTH,
	y: PLATFORM_HEIGHT,
	cx: window.innerWidth / 2 - PLATFORM_WIDTH / 2,
	cy: window.innerHeight - PLATFORM_HEIGHT * 2,
}

const ball = {
	isMovement: false,
	x: BALL_WIDTH,
	y: BALL_HEIGHT,
	cx: platform.cx + platform.x / 2 - BALL_WIDTH / 2,
	cy: platform.cy - BALL_HEIGHT - 2,
}

;(function main() {
	const backCanvas = createCanvas('backCanvas', 'position: absolute; top: 0; left: 0')
	const backCanvasCtx = backCanvas.getContext('2d')

	const frontCanvas = createCanvas('frontCanvas', 'position: relative')
	const frontCanvasCtx = frontCanvas.getContext('2d')

	// Render backCanvas with background and stars
	const render = () => {
		backCanvasCtx.fillStyle = '#071672'
    backCanvasCtx.fillRect(0, 0, backCanvas.width, backCanvas.height)

		for (let i = 0; i < NUMBER_STARS_CANVAS; i++) {
			const cx = 8
			const cy = 3
			const x = Math.random() * backCanvas.width
			const y = Math.random() * backCanvas.height
		
			drawStar(backCanvasCtx, x, y, cx, cy)
		}

		game()
	}

	const game = () => {
		requestAnimationFrame(game) 

		frontCanvasCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height)

		frontCanvasCtx.fillRect(platform.cx, platform.cy, platform.x, platform.y)
		frontCanvasCtx.fillRect(ball.cx, ball.cy, ball.x, ball.y)

		if (ball.isMovement) {
			ball.cy -= 2;
		}
	}
	
	window.addEventListener('resize', () => {
		backCanvas.setAttribute('width', window.innerWidth)
		backCanvas.setAttribute('height', window.innerHeight)

		frontCanvas.setAttribute('width', window.innerWidth)
		frontCanvas.setAttribute('height', window.innerHeight)

		requestAnimationFrame(render)
	})

	window.addEventListener('keydown', e => {
		if (!KEYBORD_KEYS.flat(1).includes(e.key) && !KEYBORD_KEYS.flat(1).includes(e.code)) return
		if (KEYBORD_KEYS[0].includes(e.key)) platform.cx -= 6
		if (KEYBORD_KEYS[1].includes(e.key)) platform.cx += 6
		if (KEYBORD_KEYS[2].includes(e.code)) ball.isMovement = !ball.isMovement
	})

	requestAnimationFrame(render)
})()