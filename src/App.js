import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { getPassage } from './actions';

import Controls from './components/Controls';
import Verse from './components/Verse';
// import Search from './components/Search';

const App = () => {
  const { passage, content } =  useSelector(state => ({
    passage: state.passage,
    content: state.content
  }), shallowEqual);

  const dispatch = useDispatch();

  const allVerses = content[passage.bible][passage.book][passage.chapter].allVerses;
  const verses = content[passage.bible][passage.book][passage.chapter].verses;


  return (
    <div className="app">
      {passage && (
        <>
          <h1>Bible Translation Medley</h1>
          {/* <Search /> */}
          <div className='locator'>
            <h3>{passage.book} {passage.chapter}:{passage.verseRange} ({passage.bible})</h3>
          </div>
          <div className="verses">
            {allVerses.map(num => (
              <Verse key={num}
                number={num}
                text={verses[num]}
                bible={passage.bible}
                getPassage={getPassage}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
