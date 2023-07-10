const newsData = require("../news.json") || [];
const usersData = require("../usersData.json");

const getUserByUserId = (userId) => {
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].userId == userId) {
      return {
        user: usersData[i],
        error: false,
        msg: "user found corresponding to userId",
      };
    }
  }
  return {
    user: null,
    error: true,
    msg: "user NOT FOUND! corresponding to userId",
  };
};

const getPreferencesListOfUser = (userId) => {
  const { user, error, msg } = getUserByUserId(userId);
  if (error) {
    return { preferencesList: null, error: true, msg };
  }

  return {
    preferencesList: user.preferences,
    error: false,
    msg: "preference list of user found corresponding to userId",
  };
};

const getNewsListBasedOnPreference = (userId) => {
  let { preferencesList, error, msg } = getPreferencesListOfUser(userId);
  if (error) {
    return { newsBasedOnPreference: null, error, msg };
  }
  const newsListBasedOnPreference = newsData.filter((item) => {
    if (preferencesList.includes(item.category)) {
      return true;
    }
    return false;
  });
  return {
    newsListBasedOnPreference,
    error: false,
    msg: "news list based on preferences has been curated",
  };
};

const findNewsArticle = (newsId, newsListBasedOnPreference) => {
  let newsArticle = null;
  let newsFound = false;
  for (let i = 0; i < newsListBasedOnPreference.length; i++) {
    if (newsFound == true) {
      break;
    }
    for (let j = 0; j < newsListBasedOnPreference[i].data.length; j++) {
      if (newsListBasedOnPreference[i].data[j].uniqueId == newsId) {
        newsArticle = newsListBasedOnPreference[i].data[j];
        newsFound = true;
        break;
      }
    }
  }
  return { newsArticle, newsFound };
};

const getReadOrFavoritesNews = (userId, type) => {
  const { key } = type;
  if (key != "read" && key != "favorites") {
    return {
      newsList: null,
      statusCode: 400,
      error: true,
      msg: 'please provide a valid {key:"read"} or {key:"favorites"}',
    };
  }
  const { user, error, msg } = getUserByUserId(userId);
  if (error) {
    return {
      newsList: null,
      statusCode: 500,
      error,
      msg,
    };
  }
  const newsList = user[key];

  return {
    newsList,
    statusCode: 200,
    error: false,
    msg: `${key} news has been found`,
  };
};

module.exports = {
  getPreferencesListOfUser,
  findNewsArticle,
  getNewsListBasedOnPreference,
  getReadOrFavoritesNews,
  getUserByUserId,
};
