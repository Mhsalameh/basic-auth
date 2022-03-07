"use strict";
const server = require("../src/server.js");
const supertest = require("supertest");
const { db } = require("../src/models/index.js");
const request = supertest(server.app);

describe("testing auth server", () => {
  beforeAll(async () => {
    db.sync();
  });

  afterAll(() => {
    db.drop();
  });

  it("POST to /signup to create a new user", async () => {
    const response = await request
      .post("/signup")
      .send({ username: "mohammad", password: "1234" });
    expect(response.status).toEqual(201);
  });

  it("POST to /signin to login as a user (use basic auth)", async () => {
    const response = await request.post("/signin").auth("mohammad", "1234");
    expect(response.status).toEqual(200);
  });

  it("testing invalid username", async () => {
    const response = await request.post("/signin").auth("moathx", "qwerty");
    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual("invalid username");
  });
  it("testing invalid password", async () => {
    const response = await request.post("/signin").auth("mohammad", "qwerty");
    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual("invalid username or password");
  });
  it("testing null input singup", async()=>{
    const response= await request.post('/signup').auth(null,"qwerty");
    expect(response.status).toEqual(500);
    console.log(response)
    expect(response.body).toEqual('input cannot be null')
  })
  it("testing null input singup", async()=>{
    const response= await request.post('/signu').auth(null,"qwerty");
    expect(response.status).toEqual(404);
   })
});
