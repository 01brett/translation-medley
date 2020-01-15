import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { fetchVerse } from './actions/verseActions';
import { fetchPassage } from './actions/passageActions';

import translations from './helpers/translations';
import Verse from './components/Verse';

const App = () => {
  const { passage, isFetching } =  useSelector(state => ({
    passage: state.passage,
    isFetching: state.isFetching
  }), shallowEqual);

  const dispatch = useDispatch();

  const [passageTranslation, setPassageTranslation] = useState(passage.translation);

  const getPassage = () => {
    let passageToFetch = {
      translation: passageTranslation,
      location: `${passage.book} ${passage.chapter}`
    }
    dispatch(
      fetchPassage(passageToFetch)
    );
  }

  const handleChange = e => {
    e.preventDefault();
    setPassageTranslation(e.target.value);
  }

  const getVerse = (newTranslation, verseNumber) => {
    let verseToFetch = {
      translation: newTranslation,
      location: `${passage.book} ${passage.chapter}.${verseNumber}`
    }
    dispatch(
      fetchVerse(verseToFetch)
    );
  }

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
            <h3>{passage.book} {passage.chapter} ({passage.translation})</h3>
            <div className="passage controls">
              <select
                onChange={handleChange}
                value={passageTranslation}
              >
                <option>— Select a Translation —</option>
                {translations.map(el => ( 
                  <option
                    defaultValue={el.id === passage.translation}
                    disabled={el.id === passage.translation}
                    key={el.id}
                    value={el.id}
                  >
                    {el.id} : {el.display}
                  </option>
                ))}
              </select>
              <button
                onClick={getPassage}
              >
                Swap
              </button>
            </div>
          </div>
          <div className="verses">
            {passage.content.map(verse => (
              <Verse
                key={verse.verseNumber}
                verse={verse}
                getVerse={getVerse}
                currentTranslation={passage.translation}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
