import {
  FETCH_VERSE_START,
  FETCH_VERSE_SUCCESS,
  FETCH_VERSE_FAILURE
} from '../actions/verseActions';

import {
  FETCH_PASSAGE_START,
  FETCH_PASSAGE_SUCCESS,
  FETCH_PASSAGE_FAILURE
} from '../actions/passageActions';

/*

Instead of swapping out each verse in the store and throwing away the old one, you could keep all of them and have a separate part of state store which ones you want to use. Then in your selectors have it map over that and look up each verse from the store

const potentialDataStructure = {
  'content': {
    'ESV': {
      'Philippians': {
        '1': {
          'allVerses': [
            1, 2, 3, 30
          ],
          'verses': {
            '1': 'Paul and Timothy...',
            '2': 'Greetings...'
          }
        }
      }
    },
    'KJV': {},
    'NET': {}
  },
  'passage' : {
    'bible': 'ESV',
    'book': 'John',
    'chapter': '1',
    'verses': '1-5',
    'swappedVerses': [
      {
        'verse': 3,
        'bible': 'KJV'
      },
      {
        'verse': 7,
        'bible': 'NET'
      },
    ]
  }
}
*/

const initState = {
  isFetching: false,
  error: '',
  isVerseSwapping: false,
  passage: {
    bible: 'KJV',
    book: 'Philippians',
    chapter: '1',
    content: [
      {
        verse: "1",
        bible: 'KJV',
        text: "Paul and Timotheus, the servants of Jesus Christ, to all the saints in Christ Jesus which are at Philippi, with the bishops and deacons:"
      },
      {
        verse: "2",
        bible: 'KJV',
        text: "Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ."
      },
      {
        verse: "3",
        bible: 'KJV',
        text: "I thank my God upon every remembrance of you,"
      },
      {
        verse: "4",
        bible: 'KJV',
        text: "Always in every prayer of mine for you all making request with joy,"
      },
      {
        verse: "5",
        bible: 'KJV',
        text: "For your fellowship in the gospel from the first day until now;"
      },
      {
        verse: "6",
        bible: 'KJV',
        text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ:"
      },
      {
        verse: "7",
        bible: 'KJV',
        text: "Even as it is meet for me to think this of you all, because I have you in my heart; inasmuch as both in my bonds, and in the defence and confirmation of the gospel, ye all are partakers of my grace."
      },
      {
        verse: "8",
        bible: 'KJV',
        text: "For God is my record, how greatly I long after you all in the bowels of Jesus Christ."
      },
      {
        verse: "9",
        bible: 'KJV',
        text: "And this I pray, that your love may abound yet more and more in knowledge and in all judgment;"
      },
      {
        verse: "10",
        bible: 'KJV',
        text: "That ye may approve things that are excellent; that ye may be sincere and without offence till the day of Christ;"
      },
      {
        verse: "11",
        bible: 'KJV',
        text: "Being filled with the fruits of righteousness, which are by Jesus Christ, unto the glory and praise of God."
      },
      {
        verse: "12",
        bible: 'KJV',
        text: "But I would ye should understand, brethren, that the things which happened unto me have fallen out rather unto the furtherance of the gospel;"
      },
      {
        verse: "13",
        bible: 'KJV',
        text: "So that my bonds in Christ are manifest in all the palace, and in all other places;"
      },
      {
        verse: "14",
        bible: 'KJV',
        text: "And many of the brethren in the Lord, waxing confident by my bonds, are much more bold to speak the word without fear."
      },
      {
        verse: "15",
        bible: 'KJV',
        text: "Some indeed preach Christ even of envy and strife; and some also of good will:"
      },
      {
        verse: "16",
        bible: 'KJV',
        text: "The one preach Christ of contention, not sincerely, supposing to add affliction to my bonds:"
      },
      {
        verse: "17",
        bible: 'KJV',
        text: "But the other of love, knowing that I am set for the defence of the gospel."
      },
      {
        verse: "18",
        bible: 'KJV',
        text: "What then? notwithstanding, every way, whether in pretence, or in truth, Christ is preached; and I therein do rejoice, yea, and will rejoice."
      },
      {
        verse: "19",
        bible: 'KJV',
        text: "For I know that this shall turn to my salvation through your prayer, and the supply of the Spirit of Jesus Christ,"
      },
      {
        verse: "20",
        bible: 'KJV',
        text: "According to my earnest expectation and my hope, that in nothing I shall be ashamed, but that with all boldness, as always, so now also Christ shall be magnified in my body, whether it be by life, or by death."
      },
      {
        verse: "21",
        bible: 'KJV',
        text: "For to me to live is Christ, and to die is gain."
      },
      {
        verse: "22",
        bible: 'KJV',
        text: "But if I live in the flesh, this is the fruit of my labour: yet what I shall choose I wot not."
      },
      {
        verse: "23",
        bible: 'KJV',
        text: "For I am in a strait betwixt two, having a desire to depart, and to be with Christ; which is far better:"
      },
      {
        verse: "24",
        bible: 'KJV',
        text: "Nevertheless to abide in the flesh is more needful for you."
      },
      {
        verse: "25",
        bible: 'KJV',
        text: "And having this confidence, I know that I shall abide and continue with you all for your furtherance and joy of faith;"
      },
      {
        verse: "26",
        bible: 'KJV',
        text: "That your rejoicing may be more abundant in Jesus Christ for me by my coming to you again."
      },
      {
        verse: "27",
        bible: 'KJV',
        text: "Only let your conversation be as it becometh the gospel of Christ: that whether I come and see you, or else be absent, I may hear of your affairs, that ye stand fast in one spirit, with one mind striving together for the faith of the gospel;"
      },
      {
        verse: "28",
        bible: 'KJV',
        text: "And in nothing terrified by your adversaries: which is to them an evident token of perdition, but to you of salvation, and that of God."
      },
      {
        verse: "29",
        bible: 'KJV',
        text: "For unto you it is given in the behalf of Christ, not only to believe on him, but also to suffer for his sake;"
      },
      {
        verse: "30",
        bible: 'KJV',
        text: "Having the same conflict which ye saw in me, and now hear to be in me."
      }
    ]
  },
  bibles: [
    {
      display: "English Standard Version",
      id: 'ESV'
    },
    {
      display: "New English bible",
      id: 'NET'
    },
    {
      display: 'King James Version',
      id: 'KJV'
    },
    {
      display: 'American Standard Version',
      id: 'ASV'
    },
    {
      display: '1890 Darby Bible',
      id: 'DARBY'
    },
    {
      display: 'Lexham English Bible',
      id: 'LEB'
    },
    {
      display: "Young's Literal bible",
      id: 'YLT'
    }  
  ]
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
          ...state.passage,
          content: [
            ...state.passage.content.map(el => (
              (el.verse === action.payload.verse) ? (action.payload) : (el)
            ))
          ]
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
    case FETCH_PASSAGE_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PASSAGE_SUCCESS:
      return {
        ...state,
        passage: {
          ...state.passage,
          bible: action.payload.bible,
          content: action.payload.content
        },
        isFetching: false,
        error: ''
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

export default reducer;