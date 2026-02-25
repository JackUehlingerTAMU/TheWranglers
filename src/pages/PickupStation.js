import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PickupStation(){
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState("Red");
    const [kidsData, setKidsData] = useState({
        Red: ["Red Kid 1", "Red Kid 2", "Red Kid 3", "Red Kid 4"],
        Orange: ["Orange Kid 1", "Orange Kid 2", "Orange Kid 3", "Orange Kid 4"],
        Yellow: ["Yellow Kid 1", "Yellow Kid 2", "Yellow Kid 3", "Yellow Kid 4"],
        Green: ["Green Kid 1", "Green Kid 2", "Green Kid 3", "Green Kid 4"],
        Blue: ["Blue Kid 1", "Blue Kid 2", "Blue Kid 3", "Blue Kid 4"],
        Purple: ["Purple Kid 1", "Purple Kid 2", "Purple Kid 3", "Purple Kid 4"],
    });

    const handlePickup = (index) => {
        setKidsData((prevData) => {
            const updatedData = { ...prevData };
            updatedData[selectedColor] = updatedData[selectedColor].filter((_, i) => i !== index);
            return updatedData;
        });
    };

    return(
        <div className="pickup-station">
            <button className="back-btn" onClick={() => navigate(-1)}>
                Back
            </button>
            <div className="dropdown-container">
                <label htmlFor="color-select">Select Color:</label>
                <select
                    id="color-select"
                    className="dropdown"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                >
                    {Object.keys(kidsData).map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
            </div>

            <div className="kids-layout">
                <div className="modules-grid">
                    <div className={`module-card ${selectedColor.toLowerCase()}`}>
                        <div className="card-content">
                            <h2>{selectedColor}</h2>

                            <table className="module-table">
                                <tbody>
                                    {kidsData[selectedColor].map((kid, index) => (
                                        <tr key={index}>
                                            <td className="row-number">{index + 1}</td>
                                            <td className="kid-cell">{kid}</td>
                                            <td>
                                                <button 
                                                    className="pickup-btn" 
                                                    onClick={() => handlePickup(index)}
                                                >
                                                    ✅
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}