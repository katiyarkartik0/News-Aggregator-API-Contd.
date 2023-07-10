const { getUserByUserId } = require("../helpers/helpersFunctions");
const { fetchNews } = require("../helpers/fetchExternalData");

const updateNewsJSON = (req, res, next) => {
  const userId = req.id;
  const { user, error, msg } = getUserByUserId(userId);
  if (error) {
    req.verified = false;
    req.msg = res.msg ? `either ${res.msg} or ${msg}` : msg;
    next();
  }
  const newsArticlesCacheDate = new Date(user.newsArticlesCacheDate);
  const instant = new Date();
  const differenceInMsec = instant.getTime() - newsArticlesCacheDate.getTime();
  const mm = Math.floor(differenceInMsec / 1000 / 60);
  if (process.env.NODE_ENV == "test") {
    next();
  } else {
    if (mm > 5) {
      fetchNews(userId).then(() => {
        next();
      });
    } else {
      next();
    }
  }
};
module.exports = { updateNewsJSON };
