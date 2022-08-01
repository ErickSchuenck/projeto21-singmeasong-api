import { Request, Response } from "express";
import { testsService } from "../services/testServices.js";

async function reset(req: Request, res: Response) {
  await testsService.truncate();
  console.log("Database truncated");
  res.sendStatus(200);
}

export default {
  reset,
};