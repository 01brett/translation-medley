import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import Verse from './Verse';

const Verses = () => {
  const { verses } = useSelector(state => ({
    verses: state.passage.verses
  }), shallowEqual)
  return(
    <>
      <p className="verses">
      {verses.map((verse, index) => (
        <Verse key={index + verse.verse} verse={verse}/>
      ))}
      </p>
    </>
  );
}

export default Verses;