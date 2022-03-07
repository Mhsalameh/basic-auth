"use strict";
const base64 = require("base-64");
const {Users} = require('../../models/index.js')
const bcrypt = require('bcrypt')


module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    // console.log(req.headers.authorization)
    let headerSplit = req.headers.authorization.split(" ");
    // console.log({headerSplit});
   let encoded = headerSplit[1]
  //  console.log({encoded})
    let decoded = base64.decode(encoded);
    // console.log({decoded})
    let [userName, password] = decoded.split(":");
    try{
        const user = await Users.findOne({where:{username:userName}})
        req.user=user;
        const valid = await bcrypt.compare(password,user.password)//true or false
        if(valid){
            next()
        }
        else{
            next('invalid username or password')
        }
    }
    catch(error){
        next("invalid username")
    }
  }
  else{
    next('not auth')
  }
};
