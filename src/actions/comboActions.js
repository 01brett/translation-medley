import axios from 'axios'

import {
  setPassageBible,
  fetchDefault,
  fetchESV,
  fetchNET
} from './index'

export const swapPassageBible = passage => (dispatch, getState) => {
  const { content, passage: currentPassage } = getState()

  const promise = func => new Promise((resolve) => {
    resolve(func)
  })

  if ( content.hasOwnProperty(passage.bible) ) {
    dispatch( setPassageBible(passage.bible) )
  } else {
    switch (passage.bible) {
      case 'NET':
        promise( dispatch( fetchNET(passage) ) )
          .then( console.log('Promise Success') )
        break
      case 'ESV':
        dispatch( fetchESV(passage) )
        break
      default:
        dispatch( fetchDefault(passage) )
        break
    } // end switch
  } // end else
}

export const swapVerse = passage => dispatch => {
  // const swappedVerse = {
  //   verse: passage.verse,
  //   bible: passage.bible
  // }
}

export const searchPassage = passage => dispatch => {

}