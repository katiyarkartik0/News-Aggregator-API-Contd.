const express = require("express");
const {
  getPreference,
  updatePreference,
} = require("../controllers/preference.js");
const preferenceRoutes = express.Router();
const bodyParser = require("body-parser");

preferenceRoutes.use(bodyParser.urlencoded({ extended: false }));
preferenceRoutes.use(bodyParser.json());

preferenceRoutes.get("/",getPreference);
preferenceRoutes.put("/",updatePreference);

module.exports = preferenceRoutes;
