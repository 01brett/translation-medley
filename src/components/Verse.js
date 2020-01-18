import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export default function({ verseNum, verseBible, text }){

  const { passageBible } =  useSelector(state => ({
    passageBible: state.passage.bible,
  }), shallowEqual)

  return(
    <>
      <span className="verse-number">
        {' '}{verseNum}{' '}
        {verseBible !== passageBible && (
          <span className="ref">({verseBible}){' '}</span>
        )}
      </span>
      
      <span className={
        verseBible !== passageBible ? 'swapped verse' : 'verse'
      }>{text}</span>
    </>
  )
}