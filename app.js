require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { default: helmet } = require('helmet');
const cors = require('cors');
const corsOptions = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const config = require('./utils/config');
const constants = require('./utils/constants');

const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-err');
const limiterOptions = require('./middlewares/limiter');

const limiter = rateLimit(limiterOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected >>>>>>>>>'))
  .catch((err) => console.log(err));

app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов

app.use(limiter); // Apply the rate limiting middleware to all requests

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError(constants.PAGE_NOT_FOUND));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик

app.listen(config.PORT);
