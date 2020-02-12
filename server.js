require('dotenv').config();
const express = require('express');
const apiRoute = require('./api/app');

const server = express();

server.use('/api', apiRoute);

server.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`\n∎∎∎∎∎∎ Listening on port ${PORT} ∎∎∎∎∎∎\n`);
});
