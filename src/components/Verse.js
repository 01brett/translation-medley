import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { showVerseControls } from '../actions/actions';

export default function({ verseNum, verseBible, text, verseToSwap, active }) {
  const { isToggled, passageBible } = useSelector(
    state => ({
      isToggled: state.isToggled,
      passageBible: state.passage.bible
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    verseToSwap(verseNum);
    !isToggled && dispatch(showVerseControls());
  };

  return (
    <span id={`verse-${verseNum}`}>
      <span className="verse-number">
        {' '}
        {verseNum}{' '}
        {verseBible !== passageBible && (
          <span className="ref">{verseBible} </span>
        )}
      </span>

      <span
        className={
          verseBible !== passageBible ? 'swapped verse-text' : 'verse-text'
        }
        onClick={handleClick}
      >
        <span className={active ? 'active' : null}>{text}</span>
      </span>
    </span>
  );
}
