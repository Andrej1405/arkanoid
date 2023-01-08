import {PLATFORM_WIDTH, PLATFORM_HEIGHT} from '../types/index'

export const platform = {
	x: PLATFORM_WIDTH,
	y: PLATFORM_HEIGHT,
	cx: innerWidth / 2 - PLATFORM_WIDTH / 2,
	cy: innerHeight - PLATFORM_HEIGHT * 2,
	velocity: 12,
}