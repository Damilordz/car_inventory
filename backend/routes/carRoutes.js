import { Router } from "express";
import * as carController from "../controllers/carController.js";

const router = Router();

// POST request to add a new car
router.post('/cars', carController.addCar);

// PUT request to update a single car
router.put('/cars/:id', carController.updateCar);

// PUT request to update multiple cars
router.put('/cars', carController.updateCars);

// DELETE request to delete a specific car
router.delete('/cars/:id', carController.deleteCar);

// GET request to list all cars
router.get('/cars', carController.listCars);

// GET request to list cars older than 5 years
router.get('/cars/old', carController.listOldCars);

export default router;