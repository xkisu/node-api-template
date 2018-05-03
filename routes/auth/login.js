const debug = require('debug')('app:routes:auth:login')
const jwt = require('jsonwebtoken')
const Router = require('express').Router
const router = Router()

const User = require ('../../models').User

router.post('/', function (req, res) {
    // TODO: use passport local auth
    debug('user login request')
    User.findOne({
        email: req.body.email
    }).exec().then(user => {
        if (!user) {
            debug('user not found')
            return res.status(404).json({
                message: 'User not found',
                ok: false
            })
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            admin: user.admin
        }, process.env.SECRET || 'changeme')

        debug('logged in')
        res.json({
            token,
            ok: true
        })
    }).catch(err => {
        debug('error checking if user exists')
        console.error(err)
        res.status(500).json({
            message: 'Something went wrong',
            ok: false
        })
    })
})

module.exports = router