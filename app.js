// require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
// const rateLimit = require('express-rate-limit');
// const { errors } = require('celebrate');
// const { default: helmet } = require('helmet');
// const cors = require('cors');
// const corsOptions = require('./middlewares/cors');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const routes = require('./routes/index');
const userRoutes = require('./routes/users-routes');
const movieRoutes = require('./routes/movie-routes');
// const { auth } = require('./middlewares/auth');

// const { errorHandler } = require('./middlewares/errorHandler');
// const NotFoundError = require('./errors/not-found-err');
// const limiterOptions = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;

// const limiter = rateLimit(limiterOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors(corsOptions));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

// app.use(helmet());

// app.use(requestLogger); // подключаем логгер запросов

// app.use(limiter); // Apply the rate limiting middleware to all requests

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// app.use(routes);

// app.use(auth);

app.use(userRoutes);
app.use(movieRoutes);

// app.use((req, res, next) => {
//   next(new NotFoundError('Страница не найдена'));
// });

// app.use(errorLogger); // подключаем логгер ошибок

// app.use(errors()); // обработчик ошибок celebrate
// app.use(errorHandler); // централизованный обработчик

app.listen(PORT);
