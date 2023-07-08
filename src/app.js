const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const preferencesRoutes = require("../src/routes/preferences");
const newsRoutes = require("./routes/news");
const { registerRoutes } = require("./routes/auth/register");
const { loginRoutes } = require("./routes/auth/login");
const { verifyToken } = require("./middleware/verifyToken");
const { updateNewsJSON } = require("./middleware/updateNewsArticles");

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;

routes.get("/", (req, res) => {
  res.status(200).send("Welcome to airtribe");
});

routes.use("/register", registerRoutes);
routes.use("/login", loginRoutes);
routes.use("/preferences", [verifyToken, updateNewsJSON], preferencesRoutes);
routes.use("/news", [verifyToken, updateNewsJSON], newsRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log("Server is successfully started");
  } else {
    console.log(err);
  }
});

module.exports = app;