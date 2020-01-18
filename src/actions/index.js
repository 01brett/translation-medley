import axios from 'axios'

export const FETCH_PASSAGE_START = 'FETCH_PASSAGE_START'
export const FETCH_PASSAGE_SUCCESS = 'FETCH_PASSAGE_SUCCESS'
export const FETCH_PASSAGE_FAILURE = 'FETCH_PASSAGE_FAILURE'

export const CLEAR_SWAPS = 'CLEAR_SWAPS'

export const clearSwaps = () => dispatch =>{
  dispatch({ type: CLEAR_SWAPS })
}

export const getPassage = passage => dispatch => {
  dispatch({ type: FETCH_PASSAGE_START })
  switch (passage.bible) {
    case 'NET':
      fetchNET(passage)
      break
    case 'ESV':
      fetchESV(passage)
      break
    default:
      fetchDefault(passage)
      break
  }
}

const fetchDefault = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`

  axios
    .get(`https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${location}&type=json`)
    .then(res => {
      const rawText = res.data.text
      return Object.fromEntries(
        rawText
          .split(/\r\n/)
          .splice(1, rawText.length - 1)
          .map(el => el.split(/(?<=[0-9])(?=[\D])/))
      )
    })
    .then(cleanText => (
      dispatch({
        type: FETCH_PASSAGE_SUCCESS,
        payload: {
          content: {
            [passage.bible]: {
              [passage.book]: {
                [passage.chapter]: {
                  allVerses: Object.keys(cleanText),
                  verses: cleanText
                }
              }
            }
          },
          passage: {
            bible: passage.bible,
            book: passage.book,
            chapter: passage.chapter
          }
        }
      })
    ))
    .catch(err => {
      console.log(err)
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response })
    })
}

const fetchNET = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`

  axios
    .get(`https://cors-anywhere.herokuapp.com/https://api.biblia.com/v1/bible/content/${passage.bible}.json?passage=${location}&style=oneVersePerLine&key=fd37d8f28e95d3be8cb4fbc37e15e18e`)
    .then(res => {
      const rawText = res.data;
      return Object.fromEntries(rawText.map(el => ([ [el.verse], el.text ])))
    })
    .then(cleanText => (
      dispatch({
        type: FETCH_PASSAGE_SUCCESS,
        payload: {
          content: {
            [passage.bible]: {
              [passage.book]: {
                [passage.chapter]: {
                  allVerses: Object.keys(cleanText),
                  verses: cleanText
                }
              }
            }
          },
          passage: {
            bible: passage.bible,
            book: passage.book,
            chapter: passage.chapter
          }
        }
      })
    ))
    .catch(err => {
      console.log(err);
      dispatch({
        type: FETCH_PASSAGE_FAILURE,
        payload: err.response
      })
    })
}

const fetchESV = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`

  axios
    .get(`https://api.esv.org/v3/passage/text/?q=${location}&include-passage-references=false&include-footnotes=false&include-headings=false&include-copyright=false&include-short-copyright=false`, { headers: { 'Authorization': 'Token 1410f911e8d537a0c57c1219c101ecf84540d6c4' } })
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
    .then(cleanText => (
      dispatch({
        type: FETCH_PASSAGE_SUCCESS,
        payload: {
          content: {
            [passage.bible]: {
              [passage.book]: {
                [passage.chapter]: {
                  allVerses: Object.keys(cleanText),
                  verses: cleanText
                }
              }
            }
          },
          passage: {
            bible: passage.bible,
            book: passage.book,
            chapter: passage.chapter
          }
        }
      })
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    })
}