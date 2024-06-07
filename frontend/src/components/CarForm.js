import React from "react";

function CarForm(props) {
  return (
    <form onSubmit={props.handleSubmit} className="form-inline form-details">
      <div className="form-group">
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={props.make}
          onChange={props.handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={props.model}
          onChange={props.handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={props.address}
          onChange={props.handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={props.year}
          onChange={props.handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={props.registrationNumber}
          onChange={props.handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="owner"
          placeholder="Owner"
          value={props.owner}
          onChange={props.handleInputChange}
          className="form-control"
        />
      </div>

      <div>
        <button type="submit" className="btn btn-primary mx-2">
          {props.isEditing ? "Update Car" : "Add Car"}
        </button>

        {/* Cancel button */}
        {props.isEditing && (
          <button
            type="button"
            className="btn btn-warning"
            onClick={props.handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CarForm;
