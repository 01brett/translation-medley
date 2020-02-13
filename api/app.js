const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { check } = require('express-validator');
const validation = require('../middleware/validation');
const whichTranslation = require('../middleware/whichTranslation');
const app = express.Router();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.get(
  '/passage',
  [
    check('bible', 'bible is required')
      .exists()
      .isLength({ min: 3 })
      .withMessage('bible data messed up'),
    check('book', 'book is required')
      .exists()
      .notEmpty()
      .withMessage('Cannot be empty'),
    check('chapter', 'chapter is required')
      .exists()
      .notEmpty()
      .withMessage('Cannot be empty'),
    check('verseRange')
      .optional()
      .notEmpty()
      .withMessage('Cannot be empty')
  ],
  validation,
  whichTranslation,
  (req, res) => {
    res.json(req.data);
  }
);

module.exports = app;
/*

export const fetchNET = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`;

  dispatch(fetchStart());

  axios
    .get(
      `https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${location}&type=json`
    )
    .then(res => {
      const rawText = res.data;
      return Object.fromEntries(rawText.map(el => [[el.verse], el.text]));
    })
    .then(cleanText => {
      console.log(`${passage.bible}:`, cleanText, passage);
      dispatch(fetchSuccess());
      return {
        passage: passage,
        content: cleanText
      };
    })
    .catch(err => {
      console.log(err);
      dispatch(fetchFailure(err.response));
    });
};

export const fetchESV = passage => dispatch => {
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`;

  dispatch(fetchStart());

  axios
    .get(
      `https://api.esv.org/v3/passage/text/?q=${location}&include-passage-references=false&include-footnotes=false&include-headings=false&include-copyright=false&include-short-copyright=false`,
      {
        headers: {
          Authorization: 'Token 1410f911e8d537a0c57c1219c101ecf84540d6c4'
        }
      }
    )
    .then(res => {
      const rawText = res.data.passages[0];
      return Object.fromEntries(
        rawText
          .replace(/([[\]])/g, '')
          .replace(/\n\n/g, '')
          .replace(/\s{2}/g, ' ')
          .split(/[ ]+(?=\d)/g)
          .splice(1, rawText.length - 1)
          .map(el => el.split(/(?<=[0-9])(?=[\D])/))
      );
    })
    .then(cleanText => {
      console.log(`${passage.bible}:`, cleanText, passage);
      dispatch(fetchSuccess());
      return {
        passage: passage,
        content: cleanText
      };
    })
    .catch(err => {
      console.log(err);
      dispatch(fetchFailure(err.response));
    });
};

export const addContent = (passage, content) => ({
  type: ADD_CONTENT,
  payload: {
    [passage.bible]: {
      [passage.book]: {
        [passage.chapter]: {
          allVerses: Object.keys(content),
          verses: content
        }
      }
    }
  }
})

export const setContent = (passage, content) => ({
  type: SET_CONTENT,
  payload: {
    [passage.bible]: {
      [passage.book]: {
        [passage.chapter]: {
          allVerses: Object.keys(content),
          verses: content
        }
      }
    }
  }
})


*/
