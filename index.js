global.Promise = Promise = require('bluebird')
require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const routes = require ('./routes')

const port = process.env.PORT ? process.env.PORT : 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(routes)

mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
    app.listen(port)
})
  
mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
})

mongoose.connect(process.env.DB_URL)