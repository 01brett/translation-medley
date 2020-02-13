const axios = require('axios');

module.exports = (req, res, next) => {
  const passage = req.body;
  const location = `${passage.book} ${passage.chapter}:${passage.verseRange}`;
  const url = encodeURI(
    `https://cors-anywhere.herokuapp.com/http://labs.bible.org/api/?passage=${location}&type=json`
  );
  axios
    .get(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(res => {
      const rawText = res.data;
      return Object.fromEntries(rawText.map(el => [[el.verse], el.text]));
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
        .json({ message: 'Problem fetching from NET', error: err });
    });
};
