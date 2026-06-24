import cors from "cors";

const corsOptions = {
  origin: "https://search-nursing-facility-data.vercel.app",
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
