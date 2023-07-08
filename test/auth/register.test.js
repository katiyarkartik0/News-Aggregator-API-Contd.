process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("../../src/app.js");

describe("verification of register calls to server", () => {
  it("Successful register", (done) => {
    const signUpBody = { username: "testName@goo.com", password: "test@123" };

    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        // console.log(res)
        expect(res.status).equal(200);
        expect(res.text).equal("user created successfully");
        done();
      });
  });

  it("Invalid input register", (done) => {
    const signUpBody = { username: "testName", password: "test@123" };
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.text).equal("email address entered is not valid");
        done();
      });
  });

  it("Username input duplication check", (done) => {
    const signUpBody = {
      username: "katiyarkartik0@newsagg.com",
      password: "test@123",
    };
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.text).equal("user already exists, try signing in");
        done();
      });
  });
});
