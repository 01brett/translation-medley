import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export default function(){
  const { passage } =  useSelector(state => ({
    passage: state.passage
  }), shallowEqual);
  return(
    <div className='heading'>
      <h3>
        {passage.book} {passage.chapter}:{passage.verseRange} ({passage.bible})
      </h3>
    </div>
  );
}