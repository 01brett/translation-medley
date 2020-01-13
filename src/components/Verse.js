import React from 'react';

// import VerseControls from './VerseControls';

const Verse = ({ verse }) => {
  return(
    <>
      <span className="verse">
        <span className="verse-number">
          {verse.verse}
        </span>
        {' '}{verse.text}{' '}
      </span>
    </>
  );
}

export default Verse;