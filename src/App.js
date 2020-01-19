import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import Header from './components/Header'
import PassageHeading from './components/PassageHeading'
import Verse from './components/Verse'
import VerseSwapper from './components/VerseSwapper'

const App = () => {

  const { content, passage, swapped } =  useSelector(state => ({
    content: state.content,
    passage: state.passage,
    swapped: state.swapped
  }), shallowEqual)

  const [verseToSwap, setVerseToSwap] = useState('')

  const allVerses = bible => {
    return content
      [bible]
        [passage.book]
          [passage.chapter]
            .allVerses
  }

  const verses = bible => {
    return content
      [bible]
        [passage.book]
          [passage.chapter]
            .verses
  }

  console.log('Verse to Swap:', verseToSwap)
  return (
    <>
      <Header />
      <PassageHeading />
      <p className="verses">
        {allVerses(passage.bible).map(num => {

          const swap = swapped.find( ({ verse }) => verse === num)

          const isSwap = swap ? swap.bible : passage.bible
          
          return <Verse
              key={num}
              verseBible={isSwap}
              verseNum={num}
              text={verses(isSwap)[num]}
              verseToSwap={setVerseToSwap}
            />
        })}
      </p>
      <VerseSwapper
        verseNum={verseToSwap}
        verseToSwap={setVerseToSwap}
      />
    </>
  )
}

export default App
