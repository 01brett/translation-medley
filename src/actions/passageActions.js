import axios from 'axios';

export const FETCH_PASSAGE_START = 'FETCH_PASSAGE_START';
export const FETCH_PASSAGE_SUCCESS = 'FETCH_PASSAGE_SUCCESS';
export const FETCH_PASSAGE_FAILURE = 'FETCH_PASSAGE_FAILURE';

export const fetchPassage = passage => dispatch => {
  dispatch({ type: FETCH_PASSAGE_START });
  axios
    .get(`https://api.biblia.com/v1/bible/content/${passage.translation}.json?passage=${passage.location}&style=oneVersePerLine&key=fd37d8f28e95d3be8cb4fbc37e15e18e`)
    .then(res => {
      return res.data.text
      .split(/\r\n/)
      .splice(1, res.data.text.length - 1)
      .map(el => {
        const arr = el.split(/(?<=[0-9])(?=[\D])/);
        return {
          translation: passage.translation,
          verseNumber: arr[0],
          text: arr[1]
        }
      })
    })
    .then(formattedPassage => (
      dispatch(
        {
          type: FETCH_PASSAGE_SUCCESS,
          payload: formattedPassage
        }
      )
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    });
};