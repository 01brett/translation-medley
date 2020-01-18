import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export default function(){
  
  const { book, chapter, verseRange, bible } =  useSelector(state => ({
    book: state.passage.book,
    chapter: state.passage.chapter,
    verseRange: state.passage.verseRange,
    bible: state.passage.bible
  }), shallowEqual);

  return(
    <div className='heading'>
      <h3>
        {book} {chapter}:{verseRange} ({bible})
      </h3>
    </div>
  );
}