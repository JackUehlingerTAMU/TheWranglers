import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([{}]);

  const addStudent = () => {
    setStudents([...students, {}]);
  };

  const removeStudent = (indexToRemove) => {
    setStudents(students.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="create-account">
      <button className="back-btn" onClick={() => navigate(-1)}>
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

          <label>Email (Gmail)</label>
          <input placeholder="...@gmail.com" />
        </div>

        {/* Student Info */}
        <div className="form-column">
          <h2>Student Information</h2>

          {students.map((_, index) => (
            <div key={index} className="student-block">

              <div className="student-header">
                <h3>Student {index + 1}</h3>
                {index !== 0 && (
                  <button
                    className="remove-student"
                    onClick={() => removeStudent(index)}
                  >
                    ✕
                  </button>
                )}
              </div>

              <label>Student First Name</label>
              <input placeholder="First Name..." />

              <label>Student Middle Name</label>
              <input placeholder="Middle Name..." />

              <label>Student Last Name</label>
              <input placeholder="Last Name..." />

              <label>Student Grade</label>
              <input placeholder="Grade..." />
            </div>
          ))}

          <button className="add-student" onClick={addStudent}>
            Add Another Student
          </button>
        </div>

      </div>

      <input className="submit-btn" type="submit" value="Submit to School" />
    </div>
  );
}

export default CreateAccount;