const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const mongoConfig = require('./db/index');
const passport = require('passport');
const initializePassport = require('./config/config.passport');
const router = require('./router')

const app = express()

mongoConfig(app)
initializePassport()


app.use(express.json())
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(passport.initialize())


router(app)


module.exports = app