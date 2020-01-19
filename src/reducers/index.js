import {
  ADD_SWAP,
  CLEAR_SWAPS,
  SHOW_CONTROLS,
  HIDE_CONTROLS,
  SET_PASSAGE_BIBLE
} from '../actions'

const initState = {
  isToggled: false,
  isFetching: false,
  error: '',
  content: {
    KJV: {
      Philippians: {
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
    NET: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'From Paul and Timothy, slaves of Christ Jesus, to all the saints in Christ Jesus who are in Philippi, with the overseers and deacons.',
            '2': 'Grace and peace to you from God our Father and the Lord Jesus Christ!',
            '3': 'I thank my God every time I remember you.',
            '4': 'I always pray with joy in my every prayer for all of you',
            '5': 'because of your participation in the gospel from the first day until now.',
            '6': 'For I am sure of this very thing, that the one who began a good work in you will perfect it until the day of Christ Jesus.',
            '7': 'For it is right for me to think this about all of you, because I have you in my heart, since both in my imprisonment and in the defense and confirmation of the gospel all of you became partners in God’s grace together with me.'
          }
        }
      }
    },
    ASV: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'Paul and Timothy, servants of Christ Jesus, to all the saints in Christ Jesus that are at Philippi, with the bishops and deacons: ',
            '2': 'Grace to you and peace from God our Father and the Lord Jesus Christ. ',
            '3': 'I thank my God upon all my remembrance of you, ',
            '4': 'always in every supplication of mine on behalf of you all making my supplication with joy, ',
            '5': 'for your fellowship in furtherance of the gospel from the first day until now; ',
            '6': 'being confident of this very thing, that he who began a good work in you will perfect it until the day of Jesus Christ: ',
            '7': 'even as it is right for me to be thus minded on behalf of you all, because I have you in my heart, inasmuch as, both in my bonds and in the defence and confirmation of the gospel, ye all are partakers with me of grace.'
          }
        }
      }
    },
    ESV: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': ' Paul and Timothy, servants of Christ Jesus, To all the saints in Christ Jesus who are at Philippi, with the overseers and deacons:',
            '2': ' Grace to you and peace from God our Father and the Lord Jesus Christ.',
            '3': ' I thank my God in all my remembrance of you,',
            '4': ' always in every prayer of mine for you all making my prayer with joy,',
            '5': ' because of your partnership in the gospel from the first day until now.',
            '6': ' And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ.',
            '7': ' It is right for me to feel this way about you all, because I hold you in my heart, for you are all partakers with me of grace, both in my imprisonment and in the defense and confirmation of the gospel.'
          }
        }
      }
    },
    LEB: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'Paul and Timothy, slaves of Christ Jesus, to all the saints in Christ Jesus who are in Philippi, together with the overseers and deacons. ',
            '2': 'Grace to you and peace from God our Father and the Lord Jesus Christ. ',
            '3': 'I give thanks to my God upon my every remembrance of you, ',
            '4': 'always in my every prayer for all of you, making the prayer with joy, ',
            '5': 'because of your participation in the gospel from the first day until now, ',
            '6': 'convinced of this same thing, that the one who began a good work in you will finish it until the day of Christ Jesus, ',
            '7': 'just as it is right for me to think this about all of you, because I have you in my heart, since both in my imprisonment and in the defense and confirmation of the gospel all of you are sharers of grace with me.'
          }
        }
      }
    },
    DARBY: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'Paul and Timotheus, bondmen of Jesus Christ, to all the saints in Christ Jesus who are in Philippi, with the overseers and ministers; ',
            '2': 'grace to you, and peace from God our Father and the Lord Jesus Christ. ',
            '3': 'I thank my God for my whole remembrance of you, ',
            '4': 'constantly in my every supplication, making the supplication for you all with joy, ',
            '5': 'because of your fellowship with the gospel, from the first day until now; ',
            '6': 'having confidence of this very thing, that he who has begun in you a good work will complete it unto Jesus Christ’s day: ',
            '7': 'as it is righteous for me to think this as to you all, because ye have me in your hearts, and that both in my bonds and in the defence and confirmation of the glad tidings ye are all participators in my grace.'
          }
        }
      }
    },
    YLT: {
      Philippians: {
        '1': {
          allVerses: [1, 2, 3, 4, 5, 6, 7],
          verses: {
            '1': 'Paul and Timotheus, servants of Jesus Christ, to all the saints in Christ Jesus who are in Philippi, with overseers and ministrants; ',
            '2': 'Grace to you, and peace from God our Father, and the Lord Jesus Christ. ',
            '3': 'I give thanks to my God upon all the remembrance of you, ',
            '4': 'always, in every supplication of mine for you all, with joy making the supplication, ',
            '5': 'for your contribution to the good news from the first day till now, ',
            '6': 'having been confident of this very thing, that He who did begin in you a good work, will perform it till a day of Jesus Christ. ',
            '7': 'According as it is righteous for me to think this in behalf of you all, because of my having you in the heart, both in my bonds, and in the defence and confirmation of the good news, all of you being fellow-partakers with me of grace.'
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
  },
  swapped: [
    {
      verse: 3,
      bible: 'NET'
    },
    {
      verse: 4,
      bible: 'ASV'
    },
    {
      verse: 6,
      bible: 'NET'
    }
  ],
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
    case CLEAR_SWAPS:
      return {
        ...state,
        swapped: []
      }
    case ADD_SWAP:
      if (state.swapped.find( ({ verse }) => verse === action.payload.verse)) {
        return {
          ...state,
          swapped: [
            ...state.swapped.map(el => (
              el.verse === action.payload.verse
                ? action.payload
                : el
            ))
          ]
        }
      } else {
        return {
          ...state,
          swapped: [ ...state.swapped, action.payload ]
        }
      }
    case SHOW_CONTROLS:
      return {
        ...state,
        isToggled: true
      }
      case HIDE_CONTROLS:
        return {
          ...state,
          isToggled: false
        }
    case SET_PASSAGE_BIBLE:
      return {
        ...state,
        passage: { ...state.passage, bible: action.payload }
      }
    default:
      return state
  }
}