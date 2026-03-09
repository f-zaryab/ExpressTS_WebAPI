import express from "express";
import type { Router } from "express";
import { getPets, getPetById } from "../controllers/pets.controller.ts";
import {
  validateNumericId,
  pleaseAuth,
} from "../middleware/pets.middleware.ts";
import exitMiddleware from "../middleware/petsExit.middleware.ts";

const petRouter: Router = express.Router();

petRouter.get("/", getPets);

petRouter.get(
  "/:id",
  validateNumericId,
  pleaseAuth,
  exitMiddleware,
  getPetById,
);

export default petRouter;
