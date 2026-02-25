import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function StaffPortal() {
  const navigate = useNavigate();
  return (
    <div className="staff-portal">
      
      <h1 className="portal-title">Staff Portal</h1>

      {/* Top Navigation Buttons */}
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

      {/* Blank Table Area */}
      <div className="table-placeholder">
        <p>Table content will go here...</p>
      </div>

    </div>
  );
}

export default StaffPortal;