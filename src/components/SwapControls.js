import React, { useState } from 'react';
import translations from '../helpers/translations';

export default function(props){
  const [translation, setTranslation] = useState('');

  const handleChange = e => {
    e.preventDefault();
    setTranslation(e.target.value);
  }

  const getVerse = () => {
    props.getVerse(translation, props.verseNumber);
    props.cancel();
  }
  return(
    <div className="swap-controls">
      <button onClick={props.cancel}>Cancel</button>
      <select
        onChange={handleChange}
        value={translation}
      >
        <option>— Select a Translation —</option>
        {translations.map(el => (
          <option
            key={el.id}
            value={el.id}
          >
            {el.display} ({el.id})
          </option>
        ))}
      </select>
      <button
        disabled={!translation}
        onClick={getVerse}
      >
        Swap
      </button>
    </div>
  );
}