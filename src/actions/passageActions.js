import {
  SET_PASSAGE,
  SET_PASSAGE_BIBLE
} from '../types'

export const setPassage = passage => ({
  type: SET_PASSAGE,
  payload: { ...passage }
})

export const setPassageBible = bible => ({
  type: SET_PASSAGE_BIBLE,
  payload: bible
})