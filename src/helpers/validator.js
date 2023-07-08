const preferencesConstrains = require("./constants");
const usersData = require("../usersData.json");
class Validator {
  constructor() {}
  filterOutValidPreferences(incomingPreferences) {
    if (
      Object.prototype.toString.call(incomingPreferences) != "[object Array]"
    ) {
      return {
        error: true,
        msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
      };
    }
    const filteredPrefenceList = incomingPreferences.filter((preference) => {
      if (preferencesConstrains.includes(preference) == true) {
        return true;
      }
      return false;
    });
    if (filteredPrefenceList.length == 0) {
      return {
        error: true,
        msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
      };
    } else {
      if (incomingPreferences.length == filteredPrefenceList.length) {
        return {
          error: false,
          msg: "preferences has been updated successfully",
          filteredPrefenceList,
        };
      } else {
        return {
          error: false,
          msg: `valid preferences has been filtered out of incoming preference list chosing from ${preferencesConstrains}`,
          filteredPrefenceList,
        };
      }
    }
  }
  getUser(username, { attempt }) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username) == false
    ) {
      return {
        usersData: null,
        isEmailValid: false,
        msg: "email address entered is not valid",
      };
    }
    for (let i = 0; i < usersData.length; i++) {
      if (username == usersData[i].username) {
        return {
          isEmailValid: true,
          userData: usersData[i],
          msg:
            attempt == "logIn"
              ? "user exists, we are good to login "
              : "user already exists, try signing in",
        };
      }
    }
    return {
      isEmailValid: true,
      userData: null,
      msg:
        attempt == "register"
          ? "username not in the database,we are good to register"
          : "username not found, try registering first",
    };
  }
  isNewsArticleUniqueInList(article, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].uniqueId == article.uniqueId) {
        return false;
      }
    }
    return true;
  }
}

module.exports = { Validator };
