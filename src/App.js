import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import {
  fetchVerse, fetchNETVerse, fetchESVVerse
} from './actions/verseActions';

import {
  fetchPassage, fetchNETPassage, fetchESVPassage
} from './actions/passageActions';

import Controls from './components/Controls';
import Verse from './components/Verse';
// import Search from './components/Search';

const App = () => {
  const { passage } =  useSelector(state => ({
    passage: state.passage,
  }), shallowEqual);

  const dispatch = useDispatch();

  const getPassage = bible => {
    switch (bible) {
      case 'NET':
        dispatch(
          fetchNETPassage(`${passage.book} ${passage.chapter}`)
        );
        break;
      case 'ESV':
        dispatch(
          fetchESVPassage(`${passage.book}+${passage.chapter}`)
        );
        break;
      default:
        dispatch(
          fetchPassage(bible, `${passage.book} ${passage.chapter}`)
        );
        break;
    }
  }

  const getVerse = (bible, verse) => {
    switch (bible) {
      case 'NET':
        dispatch(
          fetchNETVerse(`${passage.book} ${passage.chapter}.${verse}`)
        );
        break;
      case 'ESV':
        dispatch(
          fetchESVVerse(`${passage.book}+${passage.chapter}:${verse}`)
        );
        break;
      default:
        dispatch(
          fetchVerse(bible, `${passage.book} ${passage.chapter}.${verse}`)
        );
        break;
    }
  }

  return (
    <div className="app">
      {passage && (
        <>
          <h1>Bible Translation Medley</h1>
          {/* <Search /> */}
          <div className='locator'>
            <h3>{passage.book} {passage.chapter} ({passage.bible})</h3>
            <Controls
              onButton={getPassage}
              buttonText='Swap'
            />
          </div>
          <div className="verses">
            {passage.content.map(verse => (
              <Verse
                key={verse.verse}
                verse={verse}
                getVerse={getVerse}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
