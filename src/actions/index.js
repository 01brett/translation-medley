import {
  fetchDefault,
  fetchNET,
  fetchESV
} from './fetchActions'

import {
  setPassage,
  setPassageBible
} from './passageActions'

import {
  addSwap,
  clearSwaps
} from './verseActions'

import {
  addContent,
  setContent
} from './contentActions'

export const swapPassageBible = passage => (dispatch, getState) => {
  const { content, passage: currentPassage } = getState()

  if (content.hasOwnProperty(passage.bible)) {
    dispatch(
      setPassageBible(passage.bible)
    )
  } else {
    switch (passage.bible) {
      case 'NET':
        dispatch(
          fetchNET(passage)
        )
        break
      case 'ESV':
        dispatch(
          fetchESV(passage)
        )
        break
      default:
        dispatch(
          fetchDefault(passage)
        )
        break
    } // end switch
  } // end else
}

export const swapVerse = passage => dispatch => {
  const swappedVerse = {
    verse: passage.verse,
    bible: passage.bible
  }
}

export {
  fetchDefault,
  fetchNET,
  fetchESV
} from './fetchActions'

export {
  setPassage,
  setPassageBible
} from './passageActions'

export {
  addSwap,
  clearSwaps
} from './verseActions'

export {
  addContent,
  setContent
} from './contentActions'