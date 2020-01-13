import {
  FETCH_VERSE_START,
  FETCH_VERSE_SUCCESS,
  FETCH_VERSE_FAILURE
} from '../actions';

const initState = {
  isFetching: false,
  error: '',
  passage: {
    translation: {
      longName: 'King James Version',
      shortName: 'KJV'
    },
    book: '1 John',
    chapter: '1',
    verses: [
      {
        verse: "1",
        text: "That which was from the beginning, which we have heard, which we have seen with our eyes, which we have looked upon, and our hands have handled, of the Word of life;"
      },
      {
        verse: "2",
        text: "(For the life was manifested, and we have seen it, and bear witness, and shew unto you that eternal life, which was with the Father, and was manifested unto us;)"
      },
      {
        verse: "3",
        text: "That which we have seen and heard declare we unto you, that ye also may have fellowship with us: and truly our fellowship is with the Father, and with his Son Jesus Christ."
      },
      {
        verse: "4",
        text: "And these things write we unto you, that your joy may be full."
      },
      {
        verse: "5",
        text: "This then is the message which we have heard of him, and declare unto you, that God is light, and in him is no darkness at all."
      },
      {
        verse: "6",
        text: "If we say that we have fellowship with him, and walk in darkness, we lie, and do not the truth:"
      },
      {
        verse: "7",
        text: "But if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Jesus Christ his Son cleanseth us from all sin."
      },
      {
        verse: "8",
        text: "If we say that we have no sin, we deceive ourselves, and the truth is not in us."
      },
      {
        verse: "9",
        text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
      },
      {
        verse: "10",
        text: "If we say that we have not sinned, we make him a liar, and his word is not in us."
      }
    ]
  },
  locator: {
    current: {
      book: '1 John',
      chapter: '1'
    },
    previous: {
      book: '2 Peter',
      chapter: '3'
    },
    next: {
      book: '1 John',
      chapter: '2'
    }
  },
  translations: [
    {
      longName: 'King James Version',
      shortName: 'KJV'
    },
    {
      longName: 'English Standard Version',
      shortName: 'ESV'
    }
  ]
}

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_VERSE_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_VERSE_SUCCESS:
      return {
        ...state,
        verse: action.payload,
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