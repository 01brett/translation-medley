const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express.Router();

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

module.exports = app;
