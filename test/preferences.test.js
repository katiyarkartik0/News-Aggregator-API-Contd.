process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("../src/app.js");
const preferencesConstrains = require("../src/helpers/constants.js");

describe("tests for /preferences route to the server", () => {
  let jwtToken;
  beforeEach((done) => {
    const signInBody = {
      username: "katiyarkartik0@newsagg.com",
      password: "katiyarkartik0",
    };
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        jwtToken = res.body.accessToken;
        done();
      });
  });

  it("Successfully Gets the preferences data of the user for path /preferences/", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });

  it("Successfully updates the preferences data of the user for path /preferences/", (done) => {
    const validPreferenceArray = ["health", "technology"];
    chai
      .request(server)
      .put("/preferences")
      .set("authorization", `JWT ${jwtToken}`)
      .send({ preferences: validPreferenceArray })
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });

  it("preferences data not updated due to INVALID preference array input of the user for path /preferences/", (done) => {
    const validPreferenceArray = "health";
    chai
      .request(server)
      .put("/preferences")
      .set("authorization", `JWT ${jwtToken}`)
      .send({ preferences: validPreferenceArray })
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.text).equal(
          `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`
        );
        done();
      });
  });
});
