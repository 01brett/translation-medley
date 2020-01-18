import {
  FETCH_PASSAGE_START,
  FETCH_PASSAGE_SUCCESS,
  FETCH_PASSAGE_FAILURE
} from '../actions';

const initState = {
  isFetching: false,
  error: '',
  content: {
    'KJV': {
      'Philippians': {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'Paul and Timotheus, the servants of Jesus Christ, to all the saints in Christ Jesus which are at Philippi, with the bishops and deacons:',
            '2': 'Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ.',
            '3': 'I thank my God upon every remembrance of you,',
            '4': 'Always in every prayer of mine for you all making request with joy,',
            '5': 'For your fellowship in the gospel from the first day until now;',
            '6': 'Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ:',
            '7': 'Even as it is meet for me to think this of you all, because I have you in my heart; inasmuch as both in my bonds, and in the defence and confirmation of the gospel, ye all are partakers of my grace.'
          }
        }
      }
    },
  },
  passage: {
    bible: 'KJV',
    book: 'Philippians',
    chapter: '1',
    verseRange: '1–7',
    swappedVerses: [
      // {
      //   'verse': 3,
      //   'bible': 'NET'
      // },
    ]
  },
  bibles: [
    {
      id: 'ESV',
      display: 'English Standard Version'
    },
    {
      id: 'NET',
      display: 'New English Bible'
    },
    {
      id: 'KJV',
      display: 'King James Version'
    },
    {
      id: 'ASV',
      display: 'American Standard Version'
    },
    {
      id: 'DARBY',
      display: '1890 Darby Bible'
    },
    {
      id: 'LEB',
      display: 'Lexham English Bible'
    },
    {
      id: 'YLT',
      display: `Young's Literal Bible`
    }  
  ]
}

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_PASSAGE_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PASSAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        content: {
          ...state.content,
          ...action.payload.content
        },
        passage: {
          ...state.passage,
          bible: action.payload.passage.bible,
          book: action.payload.passage.book,
          chapter: action.payload.passage.chapter
        }
      };
    case FETCH_PASSAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};