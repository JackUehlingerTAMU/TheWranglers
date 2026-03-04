import React, { useEffect, useMemo, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function KidsPickup() {
  const navigate = useNavigate();

  const COLOR_OPTIONS = useMemo(
    () => [
      "Red", "Orange", "Yellow", "Green", "Blue", "Purple",
      "Pink", "Peach", "Mint", "Teal", "Lavender", "Coral",
      "Sky", "Lime", "Rose",
    ],
    []
  );

  const COLOR_HEX = useMemo(
    () => ({
      Red: "#e6b3b3",
      Orange: "#f5d1a8",
      Yellow: "#f7e7a9",
      Green: "#cfe3c4",
      Blue: "#c7d7ef",
      Purple: "#d7cde8",
      Pink: "#f6c1d1",
      Peach: "#f8d5c4",
      Mint: "#d6f0e0",
      Teal: "#c9e6e3",
      Lavender: "#e2d9f3",
      Coral: "#f7c6b9",
      Sky: "#d6e9f8",
      Lime: "#e6f4c7",
      Rose: "#f4c7cf",
    }),
    []
  );

  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchStations = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("stations")
      .select("id,color")
      .order("id", { ascending: true });

    if (error) {
      console.error("Fetch stations error:", error);
      setErrorMsg(error.message);
      setStations([]);
      setLoading(false);
      return;
    }

    setStations(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const usedColors = useMemo(() => new Set(stations.map((s) => s.color)), [stations]);
  const availableColors = useMemo(
    () => COLOR_OPTIONS.filter((c) => !usedColors.has(c)),
    [COLOR_OPTIONS, usedColors]
  );

  const handleAddStation = async () => {
    setErrorMsg("");

    if (!selectedColor) {
      setErrorMsg("Please select a color first.");
      return;
    }

    if (usedColors.has(selectedColor)) {
      setErrorMsg("That color is already used.");
      return;
    }

    const { error } = await supabase
      .from("stations")
      .insert([{ color: selectedColor }]);

    if (error) {
      console.error("Add station error:", error);
      setErrorMsg(error.message);
      return;
    }

    setSelectedColor("");
    fetchStations();
  };

  const handleRemoveStation = async (station) => {
    setErrorMsg("");

    // never remove the first station (your Red)
    if (station.id === 1 || station.color === "Red") return;

    const { error } = await supabase
      .from("stations")
      .delete()
      .eq("id", station.id);

    if (error) {
      console.error("Remove station error:", error);
      setErrorMsg(error.message);
      return;
    }

    fetchStations();
  };

  return (
    <div className="kids-pickup">
      <h1 className="portal-title">Kids Module Screen</h1>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>

      {/* ✅ Add Station UI (this is what you said you don’t see) */}
      <div className="station-controls">
        <div className="station-controls-left">
          <label className="station-label">Add Station:</label>

          <div className="station-picker">
            <span
              className="station-swatch"
              style={{
                backgroundColor: selectedColor
                  ? COLOR_HEX[selectedColor]
                  : "rgba(255,255,255,0.15)",
              }}
            />
            <select
              className="station-select"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Select Color...</option>
              {availableColors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="main-btn station-add-btn"
            onClick={handleAddStation}
            disabled={availableColors.length === 0}
          >
            Add Station
          </button>
        </div>

        {errorMsg && <p className="station-error">{errorMsg}</p>}
      </div>

      <div className="kids-layout">
        <div className="modules-grid">
          {loading ? (
            <p>Loading stations...</p>
          ) : (
            stations.map((station) => {
              const color = station.color || "Red";
              const colorClass = String(color).toLowerCase();

              return (
                <div key={station.id} className={`module-card ${colorClass}`}>
                  <div className="card-content">
                    <div className="station-card-header">
                      <h2>{color}</h2>

                      {station.id !== 1 && color !== "Red" && (
                        <button
                          type="button"
                          className="remove-station"
                          onClick={() => handleRemoveStation(station)}
                          title="Remove station"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <table className="module-table">
                      <tbody>
                        {["1", "2", "3", "4"].map((row) => (
                          <tr key={row}>
                            <td className="row-number">{row}</td>
                            <td className="kid-cell">Jane Doe</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="up-next">
          <h2>Up NEXT:</h2>
          <table className="up-next-table">
            <tbody>
              {stations.map((station) => {
                const color = station.color || "Red";
                const colorClass = String(color).toLowerCase();
                return (
                  <tr key={station.id}>
                    <td className={`color-cell ${colorClass}`}>{color}</td>
                    <td className="kid-cell">—</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default KidsPickup;