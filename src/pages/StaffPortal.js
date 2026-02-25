import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function StaffPortal() {
  const navigate = useNavigate();

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
          <button className="main-btn">Station Screen</button>
        </div>

        <button className="main-btn logout-btn">Logout</button>
      </div>

      <div className="table-placeholder">
        <p>Table content will go here...</p>
      </div>

    </div>
  );
}

export default StaffPortal;