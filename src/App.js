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

  console.log('App Passage', passage)
  console.log('App Content', content)
  return (
    <>
      <Header />
      <PassageHeading />
      <p className="verses">
        {allVerses(passage.bible).map(num => {

          const swap = passage.swappedVerses
            .find( ({ verse }) => verse === num)
          
          return <Verse
              key={num}
              verseBible={swap ? swap.bible : passage.bible}
              verseNum={num}
              text={verses(swap ? swap.bible : passage.bible)[num]}
            />
        })}
      </p>
    </>
  )
}

export default App
