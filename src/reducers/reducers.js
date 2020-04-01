import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  ADD_VERSE_SWAP,
  CLEAR_VERSE_SWAPS,
  SHOW_VERSE_CONTROLS,
  HIDE_VERSE_CONTROLS,
  SET_PASSAGE,
  ADD_CONTENT
} from '../actions/actions';

const initState = {
  isToggled: false,
  isFetching: false,
  error: '',
  content: {},
  passage: {
    bible: '',
    book: '',
    chapter: '',
    verseRange: ''
  },
  swapped: [],
  bibles: [
    {
      id: 'ESV',
      display: 'English Standard'
    },
    {
      id: 'NET',
      display: 'New English'
    },
    {
      id: 'KJV',
      display: 'King James'
    }
  ]
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: ''
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case CLEAR_VERSE_SWAPS:
      return {
        ...state,
        swapped: []
      };
    case ADD_VERSE_SWAP:
      const data = action.payload;
      if (state.swapped.find(({ verse }) => verse === data.verse)) {
        return {
          ...state,
          swapped: [
            ...state.swapped.map(swap =>
              swap.verse === data.verse ? data : swap
            )
          ]
        };
      } else {
        return {
          ...state,
          swapped: [...state.swapped, data]
        };
      }
    case SHOW_VERSE_CONTROLS:
      return {
        ...state,
        isToggled: true
      };
    case HIDE_VERSE_CONTROLS:
      return {
        ...state,
        isToggled: false
      };
    case ADD_CONTENT:
      const psg = action.payload.passage;
      const cnt = action.payload.content;
      return {
        ...state,
        content: {
          ...state.content,
          [psg.bible]: {
            ...state.content[psg.bible],
            ...cnt[psg.bible]
          }
        }
      };
    case SET_PASSAGE:
      return {
        ...state,
        passage: action.payload
      };
    default:
      return state;
  }
};

// Extra Translations
// {
//   id: 'ASV',
//   display: 'American Standard'
// },
// {
//   id: 'DARBY',
//   display: '1890 Darby'
// },
// {
//   id: 'LEB',
//   display: 'Lexham English'
// },
// {
//   id: 'YLT',
//   display: `Young's Literal`
// }
