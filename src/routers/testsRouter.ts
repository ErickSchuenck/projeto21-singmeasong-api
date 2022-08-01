import { Router } from "express";
import testsController from "../controllers/testController.js";

const testsRouter = Router();

testsRouter.post("/reset", testsController.reset);
testsRouter.post("/seed", testsController.seed);

export default testsRouter;