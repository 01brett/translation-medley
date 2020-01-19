// Swapped Verses updating
export const ADD_SWAP = 'ADD_SWAP'
export const CLEAR_SWAPS = 'CLEAR_SWAPS'

export const addSwap = verse => ({
  type: ADD_SWAP,
  payload: { ...verse }
})

export const clearSwaps = () => ({
  type: CLEAR_SWAPS
})