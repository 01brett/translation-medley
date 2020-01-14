import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { fetchVerse } from './actions/verseActions';
import translations from './helpers/translations';
import Verse from './components/Verse';

const App = () => {
  const { passage, isFetching } =  useSelector(state => ({
    passage: state.passage,
    isFetching: state.isFetching
  }), shallowEqual);

  const dispatch = useDispatch();

  // const getPassage = () => {
  //   dispatch(
  //     fetchVerse()
  //   );
  // }

  const getVerse = (newTranslation, verseNumber) => {
    let passageToFetch = {
      translation: newTranslation,
      location: `${passage.book} ${passage.chapter}.${verseNumber}`
    }
    dispatch(
      fetchVerse(passageToFetch)
    );
  }

  console.log("Passage", passage);

  return (
    <div className="app">
      {!passage && !isFetching && (
        <h3>Uh oh...</h3>
      )}
      {isFetching && (
        <h3>Loading...</h3>
      )}
      {passage && (
        <>
          <h1>Bible Translation Medley</h1>
          <div className='locator'>
            <h3>{passage.book} {passage.chapter}</h3>

          </div>
          <div className="verses">
            {passage.content.map(verse => (
              <Verse
                key={verse.verseNumber}
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
