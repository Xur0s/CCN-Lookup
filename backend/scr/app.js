import express from "express";

import cors from "./middleware/cors.js";
import facilityRouter from "./routes/facilityRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors);
app.use(express.json());

app.use("/nursing-facilities", facilityRouter);
app.use(errorHandler);

export default app;
