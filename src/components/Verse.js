import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { showControls } from '../actions'

export default function({
  verseNum, verseBible, text, verseToSwap, verseSwapper
}) {

  const { passageBible } =  useSelector(state => ({
    passageBible: state.passage.bible,
  }), shallowEqual)

  const dispatch = useDispatch()

  const handleClick = () => {
    verseToSwap(verseNum)
    dispatch(showControls())
  }

  return(
    <span id={`verse-${verseNum}`}>

      <span className="verse-number">
        {' '}{verseNum}{' '}
        {verseBible !== passageBible && (
          <span className="ref">({verseBible}){' '}</span>
        )}
      </span>
      
      <span 
        className={verseBible !== passageBible ? 'swapped verse-text' : 'verse-text'}
        onClick={handleClick}
      >
        {text}
      </span>

    </span>
  )
}