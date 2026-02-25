import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function StaffPortal() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Jane Doe",
      grade: "5",
      parents: "John Doe",
      licensePlate: "TX ABC 1234",
      status: "Approved",
    },
    {
      id: 2,
      name: "John Child",
      grade: "3",
      parents: "Mary Child",
      licensePlate: "TX XYZ 6789",
      status: "Pending",
    },
  ]);

  const getVolunteerCode = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("volunteerCodeData");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        return parsed.code;
      }
    }

    const newCode = Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem(
      "volunteerCodeData",
      JSON.stringify({ code: newCode, date: today })
    );

    return newCode;
  };

  const volunteerCode = getVolunteerCode();

  const handleEdit = (id) => {
    console.log(`Edit student with ID: ${id}`);
    // Add edit functionality here
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="staff-portal">
      
      {/* Volunteer Code Box */}
      <div className="volunteer-code-box">
        Volunteer Code: <strong>{volunteerCode}</strong>
      </div>

      <h1 className="portal-title">Staff Portal</h1>

      <div className="portal-top-bar">
        <div className="left-buttons">
          <button className="main-btn" onClick={() => navigate("/kids-pickup")}>
            Kids Pickup
          </button>
          <button className="main-btn" onClick={() => navigate("/pickup-station")}>
            Station Screen
          </button>
        </div>

        <button className="main-btn logout-btn">Logout</button>
      </div>

        <div className="child-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Parent(s)</th>
              <th>Parent License Plate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.parents}</td>
                <td>{student.licensePlate}</td>
                <td>{student.status}</td>
                <td>
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEdit(student.id)}
                  >
                    ✏
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(student.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffPortal;