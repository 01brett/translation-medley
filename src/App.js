import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { fetchVerse, fetchNETVerse } from './actions/verseActions';
import { fetchPassage, fetchNETPassage } from './actions/passageActions';

import PassageControls from './components/PassageControls'
import Verse from './components/Verse';

const App = () => {
  const { passage, isFetching } =  useSelector(state => ({
    passage: state.passage,
    isFetching: state.isFetching
  }), shallowEqual);

  const dispatch = useDispatch();

  const [passageTranslation, setPassageTranslation] = useState(passage.translation);

  const getPassage = () => {
    switch (passageTranslation) {
      case 'NET':
        dispatch(
          fetchNETPassage(`${passage.book} ${passage.chapter}`)
        );
        break;
      default:
        let passageToFetch = {
          translation: passageTranslation,
          location: `${passage.book} ${passage.chapter}`
        }
        dispatch(
          fetchPassage(passageToFetch)
        );
        break;
    }
  }

  const handleChange = e => {
    e.preventDefault();
    setPassageTranslation(e.target.value);
  }

  const getVerse = (newTrans, verseNumber) => {
    switch (newTrans) {
      case 'NET':
        dispatch(
          fetchNETVerse(`${passage.book} ${passage.chapter}.${verseNumber}`)
        );
        break;
      default:
        let verseToFetch = {
          translation: newTrans,
          location: `${passage.book} ${passage.chapter}.${verseNumber}`
        }
        dispatch(
          fetchVerse(verseToFetch)
        );
        break;
    }
    
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
            <PassageControls
              getPassage={getPassage}
              passageTranslation={passageTranslation}
              translation={passage.translation}
              handleChange={handleChange}
            />
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
