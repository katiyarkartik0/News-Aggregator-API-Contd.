const express = require("express");
const registerRoutes = express.Router();
const bodyParser = require("body-parser");
const { registerUser } = require("../../controllers/auth/register");


registerRoutes.use(bodyParser.urlencoded({ extended: false }));
registerRoutes.use(bodyParser.json());

registerRoutes.post("/",registerUser);

module.exports = {registerRoutes};