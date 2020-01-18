import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { swapPassageBible, clearSwaps } from '../actions'
import BibleSwapper from './BibleSwapper'

export default function(){
  
  const { passage, swapped } =  useSelector(state => ({
    passage: state.passage,
    swapped: state.swappedVerses
  }), shallowEqual)

  const dispatch = useDispatch()

  const swap = passage => {
    dispatch(
      swapPassageBible(passage)
    )
  }

  const clear = () => {
    dispatch(
      clearSwaps()
    )
  }

  return(
    <div className='heading'>
      <h2 className='title'>
        {passage.book} {passage.chapter}:{passage.verseRange} ({passage.bible})
      </h2>
      <div className='controls'>
        <button
          onClick={clear}
          disabled={swapped.length < 1}
        >
          Clear
        </button>
        <BibleSwapper
          passage={passage}
          buttonText='Swap'
          buttonOnClick={swap}
        />
      </div>
    </div>
  )
}