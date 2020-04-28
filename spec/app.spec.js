process.env.NODE_ENV = "test";
const { app } = require("../app");
const { expect } = require("chai");
const request = require("supertest");
const seed = require("../db/seeder.js");

describe("/api", () => {
  afterEach(async () => {
    await seed();
  });
  describe("/users/login", () => {
    it("POST - 200, logs in user and responds with a user object", () => {
      return request(app)
        .post("/api/users/login")
        .send({ user_name: "miketest", password: "test1234" })
        .expect(200)
        .then((res) => {
          expect(res.body.user).to.have.all.keys(["id", "user_name", "token"]);
        });
    });
    it("POST - 401, logs in user and responds with error if password is incorrect", () => {
      return request(app)
        .post("/api/users/login")
        .send({ user_name: "miketest", password: "test12345" })
        .expect(401);
    });
    it("POST - 401, logs in user and responds with error if user incorrect", () => {
      return request(app)
        .post("/api/users/login")
        .send({ user_name: "ricky", password: "test1234" })
        .expect(401);
    });
  });
  // describe("/user/register", () => {
  //   it("POST - 201, creates new user and responds with a user object", () => {
  //     return request(app)
  //       .post("/api/users/register")
  //       .send({
  //         user_name: "ricky100",
  //         first_name: "Ricky",
  //         last_name: "K",
  //         email: "ricky100@gmail.com",
  //         password: "test2345",
  //       })
  //       .expect(201)
  //       .then((res) => {
  //         expect(res.body.user).to.have.all.keys(["id", "user_name"]);
  //       });
  //   });
  //   it("POST - 401, duplicate user name", () => {
  //     return request(app)
  //       .post("/api/users/register")
  //       .send({
  //         user_name: "miketest",
  //         first_name: "Ricky",
  //         last_name: "K",
  //         email: "ricky100@gmail.com",
  //         password: "test2345",
  //       })
  //       .expect(401);
  //   });
  //   it("POST - 401, duplicate email", () => {
  //     return request(app)
  //       .post("/api/users/register")
  //       .send({
  //         user_name: "ricky15555",
  //         first_name: "Ricky",
  //         last_name: "K",
  //         email: "jay@hotmail.co.uk",
  //         password: "test2345",
  //       })
  //       .expect(401);
  //   });
  // });
});
