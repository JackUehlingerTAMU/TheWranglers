import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PickupStation() {
  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [kidsData, setKidsData] = useState({});

  const defaultKidsForColor = (color) => [
    `${color} Kid 1`,
    `${color} Kid 2`,
    `${color} Kid 3`,
    `${color} Kid 4`,
  ];

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

    const list = data || [];
    setStations(list);

    // pick first station by default (should be Red id=1)
    if (list.length > 0) {
      setSelectedStation((prev) => prev ?? list[0]);

      // ensure kidsData has entries for each station color
      setKidsData((prev) => {
        const copy = { ...prev };
        for (const s of list) {
          if (!copy[s.color]) copy[s.color] = defaultKidsForColor(s.color);
        }
        return copy;
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedColor = selectedStation?.color || "";
  const selectedKids = kidsData[selectedColor] || [];

  const handlePickup = (index) => {
    if (!selectedColor) return;

    setKidsData((prev) => {
      const updated = { ...prev };
      updated[selectedColor] = (updated[selectedColor] || []).filter((_, i) => i !== index);
      return updated;
    });
  };

  return (
    <div className="pickup-station">
      <h1 className="portal-title">Pickup Station</h1>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="color-select">Select Color:</label>

        <select
          id="color-select"
          className="dropdown"
          value={selectedStation?.id ?? ""}
          onChange={(e) => {
            const id = Number(e.target.value);
            const found = stations.find((s) => s.id === id);
            setSelectedStation(found || null);
          }}
          disabled={loading || stations.length === 0}
        >
          {loading && <option value="">Loading...</option>}
          {!loading && stations.length === 0 && <option value="">No stations found</option>}
          {!loading &&
            stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.color}
              </option>
            ))}
        </select>
      </div>

      {errorMsg && <p className="station-error">{errorMsg}</p>}

      {/* Card */}
      <div className="kids-layout">
        <div className="modules-grid">
          {selectedColor ? (
            <div className={`module-card ${selectedColor.toLowerCase()}`}>
              <div className="card-content">
                <h2>{selectedColor}</h2>

                <table className="module-table">
                  <tbody>
                    {selectedKids.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          No kids currently
                        </td>
                      </tr>
                    ) : (
                      selectedKids.map((kid, index) => (
                        <tr key={index}>
                          <td className="row-number">{index + 1}</td>
                          <td className="kid-cell">{kid}</td>
                          <td style={{ width: 60, textAlign: "center" }}>
                            <button className="pickup-btn" onClick={() => handlePickup(index)}>
                              ✅
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p style={{ color: "white" }}>Select a station to view kids.</p>
          )}
        </div>
      </div>
    </div>
  );
}