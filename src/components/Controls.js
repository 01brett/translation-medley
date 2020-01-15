import React, { useState } from 'react';

import transArr from '../helpers/translations';

export default function(props){
  const [newTrans, setNewTrans] = useState('');

  const handleChange = e => {
    e.preventDefault();
    setNewTrans(e.target.value);
  }

  const getVerse = () => {
    props.getVerse(newTrans, props.verse.verseNumber);
    props.cancel();
  }
  return(
    <div className="swap controls">
      {props.cancel && <button onClick={props.cancel}>Cancel</button>}
      <select
        onChange={handleChange}
        value={newTrans}
      >
        <option>— Select a Translation —</option>
        {transArr.map(translation => ( 
          <option
            disabled={translation.id === props.verse.translation}
            key={translation.id}
            value={translation.id}
          >
            {translation.id} : {translation.display}
          </option>
        ))}
      </select>
      <button
        disabled={!newTrans}
        onClick={getVerse}
      >
        Swap
      </button>
    </div>
  );
}