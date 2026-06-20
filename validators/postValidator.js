const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(5).required(),
  authorId: Joi.string().required(),
  image: Joi.string().allow("").optional(),
});

module.exports = postSchema;