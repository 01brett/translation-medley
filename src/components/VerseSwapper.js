import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import BibleSwapper from './BibleSwapper';
import { handleVerseSwap, hideVerseControls } from '../actions/actions';

export default function(props) {
  const { isToggled, passage, swapped } = useSelector(
    state => ({
      isToggled: state.isToggled,
      passage: state.passage,
      swapped: state.swapped
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const swap = bible => {
    dispatch(
      handleVerseSwap({
        verse: props.verseNum,
        bible: bible
      })
    );
    isToggled && dispatch(hideVerseControls());
    props.verseToSwap('');
  };

  const cancel = () => {
    isToggled && dispatch(hideVerseControls());
    props.verseToSwap('');
  };

  const swappedVerse = swapped.find(({ verse }) => verse === props.verseNum);

  const isSwap = swappedVerse ? swappedVerse.bible : passage.bible;

  return (
    <div className="verse-swapper" style={props.position}>
      <div className="controls">
        <button onClick={cancel}>Cancel</button>
        <BibleSwapper bible={isSwap} buttonText="Swap" buttonOnClick={swap} />
      </div>
    </div>
  );
}
