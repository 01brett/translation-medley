import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import Header from './components/Header';
import PassageHeading from './components/PassageHeading';
import Verse from './components/Verse';
import VerseSwapper from './components/VerseSwapper';
import Search from './components/Search';

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
  const [position, setPosition] = useState({});
  const [verseRangeDisplay, setVerseRangeDisplay] = useState([]);

  useEffect(() => {
    let v, vPos;
    if (verseToSwap) {
      v = document.querySelector(`#verse-${verseToSwap}`);
      vPos = v.getClientRects()[0].top;
    }

    const pos = {
      position: 'absolute',
      top: vPos + window.scrollY - 54 + 'px',
      marginLeft: '-15.15rem',
      left: '50%'
    };
    setPosition(pos);

    const verseRange =
      passage.bible &&
      content[passage.bible] &&
      content[passage.bible][passage.book] &&
      content[passage.bible][passage.book][passage.chapter] &&
      content[passage.bible][passage.book][passage.chapter].allVerses;

    console.log(verseRange);
    if (verseRange.length > 1) {
      if (
        passage.verseRange !==
        `${verseRange[0]}-${verseRange[verseRange.length - 1]}`
      ) {
        const split = passage.verseRange.split('-');
        console.log('split ···', split);
        const sliced = verseRange.slice(
          verseRange[Number(split[0]) - 2],
          verseRange[Number(split[1]) - 1]
        );
        setVerseRangeDisplay(sliced);
      } else {
        setVerseRangeDisplay(verseRange);
      }
    } else {
      if (passage.verseRange === `${verseRange[0]}`) {
        setVerseRangeDisplay(verseRange);
      }
    }
  }, [
    verseToSwap,
    content,
    passage.bible,
    passage.book,
    passage.chapter,
    passage.verseRange
  ]);

  return (
    <>
      {isFetching && <Loading />}
      <div className="app">
        <Header />
        <Search />
        {!passage.bible && <Empty />}
        {passage.book && content[passage.bible][passage.book] && (
          <>
            <PassageHeading />
            <p className="verses">
              {verseRangeDisplay.map(num => {
                const verses = bible => {
                  return (
                    passage.bible &&
                    content[bible][passage.book][passage.chapter].verses
                  );
                };
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
          </>
        )}
        {isToggled && (
          <VerseSwapper
            position={position}
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

function Empty() {
  return (
    <>
      <p className="empty">
        Find a chapter or passage from one of the available translations. Once
        the text has loaded, feel free to choose a verse and begin swapping out
        just that verse, in context, for different translations. See the beauty
        of Scripture unfold through a medley of translations.
      </p>
    </>
  );
}
