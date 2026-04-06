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
        // const response = await fetch('http://192.168.60.128:3000/data');
        const response = await fetch('http://10.247.252.228:25565/data');
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

///////////////////////////////////////////////////////////////////////////

const sendTestData = async () => {
  try {
    const response = await fetch('http://10.247.252.228:25565/data', {
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

    </div>
  );
}