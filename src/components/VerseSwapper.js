import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import BibleSwapper from './BibleSwapper'
import { addSwap, hideControls } from '../actions'

export default function(props){

  const { passage, swapped } =  useSelector(state => ({
    passage: state.passage,
    swapped: state.swapped
  }), shallowEqual)

  const dispatch = useDispatch()

  const swap = bible => {
    dispatch(addSwap({ verse: props.verseNum, bible: bible }))
    dispatch(hideControls())
    props.verseToSwap('')
  }

  const cancel = () => {
    dispatch(hideControls())
    props.verseToSwap('')
  }

  const swappedVerse = swapped.find( ({ verse }) => verse === props.verseNum)

  const isSwap = swappedVerse ? swappedVerse.bible : passage.bible

  return(
    <div className="verse-swapper">
      <div className='controls'>
        <button onClick={cancel}>
          Cancel
        </button>
        <BibleSwapper
          bible={isSwap}
          buttonText='Swap'
          buttonOnClick={swap}
        />
      </div>
    </div>
  );
}