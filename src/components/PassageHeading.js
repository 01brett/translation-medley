import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import {
  changeBible,
  clearVerseSwaps,
  hideVerseControls
} from '../actions/actions';
import BibleSwapper from './BibleSwapper';

export default function() {
  const { passage, swapped } = useSelector(
    state => ({
      passage: state.passage,
      swapped: state.swapped
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const swap = bible => {
    dispatch(changeBible(bible));
    dispatch(hideVerseControls());
  };

  const clear = () => {
    dispatch(clearVerseSwaps());
    dispatch(hideVerseControls());
  };

  return (
    <div className="heading">
      <h2 className="title">
        {passage.book} {passage.chapter}:{passage.verseRange} ({passage.bible})
      </h2>
      <div className="controls">
        <button onClick={clear} disabled={swapped.length < 1}>
          Clear
        </button>
        <BibleSwapper
          bible={passage.bible}
          buttonText="Swap"
          buttonOnClick={swap}
        />
      </div>
    </div>
  );
}
