// carInventory.js

// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import CarForm from "../components/CarForm";
import CarTable from "../components/CarTable";
import { Spinner, Alert } from "react-bootstrap";

// CarInventory component
const CarInventory = () => {
  // State variables for managing cars and new car data
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    registrationNumber: "",
    owner: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(""); // State for managing fetch errors

  // Function to fetch the welcome message
  const fetchWelcomeMessage = async () => {
    try {
      const response = await axios.get(
        "https://car-inventory-api.vercel.app/welcome"
      );
      console.log(response.data); // Should log "Welcome to backend"
    } catch (error) {
      console.error("Error fetching welcome message:", error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchWelcomeMessage(); // Fetch the welcome message when the component mounts
  }, []);

  // Function to fetch cars
  const fetchCars = async () => {
    try {
      const response = await axios.get("/cars"); // Send a GET request to retrieve all cars
      if (response.data.length === 0) {
        // Check if the response data is empty
        setFetchError("No cars available in the inventory."); // Set the no cars message
        setCars([]); // Ensure cars state is empty
      } else {
        setCars(response.data); // Update the cars state with the fetched data
        setFetchError(""); // Clear any previous error messages
      }
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching cars:", error);
      setFetchError("Unable to fetch car details. Please try again later."); // Set the error message
      setLoading(false); // Set loading to false even if an error occurs
    }
  };

  const fetchOldCars = async () => {
    try {
      const response = await axios.get("/cars/old"); // Send a GET request to retrieve cars older than 5 years
      setCars(response.data); // Update the cars state with the fetched data
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching old cars:", error);
      setFetchError("Unable to fetch old car details. Please try again later.");
      setLoading(false); // Set loading to false even if an error occurs
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  // Function to add a new car
  const addCar = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Make a POST request to add a new car
      await axios.post("/cars", newCar);
      // Reset the new car data and fetch updated car list
      setNewCar({
        make: "",
        model: "",
        year: "",
        registrationNumber: "",
        owner: "",
        address: "",
      });
      fetchCars(); // Fetch the updated list of cars
      setAlertVariant("success"); // Set variant to success for add action
      // Show success message to the user
      setAlertMessage("Car details added successfully!");
      setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
    } catch (error) {
      console.error("Error adding car:", error); // Log any errors that occur during the add operation
    }
  };

  // Function to edit car
  const editCar = (car) => {
    setIsEditing(true); // Set editing mode to true
    setEditingCarId(car._id); // Store the ID of the car being edited
    setNewCar(car); // Set the newCar state with the car data being edited
  };

  // Function to update car
  const updateCar = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await axios.put(`/cars/${editingCarId}`, newCar); // Send a PUT request to update the car
      setIsEditing(false); // Set editing mode to false
      setEditingCarId(null); // Reset the editingCarId state
      // Reset the newCar state
      setNewCar({
        make: "",
        model: "",
        year: "",
        registrationNumber: "",
        owner: "",
        address: "",
      });
      fetchCars(); // Fetch the updated list of cars
      setAlertVariant("success"); // Set variant to success for add action
      setAlertMessage("Car details updated successfully!");
      setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
    } catch (error) {
      console.error("Error updating car:", error); // Log any errors that occur during the update operation
    }
  };

  // Function to delete car
  const deleteCar = async (carId) => {
    try {
      await axios.delete(`/cars/${carId}`); // Send a DELETE request to delete the car
      fetchCars(); // Fetch the updated list of cars
      setAlertVariant("danger"); // Set variant to danger for delete action
      setAlertMessage("Car deleted successfully!");
      setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
    } catch (error) {
      console.error("Error deleting car:", error); // Log any errors that occur during the delete operation
    }
  };

  // Function to handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setEditingCarId(null);
    setNewCar({
      make: "",
      model: "",
      year: "",
      registrationNumber: "",
      owner: "",
      address: "",
    });
  };

  return (
    <div className="container my-5 car-inventory">
      <h1 className="mb-4">Car Inventory</h1>
      {alertMessage && (
        <Alert
          variant={alertVariant}
          onClose={() => setAlertMessage("")}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}

      <div className="car-form mb-4">
        <CarForm
          handleInputChange={handleInputChange}
          handleSubmit={isEditing ? updateCar : addCar} // Conditionally call addCar or updateCar based on editing mode
          make={newCar.make}
          model={newCar.model}
          year={newCar.year}
          registrationNumber={newCar.registrationNumber}
          owner={newCar.owner}
          address={newCar.address}
          isEditing={isEditing}
          handleCancel={handleCancel}
        />
      </div>

      <button onClick={fetchOldCars} className="btn btn-secondary mb-4">
        Show Cars Older Than 5 Years
      </button>

      {loading ? (
        <div className="mt-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : fetchError === "No cars available in the inventory." ? (
        <div className="mt-4">
          <Alert variant="info">{fetchError}</Alert>
        </div>
      ) : fetchError ? (
        <div className="mt-4">
          <Alert variant="danger">{fetchError}</Alert>
        </div>
      ) : (
        <CarTable cars={cars} onEdit={editCar} onDelete={deleteCar} />
      )}
    </div>
  );
};

export default CarInventory;
