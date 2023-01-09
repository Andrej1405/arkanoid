export function drawStar(ctx, cx, cy, outerRadius, innerRadius, spikes = 5) {
  const step = Math.PI / spikes
  let rot = (Math.PI / 2) * 3
  let x = cx
  let y = cy

  ctx.beginPath()
  ctx.moveTo(cx, cy)

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy + Math.sin(rot) * outerRadius

    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius

    ctx.lineTo(x, y)
    rot += step
  }

  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath()

  ctx.fillStyle = '#FFE100'
  ctx.fill()
}
