import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { getPassage } from './actions';

import Controls from './components/Controls';
import Verse from './components/Verse';
// import Search from './components/Search';

const App = () => {
  const { passage } =  useSelector(state => ({
    passage: state.passage,
  }), shallowEqual);

  const dispatch = useDispatch();

  

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
