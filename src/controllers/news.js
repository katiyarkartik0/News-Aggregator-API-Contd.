const path = require("path");
const fs = require("fs");
const newsData = require("../news.json") || [];

const {
  findNewsArticle,
  getReadOrFavoritesNews,
  getNewsListBasedOnPreference,
} = require("../helpers/helpersFunctions");
const usersData = require("../usersData.json");
const { Validator } = require("../helpers/validator");

const getNews = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const { newsListBasedOnPreference, error, msg } =
    getNewsListBasedOnPreference(userId);
  
  if (error) {
    return res.status(500).send(msg);
  }
  return res.status(200).send(newsListBasedOnPreference);
};

const addToRead = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const { id: newsId } = req.params;

  const { newsListBasedOnPreference, error, msg } =
    getNewsListBasedOnPreference(userId);
  if (error) {
    res.status(500).send(msg);
  }
  const { newsArticle, newsFound } = findNewsArticle(
    newsId,
    newsListBasedOnPreference
  );

  if (!newsFound) {
    return res
      .status(400)
      .send(
        "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
      );
  }
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      const validator = new Validator();
      if (
        validator.isNewsArticleUniqueInList(newsArticle, user.read) == false
      ) {
        return user;
      }
      return { ...user, read: [...user.read, newsArticle] };
    }
    return user;
  });
  const writePath = path.join(__dirname, "..", "usersData.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedUserData), {
    encoding: "utf-8",
    flag: "w",
  });
  return res.status(200).send("News Article added to read successfully!");
};

const addToFavorites = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const { id: newsId } = req.params;

  const { newsListBasedOnPreference, error, msg } =
    getNewsListBasedOnPreference(userId);
  if (error) {
    res.status(500).send(msg);
  }
  const { newsArticle, newsFound } = findNewsArticle(
    newsId,
    newsListBasedOnPreference
  );

  if (!newsFound) {
    return res
      .status(400)
      .send(
        "either news-ID is invalid or the ID provided is not of the news that is from your preference list of news categories !"
      );
  }
  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      const validator = new Validator();
      if (
        validator.isNewsArticleUniqueInList(newsArticle, user.favorites) ==
        false
      ) {
        return user;
      }
      return { ...user, favorites: [...user.favorites, newsArticle] };
    }
    return user;
  });
  const writePath = path.join(__dirname, "..", "usersData.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedUserData), {
    encoding: "utf-8",
    flag: "w",
  });
  return res.status(200).send("News Article added to favorites successfully!");
};

const getReadNews = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const {
    newsList: readNewsList,
    error,
    msg,
    statusCode,
  } = getReadOrFavoritesNews(userId, { key: "read" });
  if (error) {
    return res.status(statusCode).send(msg);
  }
  return res.status(200).send(readNewsList);
};

const getFavoriteNews = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }
  const userId = req.id;
  const {
    newsList: favoritesNewsList,
    error,
    msg,
    statusCode,
  } = getReadOrFavoritesNews(userId, {
    key: "favorites",
  });
  if (error) {
    return res.status(statusCode).send(msg);
  }
  return res.status(200).send(favoritesNewsList);
};

const getNewsByKeyword = (req,res)=>{
  const {keyword} = req.params;
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  let newsArticles=[];
  for(let i = 0; i<newsData.length;i++){
    const individualCategoryNewsCollection = newsData[i].data;
    for(let j = 0; j<individualCategoryNewsCollection.length;j++){
      if(individualCategoryNewsCollection[j].content && individualCategoryNewsCollection[j].content.includes(keyword)==true){
        newsArticles = [...newsArticles,individualCategoryNewsCollection[j]]
      }
    }
  }
  return res.status(200).send(newsArticles);
}

module.exports = {
  getNews,
  addToRead,
  addToFavorites,
  getReadNews,
  getFavoriteNews,
  getNewsByKeyword
};
