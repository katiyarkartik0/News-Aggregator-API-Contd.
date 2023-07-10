const path = require("path");
const fs = require("fs");
const { getUserByUserId } = require("./helpersFunctions");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });
const usersData = require("../usersData.json");

function generateUniqueCode(inputString) {
  // Generate a hash code based on the input string
  let hash = 0;
  if (inputString.length > 0) {
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
  }

  const uniqueCode = `${hash.toString(36)}`;

  return uniqueCode;
}

const getNewsByCategory = async (category) => {
  let newsList = [];
  try {
    const news = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.API_KEY}`,
      {
        method: "GET",
      }
    );
    const resp = await news.json();
    const articles = resp.articles;
    newsList = articles.map((article) => {
      const { title } = article;
      return { ...article, uniqueId: generateUniqueCode(title) };
    });
  } catch (err) {
    console.log(err);
    return {};
  }

  return newsList;
};

const fetchNews = async (userId) => {
  const { user, error, msg } = getUserByUserId(userId);
  if (error) {
    throw new Error(msg);
  }
  if (process.env.NODE_ENV != "test") {
    const entertainmentNews = await getNewsByCategory("entertainment");
    const businessNews = await getNewsByCategory("business");
    const healthNews = await getNewsByCategory("health");
    const scienceNews = await getNewsByCategory("science");
    const sportsNews = await getNewsByCategory("sports");
    const technologyNews = await getNewsByCategory("technology");

    const updatedNewsJSON = [
      { category: "health", data: healthNews },
      { category: "business", data: businessNews },
      { category: "entertainment", data: entertainmentNews },
      { category: "science", data: scienceNews },
      { category: "sports", data: sportsNews },
      { category: "technology", data: technologyNews },
    ];
    const writePathNews = path.join(__dirname, "..", "news.json");
    fs.writeFileSync(writePathNews, JSON.stringify(updatedNewsJSON), {
      encoding: "utf-8",
      flag: "w",
    });

    user.newsArticlesCacheDate = new Date();

    const updatedUserData = usersData.map((currUser) => {
      if (currUser.userId == userId) {
        return user;
      }
      return currUser;
    });
    const writePathUsers = path.join(__dirname, "..", "usersData.json");
    fs.writeFileSync(writePathUsers, JSON.stringify(updatedUserData), {
      encoding: "utf-8",
      flag: "w",
    });
  }
};

module.exports = { fetchNews };
