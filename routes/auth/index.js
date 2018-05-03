const path = require('path')
const router = require('express').Router()

router.use('/login', require('./login.js'))
router.use('/register', require('./register.js'))

module.exports = router