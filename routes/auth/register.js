const debug = require('debug')('app:routes:auth:register')
const Router = require('express').Router
const router = Router()

const User = require ('../../models').User

const { middleware } = require('../../lib/joi/validate')
const registrationSchema = require('../../lib/joi/schemas/register')

router.post('/', middleware(registrationSchema), function (req, res) {
    // TODO: use passport local auth
    debug('registration POST')
    User.findOne({
        email: req.body.email
    }).exec().then(user => {
        if (user) {
            debug('email in use')
            return res.status(409).json({
                message: 'Email already in use',
                ok: false
            })
        }

        new User({
            ...req.body
        }).save().then(() => {
            debug('user created')
            res.status(200).json({
                ok: true,
                message: 'User created'
            })
        }).catch(err => {
            debug('error creating user')
            console.error(err)
            res.status(500).json({
                message: 'Something went wrong',
                ok: false
            })
        })
    }).catch(err => {
        debug('error getting user')
        res.status(500).json({
            message: 'Something went wrong',
            ok: false
        })
    })
})

module.exports = router