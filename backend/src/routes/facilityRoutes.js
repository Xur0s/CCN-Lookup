import express from "express";
import requestFacilityData from "../controllers/facilityController.js";

const facilityRouter = express.Router();

facilityRouter.get("/:ccn", requestFacilityData);

export default facilityRouter;
