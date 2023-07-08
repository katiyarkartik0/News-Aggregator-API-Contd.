const express = require("express");
const loginRoutes = express.Router();
const bodyParser = require("body-parser");
const { logInUser } = require("../../controllers/auth/login");

loginRoutes.use(bodyParser.urlencoded({ extended: false }));
loginRoutes.use(bodyParser.json());

loginRoutes.post("/", logInUser);

module.exports = { loginRoutes };
