import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export default function(props){
  console.log(props)
  const { passage } =  useSelector(state => ({
    passage: state.passage,
  }), shallowEqual)

  return(
    <>
      <span className="verse-number">
        {' '}{props.verseNum}{' '}
        {props.verseBible !== passage.bible && (
          <span className="ref">
            ({props.verseBible}){' '}
          </span>
        )}
      </span>
      
      <span className={
        props.verseBible !== passage.bible ? 'changed' : null
      }>
        <span className='verse'>{props.text}</span>
      </span>
    </>
  );
}