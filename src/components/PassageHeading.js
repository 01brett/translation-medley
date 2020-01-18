import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { getPassage, clearSwaps } from '../actions'
import BibleSwapper from './BibleSwapper'

export default function(){
  
  const { passage } =  useSelector(state => ({
    passage: state.passage
  }), shallowEqual)

  const dispatch = useDispatch()

  const swapPassage = passage => {
    dispatch(
      getPassage(passage)
    )
  }

  const clear = () => {
    dispatch(
      clearSwaps()
    )
  }

  console.log('PassageHeading Passage', passage)
  return(
    <div className='heading'>
      <h2 className='title'>
        {passage.book} {passage.chapter}:{passage.verseRange} ({passage.bible})
      </h2>
      <div className='controls'>
        <button
          onClick={clear}
          disabled={passage.swappedVerses.length < 1}
        >
          Clear
        </button>
        <BibleSwapper
          passage={passage}
          buttonText='Swap'
          buttonOnClick={swapPassage}
        />
      </div>
    </div>
  )
}