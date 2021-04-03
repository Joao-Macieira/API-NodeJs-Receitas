const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');

dotenv.config();

const express = require('express');

const router = require('./routes.js');

const app = express();

const whiteList = [
  'https://sagaos.mtsolutns.com.br',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(router);
app.use((error, request, response, next) => {
  console.log('### ERROR HANDLER');
  console.log(error);
  response.sendStatus(500);
});

app.listen(process.env.SIS_PORT, () => console.log(`Server start at http://localhost:${process.env.SIS_PORT}`));
