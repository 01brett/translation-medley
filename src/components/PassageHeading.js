import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import { getPassage, clearSwaps } from '../actions'
import BibleSwapper from './BibleSwapper'

export default function(){
  
  const { book, chapter, verseRange, bible } =  useSelector(state => ({
    bible: state.passage.bible,
    book: state.passage.book,
    chapter: state.passage.chapter,
    verseRange: state.passage.verseRange
  }), shallowEqual)

  const passage = {
    bible,
    book,
    chapter,
    verseRange
  }

  return(
    <div className='heading'>
      <h2 className='title'>
        {book} {chapter}:{verseRange} ({bible})
      </h2>
      <div className='controls'>
        
        <BibleSwapper
          passage={passage}
          primaryText='Swap'
          primaryOnClick={getPassage}
          secondaryText='Clear'
          secondaryOnClick={clearSwaps}
        />
      </div>
    </div>
  )
}