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
    const { passage, content } = req.data;

    const formatted = {
      passage: {
        ...passage
      },
      content: {
        [passage.bible]: {
          [passage.book]: {
            [passage.chapter]: {
              allVerses: Object.keys(content).map(el => Number(el)),
              verses: content
            }
          }
        }
      }
    };

    res.json(formatted);
  }
);

module.exports = app;
