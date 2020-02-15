import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export default function Swapper({ query, bible, setBible, handleSubmit }) {
  const { bibles } = useSelector(
    state => ({
      bibles: state.bibles
    }),
    shallowEqual
  );

  const handleSwapper = e => {
    setBible(e.target.value);
  };

  const handleClick = () => {
    handleSubmit({
      ...query,
      bible: bible
    });
  };

  return (
    <div className="swapper">
      <select onChange={handleSwapper} value={bible}>
        {bibles.map(bible => (
          <option key={bible.id} value={bible.id}>
            ({bible.id}) {bible.display}
          </option>
        ))}
      </select>

      <button onClick={handleClick} disabled={!query}>
        FIND
      </button>
    </div>
  );
}
