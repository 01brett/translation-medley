import React, { useState } from 'react';

import { shallowEqual, useSelector } from 'react-redux';

export default function (props) {
  // Pull in bibles array and current bible from state
  const { bibles, current } =  useSelector(state => ({
    current: state.passage.bible,
    bibles: state.bibles
  }), shallowEqual);

  // Localized state for holding the bible to switch to
  const [bible, setBible] = useState(current);

  const handleChange = e => {
    e.preventDefault();
    setBible(e.target.value);
  }

  return (
    <div className="controls">
      <select onChange={handleChange} value={bible}>
        {bibles.map(bible => ( 
          <option key={bible.id} value={bible.id}
            defaultValue={(
                props.verse
              ) ? (
                bible.id === props.verse.bible
              ) : (
                bible.id === current
            )}
            disabled={
              (
                props.verse
              ) ? (
                bible.id === props.verse.bible
              ) : (
                bible.id === current
            )}
          >
            {bible.id}: {bible.display}
          </option>
        ))}
      </select>
      <button
        disabled={
          (
            props.verse
          ) ? (
            !bible || bible === props.verse.bible
          ) : (
            bible.id === current
        )}
        onClick={() => (
          props.verse
        ) ? (
          props.onButton(bible, props.verse)
        ) : (
          props.onButton(bible)
        )}
      >{props.buttonText}</button>
    </div>
  );
}