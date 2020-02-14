const axios = require('axios');

module.exports = (req, res, next) => {
  const text = req.query;
  const location = `${text.book} ${text.chapter}:${text.verseRange}`;
  const url = encodeURI(
    `https://api.esv.org/v3/passage/text/?q=${location}&include-passage-references=false&include-footnotes=false&include-headings=false&include-copyright=false&include-short-copyright=false`
  );

  axios
    .get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Token ${process.env.ESV}`
      }
    })
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
        .json({ message: 'Problem fetching from ESV', error: err });
    });
};
