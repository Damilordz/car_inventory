import React from "react";

const CarTable = ({ cars, onEdit, onDelete }) => {
  return (
    <table className="table" striped bordered hover>
      <thead>
        <tr>
          <th>Owner</th>
          <th>Car</th>
          <th>Year</th>
          <th>Registration Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car._id}>
            <td>{car.owner}</td>
            <td>{car.make} {car.model}</td>
            <td>{car.year}</td>
            <td>{car.registrationNumber}</td>
            <td>
              <button
                onClick={() => onEdit(car)}
                className="btn btn-info"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(car._id)}
                className="btn btn-danger mx-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
