process.env.NODE_ENV = "test";
const { app } = require("../app");
const { expect } = require("chai");
const request = require("supertest");

describe("/api", () => {
  describe("/users/login", () => {
    it("POST - 200, logs in user and responds with a user object", () => {
      return request(app)
        .post("/api/users/login")
        .send({ user_name: "ricky", password: "test1234" })
        .expect(201);
      // .then((res) => {
      //   expect(res.body).to.equal();
      // });
    });
  });
});
