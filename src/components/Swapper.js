import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export default function Swapper({ bible, setBible }) {
  const { bibles } = useSelector(
    state => ({
      bibles: state.bibles
    }),
    shallowEqual
  );

  const handleSwapper = e => {
    setBible(e.target.value);
  };

  return (
    <select onChange={handleSwapper} value={bible}>
      {bibles.map(bible => (
        <option key={bible.id} value={bible.id}>
          ({bible.id}) {bible.display}
        </option>
      ))}
    </select>
  );
}
