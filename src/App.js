import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import Header from './components/Header';
import PassageHeading from './components/PassageHeading';
import Verse from './components/Verse';
import VerseSwapper from './components/VerseSwapper';

const App = () => {
  const { isToggled, isFetching, content, passage, swapped } = useSelector(
    state => ({
      isFetching: state.isFetching,
      isToggled: state.isToggled,
      content: state.content,
      passage: state.passage,
      swapped: state.swapped
    }),
    shallowEqual
  );

  const [verseToSwap, setVerseToSwap] = useState('');

  const allVerses = bible => {
    return content[bible][passage.book][passage.chapter].allVerses;
  };

  const verses = bible => {
    return content[bible][passage.book][passage.chapter].verses;
  };

  const position = () => {
    const v = document.querySelector(`#verse-${verseToSwap}`);
    const vPos = v.getClientRects()[v.getClientRects().length - 1].bottom;

    return {
      position: 'absolute',
      top: vPos + 4 + 'px',
      marginLeft: '-15.15rem',
      left: '50%'
    };
  };

  return (
    <>
      {isFetching && <Loading />}
      <div className="app">
        <Header />
        <PassageHeading />
        <p className="verses">
          {allVerses(passage.bible).map(num => {
            const swap = swapped.find(({ verse }) => verse === num);

            const isSwap = swap ? swap.bible : passage.bible;

            return (
              <Verse
                active={isToggled && num === verseToSwap}
                key={num}
                verseBible={isSwap}
                verseNum={num}
                text={verses(isSwap)[num]}
                verseToSwap={setVerseToSwap}
              />
            );
          })}
        </p>
        {isToggled && (
          <VerseSwapper
            position={position()}
            verseNum={verseToSwap}
            verseToSwap={setVerseToSwap}
          />
        )}
      </div>
    </>
  );
};

export default App;

function Loading() {
  return (
    <div className="loading">
      <span role="img" aria-label="cartoon book opened and spread flat">
        📖
      </span>
    </div>
  );
}
