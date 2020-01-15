import React, { useState } from 'react';
import SwapControls from './SwapControls';

export default function({ verse, getVerse, currentTranslation }){
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
          {verse.verseNumber} {verse.translation && verse.translation !== currentTranslation && (
            <span className="ref">[{verse.translation}]</span>
          )}
        </span>
        {' '}{verse.text}
      </span>
      {showSwapControls && (
        <SwapControls
          getVerse={getVerse}
          cancel={handleSwapControls}
          currentTranslation={currentTranslation}
          verse={verse}
        />
      )}
    </>
  );
}