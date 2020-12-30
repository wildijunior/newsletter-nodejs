import path from "path";
import express from "express";
import bodyParser from "body-parser";

import signupRoutes from "../routes/signup.js";
import aboutRoute from "../routes/about.js";

const app = express();

export default () => {
  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.resolve("src/public")));

  app.use(signupRoutes);
  app.use(aboutRoute);

  return app;
};
