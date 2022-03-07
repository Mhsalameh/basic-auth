'use strict';
const basicAuth = require('../src/auth/middleware/basic.js')
const base64 = require('base-64')

describe('testing basic middleware', ()=>{

// let req={headers:{authorization:`Basic ${base64.encode("mohammad:1234")}`}}
let req={headers:{authorization:``}}
let res={}
let next=jest.fn()

it("testing basic auth decoding", async()=>{
   await basicAuth(req,res, next)
    expect(next).toHaveBeenCalledWith("not auth")
})
})