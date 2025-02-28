// Import necessary packages
import express from "express"; // Express framework for handling HTTP requests
import mongoose from "mongoose"; // MongoDB ODM (Object Data Modeling) library
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (CORS)
import dotenv from "dotenv"; // Loads environment variables from a .env file
import helmet from "helmet"; // Security middleware to set HTTP headers
import morgan from "morgan"; // HTTP request logger middleware
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis } from "./data/data.js";
import path from "path";

/* CONFIGURATIONS */
dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize an Express application

app.use(express.json()); // Middleware to parse incoming JSON request bodies (no need for bodyParser)

app.use(helmet()); // Apply security-related HTTP headers

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Adjusts the Cross-Origin Resource Policy (CORP) to allow resources to be loaded from different origins

app.use(morgan("common"));
// Logs HTTP requests in a standard format ("common" logs basic request info like method, URL, status code)

app.use(cors());
// Enables CORS to allow requests from different origins (useful for frontend-backend communication)

const __dirname = path.resolve();

{
  /* ROUTES */
}
app.use("/kpi", kpiRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

/* MONGOOSE SETUP*/

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    {
      /* ADD DATA ONE TIME ONLY OR AS NEEDED*/
    }
    // drop databse in development mode
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
  })
  .catch((error) => console.log(`${error} did not connect`));
