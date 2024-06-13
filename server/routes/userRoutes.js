const express = require('express')
const authControler = require('../controler/authControler')
const userControler = require('../controler/userControler')
const routes = express.Router()

//authControler Routes for New User Signup and login
routes.post('/sigup', authControler.signUp);
routes.post('/login', authControler.login);
routes.get('/logout', authControler.logout);


//routes.get('/', authControler.protect, userControler.show)

module.exports = routes