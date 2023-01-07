import {createCanvas, drawStar} from "./helpers"

const NUMBER_STARS_CANVAS = 100
const PLATFORM_WIDTH = 200
const PLATFORM_HEIGHT = 24
const BALL_RADIUS = 18
const KEYBORD_KEYS = [['ArrowLeft', 'KeyA'], ['ArrowRight', 'KeyD'], ['Space']]

const platform = {
	x: PLATFORM_WIDTH,
	y: PLATFORM_HEIGHT,
	cx: innerWidth / 2 - PLATFORM_WIDTH / 2,
	cy: innerHeight - PLATFORM_HEIGHT * 2,
	color: '#A69200',
}

const ball = {
	isMovement: false,
	radius: BALL_RADIUS,
	cx: platform.cx + platform.x / 2 - BALL_RADIUS / 2 + BALL_RADIUS / 2,
	cy: platform.cy - BALL_RADIUS - 3,
	color: '#A65800',
}

;(function main() {
	const backCanvas = createCanvas('backCanvas', 'position: absolute; top: 0; left: 0')
	const backCanvasCtx = backCanvas.getContext('2d')

	const frontCanvas = createCanvas('frontCanvas', 'position: relative')
	const frontCanvasCtx = frontCanvas.getContext('2d')

	// Render backCanvas with background and stars
	const render = () => {
		backCanvasCtx.fillStyle = '#020C4A'
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

		frontCanvasCtx.fillStyle = platform.color
		frontCanvasCtx.fillRect(platform.cx, platform.cy, platform.x, platform.y)
		
		frontCanvasCtx.fillStyle = ball.color
		frontCanvasCtx.beginPath()
		frontCanvasCtx.arc(ball.cx, ball.cy, ball.radius, 0, 2 * Math.PI)
		frontCanvasCtx.closePath()
		frontCanvasCtx.fill()
		
		if (ball.isMovement) {
			ball.cy -= 2;
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
		if (KEYBORD_KEYS[0].includes(e.code)) platform.cx -= 6
		if (KEYBORD_KEYS[1].includes(e.code)) platform.cx += 6
		if (KEYBORD_KEYS[2].includes(e.code)) ball.isMovement = !ball.isMovement
	})

	requestAnimationFrame(render)
})()