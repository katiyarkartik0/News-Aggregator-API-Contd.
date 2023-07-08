const path = require("path");
const fs = require("fs");

const { Validator } = require("../helpers/validator");
const { getPreferencesListOfUser } = require("../helpers/helpersFunctions");
const usersData = require("../usersData.json");

const getPreference = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  const { preferencesList, error, msg } = getPreferencesListOfUser(userId);
  if (error) {
    return res.status(500).send(msg);
  }
  return res.status(200).send(preferencesList);
};

const updatePreference = (req, res) => {
  if (req.verified == false) {
    return res.status(403).send(req.msg);
  }

  const userId = req.id;
  console.log(userId);

  const { preferences: incomingPreferences } = req.body;
  const validator = new Validator();
  const filteredPrefence =
    validator.filterOutValidPreferences(incomingPreferences);

  const { error, msg, filteredPrefenceList } = filteredPrefence;

  if (error) {
    return res.status(400).send(msg);
  }

  const updatedUserData = usersData.map((user) => {
    if (user.userId == userId) {
      const updatedUserData = { ...user, preferences: filteredPrefenceList };
      return updatedUserData;
    }
    return user;
  });
  const writePath = path.join(__dirname, "..", "usersData.json");
  fs.writeFileSync(writePath, JSON.stringify(updatedUserData), {
    encoding: "utf-8",
    flag: "w",
  });

  res.status(200).send(msg);
};

module.exports = { getPreference, updatePreference };
