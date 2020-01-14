import axios from 'axios';

export const FETCH_VERSE_START = 'FETCH_VERSE_START';
export const FETCH_VERSE_SUCCESS = 'FETCH_VERSE_SUCCESS';
export const FETCH_VERSE_FAILURE = 'FETCH_VERSE_FAILURE';

export const fetchVerse = passage => dispatch => {
  dispatch({ type: FETCH_VERSE_START });
  axios
    .get(`https://api.biblia.com/v1/bible/content/${passage.translation}.json?passage=${passage.location}&style=oneVersePerLine&key=fd37d8f28e95d3be8cb4fbc37e15e18e`)
    .then(res => {
      console.log(res.data.text);
      dispatch({ type: FETCH_VERSE_SUCCESS, payload: res.data.text });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_VERSE_FAILURE, payload: err.response });
    });
};