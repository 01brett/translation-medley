import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import Controls from './Controls';

export default function(props){
  const { passage } =  useSelector(state => ({
    passage: state.passage,
  }), shallowEqual);

  const [isVerseSwapping, setIsVerseSwapping] = useState(false)

  const handleVerseSwap = () => {
    setIsVerseSwapping(prev => !prev);
  }

  const getVerse = bible => {
    props.getVerse(bible, props.verse.verse);
    handleVerseSwap();
  }

  return(
    <>
      <span className="verse-number">
        {' '}{props.verse.verse}{' '}

        {props.verse.bible !== passage.bible && (
          <span className="ref">({props.verse.bible}){' '}</span>
        )}
      </span>
      
      <span className={props.verse.bible !== passage.bible ? 'changed' : null}>
        <span
          className={isVerseSwapping ? 'verse active' : 'verse'}
          onClick={handleVerseSwap}
        >
          {props.verse.text}
        </span>
      </span>

      {isVerseSwapping && (
        <div className='verse-swap'>
          <button onClick={handleVerseSwap}>Cancel</button>
          <Controls
            onButton={getVerse}
            buttonText='Swap'
            verse={props.verse}
          />
        </div>
      )}

    
    </>
  );
}