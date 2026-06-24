import app from "./src/app.js";

import dotenv from "dotenv";
import { initializeDataStores } from "./src/services/cmsDataStores.js";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4000;

async function start() {
  await initializeDataStores();

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
