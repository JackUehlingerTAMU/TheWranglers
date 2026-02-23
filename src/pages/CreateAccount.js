import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();
  return (
    <div className="create-account">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}  // go back
      >
        Back
      </button>
      <h1>Account Creation</h1>

      <div className="form-container">

        {/* Parent Info */}
        <div className="form-column">
          <h2>Parent Information</h2>

          <label>Parent First Name</label>
          <input placeholder="First Name..." />

          <label>Parent Last Name</label>
          <input placeholder="Last Name..." />

          <label>License Plate Number</label>
          <input placeholder="Plate Number..." />

          <label>License Plate State</label>
          <input placeholder="Plate State..." />
        </div>

        {/* Student Info */}
        <div className="form-column">
          <h2>Student Information</h2>

          <label>Student First Name</label>
          <input placeholder="First Name..." />

          <label>Student Middle Name</label>
          <input placeholder="Middle Name..." />

          <label>Student Last Name</label>
          <input placeholder="Last Name..." />

          <button className="add-student">Add Another Student</button>
        </div>

      </div>

      <button className="submit-btn">Submit For Approval</button>
    </div>
  );
}

export default CreateAccount;