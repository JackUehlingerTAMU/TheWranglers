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
      // setKidsData((prev) => {
      //   const copy = { ...prev };
      //   for (const s of list) {
      //     // if (!copy[s.color]) copy[s.color] = defaultKidsForColor(s.color);
      //   }
      //   return copy;
      // });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


///////////////////////////// TESTING STUDENT PICKUP SERVER CONNECTION ///////////



  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://192.168.60.128:25565/data');
        const response = await fetch('http://10.245.249.15:3000/data');
        const result = await response.json();
        setData(result);
        // setData(result);
        
        
        console.log(result);

        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Refresh
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);


// const [returnedData, setReturnedData] = useState(null);

// useEffect(() => {
//   const fetchPlateData = async () => {
//     try {
//       const response = await fetch('http://10.245.249.15:3000/plate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           license_plate: 'ABC123',
//           plate_state: 'TX',
//         }),
//       });

//       const result = await response.json();

//       setReturnedData(result);

//       console.log('Returned plate data:', result);
//     } catch (error) {
//       console.error('Error fetching plate data:', error);
//     }
//   };

//   fetchPlateData();

//   const interval = setInterval(fetchPlateData, 2000);

//   return () => clearInterval(interval);
// }, []);

///////////////////////////////////////////////////////////////////////////

const sendTestData = async () => {
  try {
    const response = await fetch('http://10.245.249.15:3000/data', {
    // const response = await fetch('http://10.247.252.228:25565/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        parent: 'Jane Doe',
      }),
    });

    const text = await response.text();
    console.log(text);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};




  const selectedColor = selectedStation?.color || "";
  const selectedKids = kidsData[selectedColor] || [];
  // const selectedKids =  [data.name] || [];

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
      <button onClick={sendTestData}>Send Test Data</button>

      {/* //////////////////////////////// */}
    {data.length === 0 ? (
  <p>No students yet</p>
) : (
  data.map((student, index) => (
    <div key={index} style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}>
      <p>Name: {student.name}</p>
      <p>Parent: {student.parent}</p>
    </div>
  ))
)}

{/* {returnedData === null ? (
  <p>No returned plate data yet</p>
) : returnedData.error ? (
  <p>{returnedData.error}</p>
) : (
  <div style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}>
    <p>Station: {returnedData.station}</p>
    <p>Plate: {returnedData.license_plate}</p>
    <p>State: {returnedData.plate_state}</p>

    <h4>Students:</h4>
    {returnedData.students.map((student, index) => (
      <div key={index} style={{ marginLeft: 10 }}>
        <p>Name: {student.name}</p>
        <p>Parent: {student.parent}</p>
      </div>
    ))}
  </div>
)} */}



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
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          No kids currently
                        </td>
                      </tr>
                    ) : (
                      data.map((kid, index) => (
                        <tr key={index}>
                          <td className="row-number">{index + 1}</td>
                          <td className="kid-cell">{kid.name}</td>
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