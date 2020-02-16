import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { clearVerseSwaps, hideVerseControls } from '../actions/actions';

export default function() {
  const { isToggled, passage, swapped } = useSelector(
    state => ({
      isToggled: state.isToggled,
      passage: state.passage,
      swapped: state.swapped
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const clear = () => {
    isToggled && dispatch(hideVerseControls());
    dispatch(clearVerseSwaps());
  };

  return (
    <div className="heading">
      <h2 className="title">
        {passage.book} {passage.chapter}
        {passage.verseRange && `:${passage.verseRange}`} ({passage.bible})
      </h2>
      <button onClick={clear} disabled={swapped.length < 1}>
        Clear Swaps
      </button>
    </div>
  );
}
