import Car from "../models/Car.js";

// Add a new car
export const addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body); // Create a new Car instance using the request body
    await newCar.save(); // Save the new car to the database
    res.status(201).send(newCar); // Send the saved car as the response with a 201 Created status
  } catch (err) {
    res.status(400).send(err); // If there's an error, send a 400 Bad Request status with the error
  }
};

// Update a single car
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find the car by ID and update it with the request body, returning the updated document
    if (!updatedCar) return res.status(404).send(); // If the car is not found, send a 404 Not Found status
    res.send(updatedCar); // Send the updated car as the response
  } catch (err) {
    res.status(400).send(err); // If there's an error, send a 400 Bad Request status with the error
  }
};

// Update multiple cars
export const updateCars = async (req, res) => {
  try {
    const { ids, update } = req.body; // Destructure the ids and update properties from the request body
    const result = await Car.updateMany({ _id: { $in: ids } }, update); // Update multiple cars based on the provided ids and update object
    res.send(result); // Send the result of the updateMany operation as the response
  } catch (err) {
    res.status(400).send(err); // If there's an error, send a 400 Bad Request status with the error
  }
};

// Delete a specific car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id); // Find the car by ID and delete it
    if (!car) return res.status(404).send(); // If the car is not found, send a 404 Not Found status
    res.send(car); // Send the deleted car as the response
  } catch (err) {
    res.status(400).send(err); // If there's an error, send a 400 Bad Request status with the error
  }
};

// List all cars
export const listCars = async (req, res) => {
  try {
    const cars = await Car.find(); // Find all cars in the database
    res.send(cars); // Send the list of cars as the response
  } catch (err) {
    res.status(400).send(err); // If there's an error, send a 400 Bad Request status with the error
  }
};

// List cars older than 5 years
export const listOldCars = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // Get the current year
    const oldCars = await Car.find({ year: { $lt: currentYear - 5 } }, 'make model registrationNumber owner'); // Find cars where the year is less than 5 years ago
    res.send(oldCars); // Send the list of old cars as the response
  } catch (err) {
    res.status(400).send(err); // If there's an error, send a 400 Bad Request status with the error
  }
};