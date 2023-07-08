const uuid = require("uuid");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const { Validator } = require("../../helpers/validator");
const usersData = require("../../usersData.json");

const registerUser = (req, res) => {
  const { username, password } = req.body;
  const validator = new Validator();
  const { userData, msg,isEmailValid } = validator.getUser(username, {
    attempt: "register",
  });
  if (!isEmailValid || userData) {
    return res.status(400).send(msg);
  }
  const uniqueID = uuid.v4();
  const user = {
    userId: uniqueID,
    username,
    password: bcrypt.hashSync(password.toString(), 4),
    preferences: [],
    read: [],
    favorites: [],
    newsArticlesCacheDate: new Date(),
  };
  if (process.env.NODE_ENV != "test") {
    const writePath = path.join(__dirname, "..", "..", "usersData.json");
    fs.writeFileSync(writePath, JSON.stringify([...usersData, user]), {
      encoding: "utf-8",
      flag: "w",
    });
  }

  return res.status(200).send("user created successfully");
};

module.exports = { registerUser };
