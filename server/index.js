// Import necessary packages
import express from "express"; // Express framework for handling HTTP requests
import mongoose from "mongoose"; // MongoDB ODM (Object Data Modeling) library
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (CORS)
import dotenv from "dotenv"; // Loads environment variables from a .env file
import helmet from "helmet"; // Security middleware to set HTTP headers
import morgan from "morgan"; // HTTP request logger middleware

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

/* MONGOOSE SETUP*/

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
