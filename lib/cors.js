import Cors from "cors";
import initMiddleware from "./init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["POST", "OPTIONS"],
    origin: "https://shellofyou.framer.website",
    credentials: true,
  })
);

export default cors;
