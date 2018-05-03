const Joi = require('joi')

module.exports = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(5),
})