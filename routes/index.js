const path = require('path')
const fs = require('fs')
const router = require('express').Router()

fs.readdirSync(path.join(__dirname)).forEach(function requireModelFiles (file) {
    if(!file.includes('index')) {
        const name = path.parse(file).name
        router.use(require(path.join(__dirname, file)))
    }
})

module.exports = router