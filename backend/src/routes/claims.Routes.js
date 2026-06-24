import express from "express";
import requestClaimsData from "../controllers/claimsController.js";

const claimsRouter = express.Router();

claimsRouter.get("/:ccn", requestClaimsData);

export default claimsRouter;
