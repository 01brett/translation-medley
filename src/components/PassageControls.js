import React from 'react';

import translations from '../helpers/translations';

export default function(props){
  return(
    <div className="passage controls">
      <select
        onChange={props.handleChange}
        value={props.passageTranslation}
      >
        <option>— Select a Translation —</option>
        {translations.map(el => ( 
          <option
            defaultValue={el.id === props.translation}
            disabled={el.id === props.translation}
            key={el.id}
            value={el.id}
          >
            {el.id} : {el.display}
          </option>
        ))}
      </select>
      <button
        disabled={props.passageTranslation === props.translation}
        onClick={props.getPassage}
      >
        Swap
      </button>
    </div>
  );
}
