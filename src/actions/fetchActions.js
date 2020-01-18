import axios from 'axios'

import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE
} from '../types'

export const fetchDefault = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`

  dispatch(
    fetchStart()
  )

  axios
    .get(`https://cors-anywhere.herokuapp.com/https://api.biblia.com/v1/bible/content/${passage.bible}.json?passage=${location}&style=oneVersePerLine&key=fd37d8f28e95d3be8cb4fbc37e15e18e`)
    .then(res => {
      const rawText = res.data.text
      return Object.fromEntries(
        rawText
          .split(/\r\n/)
          .splice(1, rawText.length - 1)
          .map(el => el.split(/(?<=[0-9])(?=[\D])/))
      )
    })
    .then(cleanText => {
      console.log(`${passage.bible}:`, cleanText, passage)
      dispatch(
        fetchSuccess(passage, cleanText)
      )
    })
    .catch(err => {
      console.log(err)
      dispatch(
        fetchFailure(err.response)
      )
    })
}

export const fetchNET = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`
  
  dispatch(
    fetchStart()
  )

  axios
    .get(`https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${location}&type=json`)
    .then(res => {
      const rawText = res.data;
      return Object.fromEntries(rawText.map(el => ([ [el.verse], el.text ])))
    })
    .then(cleanText => {
      console.log(`${passage.bible}:`, cleanText, passage)
      dispatch(
        fetchSuccess(passage, cleanText)
      )
    })
    .catch(err => {
      console.log(err)
      dispatch(
        fetchFailure(err.response)
      )
    })
}

export const fetchESV = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`
  
  dispatch(
    fetchStart()
  )

  axios
    .get(`https://api.esv.org/v3/passage/text/?q=${location}&include-passage-references=false&include-footnotes=false&include-headings=false&include-copyright=false&include-short-copyright=false`, {
      headers: { 'Authorization': 'Token 1410f911e8d537a0c57c1219c101ecf84540d6c4' }
    })
    .then(res => {
      const rawText = res.data.passages[0];
      return Object.fromEntries(
        rawText
        .replace(/([[\]])/g, '')
        .replace(/\n\n/g, '')
        .replace(/\s{2}/g, ' ')
        .split(/[ ]+(?=\d)/g)
        .splice(1, rawText.length - 1)
        .map(el => el.split(/(?<=[0-9])(?=[\D])/))
      )
    })
    .then(cleanText => {
      console.log(`${passage.bible}:`, cleanText, passage)
      dispatch(
        fetchSuccess(passage, cleanText)
      )
    })
    .catch(err => {
      console.log(err)
      dispatch(
        fetchFailure(err.response)
      )
    })
}

const fetchStart = () => ({
  type: FETCH_START
})

const fetchSuccess = ({ passage, content }) => ({
  type: FETCH_SUCCESS,
  payload: { ...passage, ...content }
})

const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: error
})