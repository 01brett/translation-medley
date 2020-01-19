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
export const SHOW_CONTROLS = 'SHOW_CONTROLS'
export const HIDE_CONTROLS = 'HIDE_CONTROLS'

export const addSwap = verse => ({
  type: ADD_SWAP,
  payload: verse
})

export const clearSwaps = () => ({
  type: CLEAR_SWAPS
})

export const showControls = () => ({
  type: SHOW_CONTROLS
})

export const hideControls = () => ({
  type: HIDE_CONTROLS
})