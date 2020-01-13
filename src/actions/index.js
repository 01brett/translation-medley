import axios from 'axios';

export const FETCH_VERSE_START = 'FETCH_VERSE_START';
export const FETCH_VERSE_SUCCESS = 'FETCH_VERSE_SUCCESS';
export const FETCH_VERSE_FAILURE = 'FETCH_VERSE_FAILURE';

const parseUrl = translation => {
  switch (translation) {
    case 'KJV':
      return null;
    default:
      return null;
  }
}

export const getVerse = translation => dispatch => {
  dispatch({ type: FETCH_VERSE_START });
  axios
    .get(parseUrl(translation))
    .then(res => {
      console.log(res.data.data);
      dispatch({ type: FETCH_VERSE_SUCCESS, payload: res.data.data});
    })
    .catch(err => {
      dispatch({ type: FETCH_VERSE_FAILURE, payload: err.response });
    });
};