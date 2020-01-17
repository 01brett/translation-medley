import axios from 'axios';

export const FETCH_PASSAGE_START = 'FETCH_PASSAGE_START';
export const FETCH_PASSAGE_SUCCESS = 'FETCH_PASSAGE_SUCCESS';
export const FETCH_PASSAGE_FAILURE = 'FETCH_PASSAGE_FAILURE';

export const fetchPassage = (bible, location) => dispatch => {
  dispatch({ type: FETCH_PASSAGE_START });
  axios
    .get(`https://cors-anywhere.herokuapp.com/https://api.biblia.com/v1/bible/content/${bible}.json?passage=${location}&style=oneVersePerLine&key=fd37d8f28e95d3be8cb4fbc37e15e18e`)
    .then(res => {
      return res.data.text
        .split(/\r\n/)
        .splice(1, res.data.text.length - 1)
        .map(el => {
          const arr = el.split(/(?<=[0-9])(?=[\D])/);
          return {
            bible: bible,
            verse: arr[0],
            text: arr[1]
          }
        })
    })
    .then(formattedPassage => (
      dispatch(
        {
          type: FETCH_PASSAGE_SUCCESS,
          payload: {
            bible: bible,
            content: formattedPassage
          }
        }
      )
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    });
};

export const fetchNETPassage = location => dispatch => {
  dispatch({ type: FETCH_PASSAGE_START });
  axios
    .get(`https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${location}&type=json`)
    .then(res => {
      const formatted = res.data.map(el => {
        return {
          bible: 'NET',
          verse: el.verse,
          text: el.text
        }
      });
      dispatch({
        type: FETCH_PASSAGE_SUCCESS,
        payload: {
          bible: 'NET',
          content: formatted
        }
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    });
};

export const fetchESVPassage = location => dispatch => {
  dispatch({ type: FETCH_PASSAGE_START });
  axios
    .get(`https://api.esv.org/v3/passage/text/?q=${location}&include-passage-references=false&include-footnotes=false&include-headings=false&include-copyright=false&include-short-copyright=false`, {
      headers: {
        'Authorization': 'Token 1410f911e8d537a0c57c1219c101ecf84540d6c4'
      }
    })
    .then(res => {
      return res.data.passages[0]
        .replace(/([[\]])/g, '')
        .replace(/\n\n/g, '')
        .replace(/\s{2}/g, ' ')
        .split(/[ ]+(?=\d)/g)
        .splice(1, res.data.passages[0].length - 1)
        .map(el => {
          const arr = el.split(/(?<=[0-9])(?=[\D])/);
          return {
            bible: 'ESV',
            verse: arr[0],
            text: arr[1]
          }
        })
    })
    .then(formattedPassage => (
      dispatch(
        {
          type: FETCH_PASSAGE_SUCCESS,
          payload: {
            bible: 'ESV',
            content: formattedPassage
          }
        }
      )
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    });
};