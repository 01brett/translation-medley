import React, { useState } from 'react';
import translations from '../helpers/translations';

export default function(props){
  const [swapInfo, setSwapInfo] = useState({

  });
  return(
    <div className="swap-controls">
      <button onClick={props.cancel}>Cancel</button>
      <select>
        {translations.map(el => (
          <option key={el.id} value={el.id}>{el.display} ({el.id})</option>
        ))}
      </select>
      <button onClick={() => props.getVerse()}>Swap</button>
    </div>
  );
}