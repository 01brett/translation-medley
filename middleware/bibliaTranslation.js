const axios = require('axios');

module.exports = (req, res, next) => {
  const text = req.body;
  const location = `${text.book} ${text.chapter}:${text.verseRange}`;
  const url = encodeURI(
    `https://cors-anywhere.herokuapp.com/https://api.biblia.com/v1/bible/content/${text.bible}.json?passage=${location}&style=oneVersePerLine&key=${process.env.BIBLIA}`
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
        passage: text,
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
