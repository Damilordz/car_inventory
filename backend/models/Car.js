// carModel.js

// Import necessary modules
import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define the schema for the Car model
const carSchema = new Schema({
  make: {
    type: String,
    required: true, // Make field is required
  },
  model: {
    type: String,
    required: true, // Model field is required
  },
  address: {
    type: String,
    required: true, // Address field is required
  },
  registrationNumber: {
    type: String,
    required: true, // Registration number field is required
  },
  owner: {
    type: String,
    required: true, // Owner field is required
  },
  year: {
    type: Number,
    required: true, // Year field is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // createdAt field will be set to the current date by default
  },
});

// Create the Car model based on the schema
const Car = model("Car", carSchema);

export default Car;