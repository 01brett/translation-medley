import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import Controls from './Controls';

export default function(props){
  const { passage } =  useSelector(state => ({
    passage: state.passage,
  }), shallowEqual);

  return(
    <>
      <span className="verse-number">
        {' '}{props.number}{' '}

        {props.bible !== passage.bible && (
          <span className="ref">({props.bible}){' '}</span>
        )}
      </span>
      
      <span className={props.bible !== passage.bible ? 'changed' : null}>
        <span className='verse'>{props.text}</span>
      </span>
    </>
  );
}