import {BLOCK_WIDTH, BLOCK_HEIGHT, NUMBER_BLOCKS, DISTANCE_BLOCK} from '../types/index'

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

export const createBlocks = () => {
  return new Array(NUMBER_BLOCKS).fill({}).map((_, i) => {
    const coordination = coordinations[i]

    const cx = BLOCK_WIDTH * coordination.col
    const cy = BLOCK_HEIGHT * coordination.row

    return {
      x: BLOCK_WIDTH - DISTANCE_BLOCK,
      y: BLOCK_HEIGHT - DISTANCE_BLOCK,
      cx,
      cy,
      isDestroy: false,

      destroy() {
        this.isDestroy = true
      },
    }
  })
}
