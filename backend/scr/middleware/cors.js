import cors from "cors";

const corsOptions = {
  origin: process.env.ORIGIN,
  optionSuccessStatus: 200,
};

export default cors(corsOptions);
