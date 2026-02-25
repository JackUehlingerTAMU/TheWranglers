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

          <label>Parent First Name *</label>
          <input placeholder="First Name..." />

          <label>Parent Last Name *</label>
          <input placeholder="Last Name..." />

          <label>License Plate Number *</label>
          <input placeholder="Plate Number..." />

          <label>License Plate State *</label>
          <select>
            <option value="">Select State...</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>

          <label>Email (Gmail) *</label>
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

              <label>Student First Name *</label>
              <input placeholder="First Name..." />

              <label>Student Middle Name</label>
              <input placeholder="Middle Name..." />

              <label>Student Last Name *</label>
              <input placeholder="Last Name..." />

              <label>Student Grade *</label>
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