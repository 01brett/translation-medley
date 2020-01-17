import axios from 'axios';

export const FETCH_PASSAGE_START = 'FETCH_PASSAGE_START';
export const FETCH_PASSAGE_SUCCESS = 'FETCH_PASSAGE_SUCCESS';
export const FETCH_PASSAGE_FAILURE = 'FETCH_PASSAGE_FAILURE';

export const getPassage = passage => dispatch => {
  dispatch({ type: FETCH_PASSAGE_START });
  switch (passage.bible) {
    case 'NET':
      fetchNET(passage)
      break;
    case 'ESV':
      fetchESV(passage)
      break;
    default:
      fetchDefault(passage)
      break;
  }
}

const fetchDefault = passage => dispatch => {
  const withoutVerse = `${passage.book} ${passage.chapter}`;
  const withVerse = `${passage.book} ${passage.chapter}.${passage.verses}`;

  axios
    .get(`https://cors-anywhere.herokuapp.com/https://api.biblia.com/v1/bible/content/${passage.bible}.json?passage=${passage.verses ? withVerse : withoutVerse}&style=oneVersePerLine&key=fd37d8f28e95d3be8cb4fbc37e15e18e`)
    .then(res => {
      const rawText = res.data.text;
      return Object.fromEntries(
        rawText
        .split(/\r\n/)
        .splice(1, rawText.length - 1)
        .map(el => el.split(/(?<=[0-9])(?=[\D])/))
      )
    })
    .then(cleanText => (
      dispatch({
        type: FETCH_PASSAGE_SUCCESS,
        payload: {
          content: {
            [passage.bible]: {
              [passage.book]: {
                [passage.chapter]: {
                  allVerses: Object.keys(cleanText),
                  verses: cleanText
                }
              }
            }
          },
          passage: {
            bible: passage.bible,
            book: passage.book,
            chapter: passage.chapter
          }
        }
      })
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    });
};

const fetchNET = passage => dispatch => {
  const withoutVerse = `${passage.book} ${passage.chapter}`;
  const withVerse = `${passage.book} ${passage.chapter}.${passage.verses}`;

  axios
    .get(`https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${passage.verses ? withVerse : withoutVerse}&type=json`)
    .then(res => {
      const formatted = res.data.map(el => {
        return {
          bible: 'NET',
          verse: el.verse,
          text: el.text
        }
      });
      dispatch({
        type: FETCH_PASSAGE_SUCCESS,
        payload: {
          bible: 'NET',
          content: formatted
        }
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    });
};

const fetchESV = passage => dispatch => {
  const withoutVerse = `${passage.book} ${passage.chapter}`;
  const withVerse = `${passage.book} ${passage.chapter}.${passage.verses}`;

  axios
    .get(`https://api.esv.org/v3/passage/text/?q=${passage.verses ? withVerse : withoutVerse}&include-passage-references=false&include-footnotes=false&include-headings=false&include-copyright=false&include-short-copyright=false`, {
      headers: {
        'Authorization': 'Token 1410f911e8d537a0c57c1219c101ecf84540d6c4'
      }
    })
    .then(res => {
      return res.data.passages[0]
        .replace(/([[\]])/g, '')
        .replace(/\n\n/g, '')
        .replace(/\s{2}/g, ' ')
        .split(/[ ]+(?=\d)/g)
        .splice(1, res.data.passages[0].length - 1)
        .map(el => {
          const arr = el.split(/(?<=[0-9])(?=[\D])/);
          return {
            bible: 'ESV',
            verse: arr[0],
            text: arr[1]
          }
        })
    })
    .then(formattedPassage => (
      dispatch({
        type: FETCH_PASSAGE_SUCCESS,
        payload: {
          bible: 'ESV',
          content: formattedPassage
        }
      })
    ))
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCH_PASSAGE_FAILURE, payload: err.response });
    });
};