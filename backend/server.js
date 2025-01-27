// server.js

// Import necessary modules
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/carRoutes.js";
import "dotenv/config";

// Create an Express app
const app = express();
const PORT = process.env.PORT || 8000; // Use the PORT environment variable, or fallback to 8000

app.use(
  cors({
    origin: ["https://car-inventory-frontend.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
); // Enable CORS for all routes

app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB connection string
// Get credentials and database name from environment variables
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB_NAME || "car_inventory";

// Construct MongoDB URI using credentials and database name
const uri = `mongodb+srv://${username}:${password}@cluster0.1uz5agr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Mongoose options for compatibility with MongoDB server version
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Connect to MongoDB Atlas cluster
mongoose.connect(uri, clientOptions).then(
  () => {
    console.log("Successfully connected to the database!");
  },
  (err) => {
    console.log("Could not connect to the database..." + err);
  }
);

// Route to send a welcome message
app.get("/welcome", (req, res) => {
  res.send("<h1>Welcome to backend</h1>");
});

app.use("/", router); // Use the carRoutes router for all routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
