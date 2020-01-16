import axios from 'axios';

export const FETCH_VERSE_START = 'FETCH_VERSE_START';
export const FETCH_VERSE_SUCCESS = 'FETCH_VERSE_SUCCESS';
export const FETCH_VERSE_FAILURE = 'FETCH_VERSE_FAILURE';

export const fetchVerse = passage => dispatch => {
  dispatch({ type: FETCH_VERSE_START });
  axios
    .get(`https://api.biblia.com/v1/bible/content/${passage.translation}.json?passage=${passage.location}&style=oneVersePerLine&key=fd37d8f28e95d3be8cb4fbc37e15e18e`)
    .then(res => {
      const data = res.data.text
        .split(/\n/)
        .splice(1,1)[0]
        .split(/(?<=[0-9])(?=[\D])/);
      return {
        translation: passage.translation,
        verseNumber: data[0],
        text: data[1]
      }
    })
    .then(formattedVerse => (
      dispatch(
        {
          type: FETCH_VERSE_SUCCESS,
          payload: formattedVerse
        }
      )
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_VERSE_FAILURE, payload: err.response });
    });
};

export const fetchNETVerse = location => dispatch => {
  dispatch({ type: FETCH_VERSE_START });
  axios
    .get(`https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${location}&type=json`)
    .then(res => {
      const formattedVerse = {
        translation: 'NET',
        verseNumber: res.data[0].verse,
        text: res.data[0].text
      };
      dispatch({
        type: FETCH_VERSE_SUCCESS,
        payload: formattedVerse
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_VERSE_FAILURE, payload: err.response });
    });
};

export const fetchESVVerse = location => dispatch => {
  dispatch({ type: FETCH_VERSE_START });
  axios
    .get(`https://api.esv.org/v3/passage/text/?q=${location}&include-passage-references=false&include-footnotes=false&include-headings=false&include-copyright=false&include-short-copyright=false`, {
      headers: {
        'Authorization': 'Token 1410f911e8d537a0c57c1219c101ecf84540d6c4'
      }
    })
    .then(res => {
      const data = res.data.passages[0]
        .replace(/([\[\]])/g, '')
        .replace(/\n\n/g, '')
        .replace(/\s{2}/g, ' ')
        .split(/[ ]+(?=\d)/g)
        .splice(1, res.data.passages[0].length - 1)
        .map(el => {
          const arr = el.split(/(?<=[0-9])(?=[\D])/);
          return {
            translation: 'ESV',
            verseNumber: arr[0],
            text: arr[1]
          }
        })
      return data[0];
    })
    .then(formattedVerse => (
      dispatch({
        type: FETCH_VERSE_SUCCESS,
        payload: formattedVerse
      })
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_VERSE_FAILURE, payload: err.response });
    });
};