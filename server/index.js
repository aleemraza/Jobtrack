//import all require library
const express = require('express')
const bodyparser   = require('body-parser')
const cors = require('cors')

//Start APP  Middleware
const app = express()
//Bodyparser  Middleware
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
//cors  Middleware
app.use(cors())
app.use('*', cors())
//File path 
app.use(express.static("./public"))
//CALL OR IMPORT ROUTES Area
const userRoutes = require('./routes/userRoutes')




//All ROUTES START HERE 
app.use('/api/job/user', userRoutes)

module.exports = app