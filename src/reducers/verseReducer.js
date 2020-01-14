import {
  FETCH_VERSE_START,
  FETCH_VERSE_SUCCESS,
  FETCH_VERSE_FAILURE
} from '../actions/verseActions';

const initState = {
  isFetching: false,
  error: '',
  passage: {
    translation: 'KJV',
    book: '1 John',
    chapter: '1',
    verses: '1-5',
    content: [
      {
        verseNumber: '1',
        text: 'That which was from the beginning, which we have heard, which we have seen with our eyes, which we have looked upon, and our hands have handled, of the Word of life;'
      },
      {
        verseNumber: '2',
        text: '(For the life was manifested, and we have seen it, and bear witness, and shew unto you that eternal life, which was with the Father, and was manifested unto us;)'
      },
      {
        verseNumber: '3',
        text: 'That which we have seen and heard declare we unto you, that ye also may have fellowship with us: and truly our fellowship is with the Father, and with his Son Jesus Christ.'
      },
      {
        verseNumber: '4',
        text: 'And these things write we unto you, that your joy may be full.'
      },
      {
        verseNumber: '5',
        text: 'This then is the message which we have heard of him, and declare unto you, that God is light, and in him is no darkness at all.'
      },
    ]
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_VERSE_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_VERSE_SUCCESS:
      return {
        ...state,
        passage: {
          translation: action.payload.translation,

        },
        isFetching: false,
        error: ''
      };
    case FETCH_VERSE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;