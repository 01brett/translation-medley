import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SwapControls from './SwapControls';

export default function({ verse, getVerse }){
  const { passage } =  useSelector(state => ({
    passage: state.passage
  }), shallowEqual);

  const [showSwapControls, setShowSwapControls] = useState(false);

  const handleSwapControls = () => {
    setShowSwapControls(prev => !prev);
  }

  return(
    <>
      
      <span className="verse-number">
        {' '}{verse.verseNumber}{' '}

        {verse.translation !== passage.translation && (
          <span className="ref">({verse.translation}){' '}</span>
        )}
      </span>
      
      <span className={verse.translation !== passage.translation ? 'changed' : null}>
        <span
          className={showSwapControls ? 'verse active' : 'verse'}
          onClick={handleSwapControls}
        >
          {verse.text}
        </span>
      </span>

      {showSwapControls && (
        <SwapControls
          getVerse={getVerse}
          cancel={handleSwapControls}
          verse={verse}
        />
      )}

    
    </>
  );
}