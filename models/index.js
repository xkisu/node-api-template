const path = require('path')
const fs = require('fs')

const models = {}

fs.readdirSync(path.join(__dirname)).forEach(function requireModelFiles (file) {
    if(!file.includes('index')) {
        const name = path.parse(file).name
        models[name] = require(path.join(__dirname, file))
    }
})

module.exports = {
    ...models
}