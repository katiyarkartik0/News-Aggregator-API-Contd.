process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("../src/app.js");

describe("tests for /news route to the server", () => {
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

  it("Successfully Gets the news data as per the preferences for path /news/", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });

  it("Article added to read (for VALID article uniqueId) for path /news/:id/read", (done) => {
    const validId = "-llkyyh";
    chai
      .request(server)
      .post(`/news/${validId}/read`)
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });

  it("Article not added to read (because INVALID article uniqueId) for path /news/:id/read", (done) => {
    const invalidId = "invalid Id";
    chai
      .request(server)
      .post(`/news/${invalidId}/read`)
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
        expect(res.text).equal(
          "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
        );
      });
  });

  it("Article added to favorites (for VALID article uniqueId) for path /news/:id/favorite", (done) => {
    const validId = "-llkyyh";
    chai
      .request(server)
      .post(`/news/${validId}/favorite`)
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });

  it("Article not added to read (because INVALID article uniqueId) for path /news/:id/read", (done) => {
    const invalidId = "invalid Id";
    chai
      .request(server)
      .post(`/news/${invalidId}/favorite`)
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(400);
        done();
        expect(res.text).equal(
          "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
        );
      });
  });

  it("Successfully Gets the read news data for path /news/read", (done) => {
    chai
      .request(server)
      .get("/news/read")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });

  it("Successfully Gets the favorite news data for path /news/favorites", (done) => {
    chai
      .request(server)
      .get("/news/favorites")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });

  it("Successfully Gets the news articles data as per the keyword for path /news/search//:keyword", (done) => {
    let keyWord = "health";
    chai
      .request(server)
      .get(`/news/search/${keyWord}`)
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        done();
      });
  });
});
