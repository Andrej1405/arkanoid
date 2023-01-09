export function createCanvas(id = '', styles = '') {
  const GAME_WIDTH = window.innerWidth
  const GAME_HEIGHT = window.innerHeight

  const canvas = document.createElement('canvas')

  canvas.setAttribute('id', id)
  canvas.setAttribute('width', GAME_WIDTH)
  canvas.setAttribute('height', GAME_HEIGHT)
  canvas.style = styles

  document.body.appendChild(canvas)

  return canvas
}
