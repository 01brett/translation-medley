////////////
// Passage updating
////////////
export const SET_PASSAGE_BIBLE = 'SET_PASSAGE_BIBLE'

export const setPassageBible = bible => ({
  type: SET_PASSAGE_BIBLE,
  payload: bible
})

////////////
// Swapped Verses updating
////////////
export const ADD_SWAP = 'ADD_SWAP'
export const CLEAR_SWAPS = 'CLEAR_SWAPS'

export const addSwap = verse => ({
  type: ADD_SWAP,
  payload: { ...verse }
})

export const clearSwaps = () => ({
  type: CLEAR_SWAPS
})