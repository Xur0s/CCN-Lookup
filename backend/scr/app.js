import express from "express";

import cors from "./middleware/cors.js";
import facilityRouter from "./routes/facilityRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import claimsRouter from "./routes/claims.Routes.js";

const app = express();

app.use(cors);
app.use(express.json());

app.use("/nursing-facilities", facilityRouter);
app.use("/claims-quality", claimsRouter);
app.use(errorHandler);

export default app;
