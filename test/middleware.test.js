process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("../src/app.js");

describe("tests for /preferences route to the server", () => {
  it("Making a get request to database with a fake INVALID JWT TOKEN", (done) => {
    let fakeJwtToken = "fakeJwtTokenToTestVerifyTokenMiddleWare";
    chai
      .request(server)
      .get("/preferences")
      .set("authorization", `JWT ${fakeJwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.text).equal('invalid JWT token')
        done();
      });
  });
  it("Making a get request to database without JWT token", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.text).equal('Authorization header not found')
        done();
      });
  });
});
