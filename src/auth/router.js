'use strict';
const express= require('express');
const router = express.Router();
const {Users} = require('../models/index.js')
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic.js')

router.post("/signup", signUpHandler);
router.post("/signin", basicAuth , signInHandler);

async function signUpHandler(req,res){

    const reqBody=req.body;
    const userName=reqBody.username;
    const password=reqBody.password;
    try{
    const hashedPassword= await bcrypt.hash(password,5);
    const newUser = await Users.create({username:userName, password:hashedPassword});
    res.status(201).send(newUser)
    }
    catch(e){
        res.status(500).json('input cannot be null')
    }
}

async function signInHandler(req,res){
    res.status(200).send(req.user)
}


module.exports = router