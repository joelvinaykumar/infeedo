const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

module.exports = app