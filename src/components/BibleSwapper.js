import React, { useState } from 'react'

import { shallowEqual, useSelector } from 'react-redux'

export default function (props) {

  const { bibles } =  useSelector(state => ({
    bibles: state.bibles
  }), shallowEqual)

  const [newPassage, setNewPassage] = useState({ ...props.passage })

  const handleChange = e => {
    e.preventDefault()
    setNewPassage({
      ...newPassage,
      bible: e.target.value
    })
  }

  const primaryOnClick = () => {
    props.primaryOnClick(newPassage)
  }

  const secondaryOnClick = () => {
    props.secondaryOnClick()
  }

  return (
    <div className='swapper'>
      <button onClick={secondaryOnClick}>{props.secondaryText}</button>
      <div className='controls'>
        <select onChange={handleChange} value={newPassage.bible}>
          {bibles.map(bible => ( 
            <option
              key={bible.id}
              value={bible.id}
              defaultValue={bible.id === props.passage.bible}
              disabled={bible.id === props.passage.bible}
            >
              ({bible.id}) {bible.display}
            </option>
          ))}
        </select>
        <button
          onClick={primaryOnClick}
        >
          {props.primaryText}
        </button>
      </div>
    </div>
  )
}