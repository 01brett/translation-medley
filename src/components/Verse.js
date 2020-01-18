import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export default function({ verseNum, verseBible, text, verseToSwap }){

  const { passageBible } =  useSelector(state => ({
    passageBible: state.passage.bible,
  }), shallowEqual)

  const toggleControls = () => {
    verseToSwap(verseNum)
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
        onClick={toggleControls}
      >
        {text}
      </span>

    </span>
  )
}