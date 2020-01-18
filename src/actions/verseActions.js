import {
  ADD_SWAP,
  CLEAR_SWAPS,
} from '../types'

export const addSwap = verse => ({
  type: ADD_SWAP,
  payload: { ...verse }
})

export const clearSwaps = () => ({
  type: CLEAR_SWAPS
})