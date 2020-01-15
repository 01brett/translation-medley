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
      <span
        className={showSwapControls ? 'verse active' : 'verse'}
        onClick={handleSwapControls}
      >
        {' '}
        <span className="verse-number">
          {verse.verseNumber} {verse.translation !== passage.translation && (
            <span className="ref">[{verse.translation}]</span>
          )}
        </span>
        {' '}{verse.text}
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