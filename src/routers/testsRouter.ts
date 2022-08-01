import { Router } from "express";
import testsController from "../controllers/testController.js";

const testsRouter = Router();

testsRouter.post("/reset", testsController.reset);

export default testsRouter;