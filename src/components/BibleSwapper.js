import React, { useState } from 'react';

import { shallowEqual, useSelector } from 'react-redux';

export default function(props) {
  const { bibles } = useSelector(
    state => ({
      bibles: state.bibles
    }),
    shallowEqual
  );

  const [bible, setBible] = useState(props.bible);

  const handleChange = e => {
    e.preventDefault();
    setBible(e.target.value);
  };

  const buttonOnClick = () => {
    props.buttonOnClick(bible);
  };

  return (
    <div className="swapper">
      <select onChange={handleChange} value={bible}>
        {bibles.map(bible => (
          <option
            key={bible.id}
            value={bible.id}
            defaultValue={bible.id === props.bible}
            disabled={bible.id === props.bible}
          >
            ({bible.id}) {bible.display}
          </option>
        ))}
      </select>

      <button
        onClick={buttonOnClick}
        disabled={props.bible ? bible === props.bible : props.isBadQuery}
      >
        {props.buttonText}
      </button>
    </div>
  );
}
