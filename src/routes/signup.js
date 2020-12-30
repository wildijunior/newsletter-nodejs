import Router from "express";
import signupController from "../controllers/signup.js";
import angelasController from '../controllers/angela.js'

const routes = Router();

routes.get("/", signupController.getSignup);
// routes.post("/", signupController.postSignup);
routes.post("/", angelasController.postClient);

routes.get("/lists", signupController.getList);





export default routes;
