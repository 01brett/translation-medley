const axios = require('axios');

module.exports = (req, res, next) => {
  const passage = req.query;
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`;
  const url = encodeURI(
    `https://cors-anywhere.herokuapp.com/https://api.biblia.com/v1/bible/content/${passage.bible}.json?passage=${location}&style=oneVersePerLine&key=${process.env.BIBLIA}`
  );
  axios
    .get(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(res => {
      const rawText = res.data.text;
      return Object.fromEntries(
        rawText
          .split(/\r\n/)
          .splice(1, rawText.length - 1)
          .map(el => el.split(/(?<=[0-9])(?=[\D])/))
      );
    })
    .then(cleanText => {
      req.data = {
        passage: passage,
        content: cleanText
      };
      next();
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Problem fetching from Biblia', error: err });
    });
};
