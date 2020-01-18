import React, { useState } from 'react';

import { shallowEqual, useSelector } from 'react-redux';

export default function (props) {
  // Pull in bibles array and current bible from state
  const { bibles, current } =  useSelector(state => ({
    passageBible: state.passage.bible,
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
        {bibles.map(el => ( 
          <option key={el.id} value={el.id}
            defaultValue={(
                props.verse
              ) ? (
                el.id === props.verse.bible
              ) : (
                el.id === current
            )}
            disabled={(
                props.verse
              ) ? (
                el.id === props.verse.bible
              ) : (
                el.id === current
            )}
          >
            ({el.id}) {el.display}
          </option>
        ))}
      </select>
      <button
        disabled={(
            props.verse
          ) ? (
            !bible || bible === props.verse.bible
          ) : (
            bible.id === current
        )}
        onClick={() => props.onButton(bible)}
      >{props.buttonText}</button>
    </div>
  );
}