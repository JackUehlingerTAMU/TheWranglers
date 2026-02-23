import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function KidsPickup() {
  const navigate = useNavigate();
  return (
    <div className="kids-pickup">

      <h1 className="portal-title">Kids Module Screen</h1>

        <button className="back-btn" onClick={() => navigate(-1)}>
            Back
        </button>

      <div className="kids-layout">

        {/* Left Color Modules */}
        <div className="modules-grid">
        {["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].map((color) => (
            <div key={color} className={`module-card ${color.toLowerCase()}`}>
            <div className="card-content">
                <h2>{color}</h2>

                <table className="module-table">
                <tbody>
                    {['1', '2', '3', '4'].map((row) => (
                    <tr key={row}>
                        <td className="row-number">{row}</td>
                        <td className="kid-cell">Jane Doe</td>
                    </tr>
                    ))}
                </tbody>
                </table>

            </div>
            </div>
        ))}
        </div>

        {/* Right Side Panel */}
        <div className="up-next">
          <h2>Up NEXT:</h2>
            <table className="up-next-table">
            <tbody>
                {["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].map((color) => (
                <tr key={color}>
                    <td className={`color-cell ${color.toLowerCase()}`}>{color}</td>
                    <td className="kid-cell">—</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

      </div>
    </div>
  );
}

export default KidsPickup;