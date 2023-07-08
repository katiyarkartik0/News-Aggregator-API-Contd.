const express = require("express");
const newsRoutes = express.Router();
const bodyParser = require("body-parser");
const {
  getNews,
  addToRead,
  addToFavorites,
  getFavoriteNews,
  getReadNews,
  getNewsByKeyword,
} = require("../controllers/news.js");

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

newsRoutes.get("/", getNews);
newsRoutes.post("/:id/read", addToRead);
newsRoutes.post("/:id/favorite", addToFavorites);
newsRoutes.get("/read", getReadNews);
newsRoutes.get("/favorites", getFavoriteNews);
newsRoutes.get("/search/:keyword",getNewsByKeyword)

module.exports = newsRoutes;
