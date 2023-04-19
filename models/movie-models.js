const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Некорректный URL',
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

// const mongoose = require('mongoose');
// const validator = require('validator');

// const cardSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//   },
//   link: {
//     type: String,
//     required: true,
//     validate: {
//       validator: validator.isURL,
//       message: 'Некорректный URL',
//     },
//   },
//   owner: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'user',
//     required: true,
//   },
//   likes: {
//     type: [mongoose.Schema.ObjectId],
//     ref: 'user',
//     default: [],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('card', cardSchema);
