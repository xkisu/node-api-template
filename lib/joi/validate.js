const Joi = require('joi')

function validate (body, schema) {
    return Joi.validate(body, schema, {
        stripUnknown: true,
        abortEarly: false
    })
}

module.exports = {
    validate: validate,
    middleware (schema) {
        const _t = this
        return (req, res, next) => {
            const validation = validate(req.body, schema)

            if (validation.error) {
                const errors = validation.error.details.map(err => ({
                    key: err.context.key,
                    message: err.message
                }))

                res.status(422).json({
                    message: 'Validation errors',
                    ok: false,
                    errors
                })
            } else {
                next()
            }
        }
    }
}