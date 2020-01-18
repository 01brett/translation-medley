import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import BibleSwapper from './BibleSwapper'
import { swapVerse } from '../actions'

export default function(props){

  const { passage } =  useSelector(state => ({
    passage: state.passage
  }), shallowEqual)

  const dispatch = useDispatch()

  const swap = passage => {
    const newPassage = {
      ...passage,
      verse: props.verseNum
    }
    dispatch(
      swapVerse(newPassage)
    )
    props.verseToSwap('')
  }

  const cancel = () => {
   
  }

  return(
    <div className="verse-swapper">
      <div className='controls'>
        <button
          onClick={cancel}
        >
          Cancel
        </button>
        <BibleSwapper
          passage={passage}
          buttonText='Swap'
          buttonOnClick={swap}
        />
      </div>
    </div>
  );
}