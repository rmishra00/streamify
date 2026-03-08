const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),

  description: Joi.string().min(5).required(),

  genre: Joi.string().required(),

  releaseYear: Joi.number().min(1900).max(new Date().getFullYear()),

  duration: Joi.number().positive(),

  rating: Joi.number().min(0).max(10)
});

module.exports = movieSchema;