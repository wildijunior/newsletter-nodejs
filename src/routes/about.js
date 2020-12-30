import aboutController from "../controllers/about.js";
import Router from "express";

const routes = Router();

 routes.get("/about", aboutController.getAbout);

 export default routes;