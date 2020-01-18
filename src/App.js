import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import Header from './components/Header'
import PassageHeading from './components/PassageHeading'
import Verse from './components/Verse'

const App = () => {

  const { passage, content } =  useSelector(state => ({
    passage: state.passage,
    content: state.content
  }), shallowEqual)

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

  return (
    <div className="app">
      <Header />
      <PassageHeading />
      <div className="verses">
        {allVerses(passage.bible).map(num => {
          const swap = passage.swappedVerses.find( ({ verse }) => verse === num)
          if (swap) {
            return <Verse
              key={num}
              verseNum={num}
              text={verses(swap.bible)[num]}
              verseBible={swap.bible}
            />
          } else {
            return <Verse
              key={num}
              verseNum={num}
              text={verses(passage.bible)[num]}
              verseBible={passage.bible}
            />
          }
        })}
      </div>
    </div>
  )
}

export default App
