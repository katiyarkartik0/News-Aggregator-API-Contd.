process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("../../src/app.js");

describe("verification of login calls to the server", () => {
  it("Successful Login", (done) => {
    const signInBody = {
      username: "katiyarkartik0@newsagg.com",
      password: "katiyarkartik0",
    };
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.msg).equal("login successful");
        expect(typeof res.body.accessToken).equal("string");
        done();
      });
  });
  it("Unsuccessful Login due to invalid username", (done) => {
    const signInBody = {
      username: "katiyarswastik0@newsagg",
      password: "randomPasswordInput",
    };
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.msg).equal("email address entered is not valid");
        done();
      });
  });

  it("Unsuccessful Login due to valid but unknown username", (done) => {
    const signInBody = {
      username: "katiyarswastik0@newsagg.com",
      password: "randomPasswordInput",
    };
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.msg).equal("username not found, try registering first");
        done();
      });
  });

  it("Unsuccessful Login due to invalid password", (done) => {
    const signInBody = {
      username: "katiyarkartik0@newsagg.com",
      password: "wrongpasswordinput",
    };
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.msg).equal("invalid password");
        done();
      });
  });
});
