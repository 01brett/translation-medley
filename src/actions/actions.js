import axios from 'axios';

export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const SET_PASSAGE_BIBLE = 'SET_PASSAGE_BIBLE';
export const ADD_PASSAGE_CONTENT = 'ADD_PASSAGE_CONTENT';

export const ADD_VERSE_SWAP = 'ADD_VERSE_SWAP';
export const CLEAR_VERSE_SWAPS = 'CLEAR_VERSE_SWAPS';
export const SHOW_VERSE_CONTROLS = 'SHOW_VERSE_CONTROLS';
export const HIDE_VERSE_CONTROLS = 'HIDE_VERSE_CONTROLS';

/////////////
// PASSAGE //
/////////////
export function setPassageBible(bible) {
  return {
    type: SET_PASSAGE_BIBLE,
    payload: bible
  };
}
export function addPassageContent(content) {
  return {
    type: ADD_PASSAGE_CONTENT,
    payload: content
  };
}
////////////
// VERSES //
////////////
export function addVerseSwap(verse) {
  return {
    type: ADD_VERSE_SWAP,
    payload: verse
  };
}
export function clearVerseSwaps() {
  return { type: CLEAR_VERSE_SWAPS };
}
export function showVerseControls() {
  return { type: SHOW_VERSE_CONTROLS };
}
export function hideVerseControls() {
  return { type: HIDE_VERSE_CONTROLS };
}
///////////
// FETCH //
///////////
export function fetchStart() {
  return { type: FETCH_START };
}
export function fetchSuccess() {
  return { type: FETCH_SUCCESS };
}
export function fetchFailure(error) {
  return {
    type: FETCH_FAILURE,
    payload: error
  };
}

/////////////////////
// COMBO FUNCTIONS //
/////////////////////
export function changeBible(bible) {
  return async (dispatch, getState) => {
    const { content, passage } = getState();

    if (content.hasOwnProperty(bible)) {
      dispatch(setPassageBible(bible));
    } else {
      const res = await dispatch(
        fetchText({
          ...passage,
          bible: bible
        })
      );
      dispatch(setPassageBible(res.passage.bible));
    }
  };
}

export function handleVerseSwap(verse) {
  return async (dispatch, getState) => {
    const { content, passage } = getState();

    if (!content.hasOwnProperty(verse.bible)) {
      await dispatch(
        fetchText({
          ...passage,
          bible: verse.bible
        })
      );
    }
    dispatch(addVerseSwap(verse));
  };
}

export function fetchText(passage) {
  return async dispatch => {
    dispatch(fetchStart());
    const queryParams = `?bible=${passage.bible}&book=${passage.book}&chapter=${
      passage.chapter
    }${passage.verseRange && `&verseRange=${passage.verseRange}`}`;
    try {
      const res = await axios.get(`/api/passage/${queryParams}`);
      dispatch(fetchSuccess());
      dispatch(addPassageContent(res.data.content));
      return res.data;
    } catch (error) {
      console.log('Fetch', error);
      dispatch(fetchFailure(error));
    }
  };
}
