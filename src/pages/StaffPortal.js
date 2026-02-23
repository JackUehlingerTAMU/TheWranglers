import React from "react";
import "../App.css";

function StaffPortal() {
  return (
    <div className="staff-portal">
      
      <h1 className="portal-title">Staff Portal</h1>

      {/* Top Navigation Buttons */}
      <div className="portal-top-bar">
        <div className="left-buttons">
          <button className="main-btn">Kids Pickup Screen</button>
          <button className="main-btn">Station Screen</button>
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