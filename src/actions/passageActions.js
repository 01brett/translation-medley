// Passage updating
export const SET_PASSAGE = 'SET_PASSAGE'
export const SET_PASSAGE_BIBLE = 'SET_PASSAGE_BIBLE'

export const setPassage = passage => ({
  type: SET_PASSAGE,
  payload: { ...passage }
})

export const setPassageBible = bible => ({
  type: SET_PASSAGE_BIBLE,
  payload: bible
})