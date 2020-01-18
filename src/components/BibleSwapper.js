import React, { useState } from 'react'

import { shallowEqual, useSelector } from 'react-redux'

export default function (props) {

  const { bibles } =  useSelector(state => ({
    bibles: state.bibles
  }), shallowEqual)

  const [passage, setPassage] = useState({ ...props.passage })

  const handleChange = e => {
    e.preventDefault()
    setPassage({
      ...passage,
      bible: e.target.value
    })
  }

  const buttonOnClick = () => {
    props.buttonOnClick(passage)
  }

  return (
    <div className='swapper'>

      <select onChange={handleChange} value={passage.bible}>

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
        onClick={buttonOnClick}
        disabled={passage.bible === props.passage.bible}
      >
        {props.buttonText}
      </button>

    </div>
  )
}