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
  content: {
    NET: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1':
              'From Paul and Timothy, slaves of Christ Jesus, to all the saints in Christ Jesus who are in Philippi, with the overseers and deacons.',
            '2':
              'Grace and peace to you from God our Father and the Lord Jesus Christ!',
            '3': 'I thank my God every time I remember you.',
            '4': 'I always pray with joy in my every prayer for all of you',
            '5':
              'because of your participation in the gospel from the first day until now.',
            '6':
              'For I am sure of this very thing, that the one who began a good work in you will perfect it until the day of Christ Jesus.',
            '7':
              'For it is right for me to think this about all of you, because I have you in my heart, since both in my imprisonment and in the defense and confirmation of the gospel all of you became partners in God’s grace together with me.'
          }
        }
      }
    },
    ESV: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1':
              ' Paul and Timothy, servants of Christ Jesus, To all the saints in Christ Jesus who are at Philippi, with the overseers and deacons:',
            '2':
              ' Grace to you and peace from God our Father and the Lord Jesus Christ.',
            '3': ' I thank my God in all my remembrance of you,',
            '4':
              ' always in every prayer of mine for you all making my prayer with joy,',
            '5':
              ' because of your partnership in the gospel from the first day until now.',
            '6':
              ' And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ.',
            '7':
              ' It is right for me to feel this way about you all, because I hold you in my heart, for you are all partakers with me of grace, both in my imprisonment and in the defense and confirmation of the gospel.'
          }
        }
      }
    }
  },
  passage: {
    bible: 'ESV',
    book: 'Philippians',
    chapter: '1',
    verseRange: '1–7'
  },
  swapped: [
    {
      verse: 3,
      bible: 'NET'
    },
    {
      verse: 6,
      bible: 'NET'
    }
  ],
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
    },
    {
      id: 'ASV',
      display: 'American Standard'
    },
    {
      id: 'DARBY',
      display: '1890 Darby'
    },
    {
      id: 'LEB',
      display: 'Lexham English'
    },
    {
      id: 'YLT',
      display: `Young's Literal`
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
