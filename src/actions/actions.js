import axios from 'axios';

export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const ADD_CONTENT = 'ADD_CONTENT';

export const SET_PASSAGE = 'SET_PASSAGE';

export const ADD_VERSE_SWAP = 'ADD_VERSE_SWAP';
export const CLEAR_VERSE_SWAPS = 'CLEAR_VERSE_SWAPS';
export const SHOW_VERSE_CONTROLS = 'SHOW_VERSE_CONTROLS';
export const HIDE_VERSE_CONTROLS = 'HIDE_VERSE_CONTROLS';

/////////////
// PASSAGE //
/////////////
export function addContent(content) {
  return {
    type: ADD_CONTENT,
    payload: content
  };
}
export function setPassage(passage) {
  return {
    type: SET_PASSAGE,
    payload: passage
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
export function fetchText(passage) {
  return async dispatch => {
    let queryParams;
    if (passage.verseRange) {
      queryParams = `?bible=${passage.bible}&book=${passage.book}&chapter=${passage.chapter}&verseRange=${passage.verseRange}`;
    } else {
      queryParams = `?bible=${passage.bible}&book=${passage.book}&chapter=${passage.chapter}`;
    }
    try {
      dispatch(fetchStart());
      const res = await axios.get(`/api/passage/${queryParams}`);
      return res.data;
    } catch (error) {
      dispatch(fetchFailure(error));
    }
  };
}

export function getDiffBible(bible) {
  return async (dispatch, getState) => {
    const { content, passage } = getState();
    try {
      if (
        content.hasOwnProperty(bible) &&
        content[bible].hasOwnProperty(passage.book)
      ) {
        dispatch(setPassage({ ...passage, bible: bible }));
      } else {
        const res = await dispatch(fetchText({ ...passage, bible: bible }));
        dispatch(addContent(res));
        dispatch(setPassage(res.passage));
        dispatch(fetchSuccess());
      }
    } catch (err) {
      console.log('\nswapBible •••', err, '\n\n');
    }
  };
}

export function getDiffVerse(verse) {
  return async (dispatch, getState) => {
    const { content, passage } = getState();
    try {
      if (!content.hasOwnProperty(verse.bible)) {
        const res = await dispatch(
          fetchText({ ...passage, bible: verse.bible })
        );
        dispatch(addContent(res));
        dispatch(fetchSuccess());
      }
      dispatch(addVerseSwap(verse));
    } catch (err) {
      console.log('\nswapVerse •••', err, '\n\n');
    }
  };
}

export function getDiffPassage(passageQuery) {
  return async (dispatch, getState) => {
    const { content } = getState();
    try {
      if (
        content.hasOwnProperty(passageQuery.bible) &&
        content[passageQuery.bible].hasOwnProperty(passageQuery.book)
      ) {
        dispatch(setPassage({ ...passageQuery, bible: passageQuery.bible }));
      } else {
        const res = await dispatch(fetchText(passageQuery));
        dispatch(clearVerseSwaps());
        dispatch(addContent(res));
        dispatch(setPassage(res.passage));
        dispatch(fetchSuccess());
      }
    } catch (err) {
      console.log('\nswapPassage •••', err, '\n\n');
    }
  };
}
