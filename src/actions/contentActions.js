// Content store of Bible passages
export const ADD_CONTENT = 'ADD_CONTENT'
export const SET_CONTENT = 'SET_CONTENT'

export const addContent = (passage, content) => ({
  type: ADD_CONTENT,
  payload: {
    [passage.bible]: {
      [passage.book]: {
        [passage.chapter]: {
          allVerses: Object.keys(content),
          verses: content
        }
      }
    }
  }
})

export const setContent = (passage, content) => ({
  type: SET_CONTENT,
  payload: {
    [passage.bible]: {
      [passage.book]: {
        [passage.chapter]: {
          allVerses: Object.keys(content),
          verses: content
        }
      }
    }
  }
})