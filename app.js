const express=require('express')
const app=express()
const {MONGO_URL,PORT} = require('./utils/config')
const { info, error } = require('./utils/logger')
const router = require('./controller/route')

const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect(MONGO_URL)
.then(()=> info(`connected to MongoDB`))
.catch((error) => error('error connecting to MongoDB: ',error.message))

app.use(express.json())

const middleware = require('./utils/middleware')
app.use(middleware.requestLogger)

app.use('/',router)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
module.exports = app