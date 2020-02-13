import fetch from 'unfetch';

////////////
// Passage updating
////////////
export const SET_PASSAGE_BIBLE = 'SET_PASSAGE_BIBLE';
export const ADD_PASSAGE = 'ADD_PASSAGE';

export const setPassageBible = bible => ({
  type: SET_PASSAGE_BIBLE,
  payload: bible
});

export const addPassage = passage => ({
  type: ADD_PASSAGE,
  payload: passage
});

////////////
// Swapped Verses updating
////////////
export const ADD_SWAP = 'ADD_SWAP';
export const CLEAR_SWAPS = 'CLEAR_SWAPS';
export const SHOW_CONTROLS = 'SHOW_CONTROLS';
export const HIDE_CONTROLS = 'HIDE_CONTROLS';

export const addSwap = verse => ({
  type: ADD_SWAP,
  payload: verse
});

export const clearSwaps = () => ({
  type: CLEAR_SWAPS
});

export const showControls = () => ({
  type: SHOW_CONTROLS
});

export const hideControls = () => ({
  type: HIDE_CONTROLS
});

export const swapPassageBible = passage => (dispatch, getState) => {
  const { content } = getState();

  if (content.hasOwnProperty(passage.bible)) {
    dispatch(setPassageBible(passage.bible));
  } else {
    dispatch(fetch(passage));
  }
};

////////////
// Fetch the passage
////////////
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchStart = () => ({
  type: FETCH_START
});

export const fetchSuccess = () => ({
  type: FETCH_SUCCESS
});

export const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: error
});

export const fetchText = passage => async dispatch => {
  dispatch(fetchStart());
  try {
    const res = await fetch.get('/api/passage', passage);
    const data = await res.json();

    dispatch(fetchSuccess());
    dispatch(addPassage(data));
  } catch (error) {
    console.log('Fetch Error', error);
    dispatch(fetchFailure(error));
  }
};
