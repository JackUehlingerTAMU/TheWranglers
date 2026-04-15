import "../App.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Display() {
  const API_BASE = "https://wranglers-capstone.onrender.com";

  const [stations, setStations] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [screenState, setScreenState] = useState("scanning");
  const [displayText, setDisplayText] = useState("Please Scan QR Code");
  const [successUntil, setSuccessUntil] = useState(0);

  const fetchStations = async () => {
    const { data, error } = await supabase
      .from("stations")
      .select("id,color")
      .order("id", { ascending: true });

    if (error) {
      console.error("Fetch stations error:", error);
      setStations([]);
      return;
    }

    setStations(data || []);
  };

  const fetchDisplayStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/display`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch display status");
      }

      if (typeof result !== "string") {
        if (Date.now() < successUntil) return;
        setScreenState("scanning");
        setDisplayText("Please Scan QR Code");
        setSelectedColor("");
        return;
      }

      // SUCCESS
      if (result.includes("Please Pull Forward To")) {
        const match = result.match(/To\s*(\d+)\s*Station/i);

        if (match) {
          const stationNumber = Number(match[1]);

          // SAME logic as PickupStation
          const fixedStationNumber = ((stationNumber - 1) % stations.length) + 1;

          const stationColor = stations[fixedStationNumber - 1]?.color || "";

          setSelectedColor(stationColor);
          setScreenState("success");

          // hold green screen for 5 seconds
          setSuccessUntil(Date.now() + 5000);
          return;
        }
      }

      // SCANNING
      if (result.includes("Please Scan QR Code")) {
        if (Date.now() < successUntil) return;

        setScreenState("scanning");
        setDisplayText("Please Scan QR Code");
        setSelectedColor("");
        return;
      }

      // fallback
      if (Date.now() < successUntil) return;

      setScreenState("scanning");
      setDisplayText("Please Scan QR Code");
      setSelectedColor("");
    } catch (error) {
      console.error("Display fetch error:", error);

      if (Date.now() < successUntil) return;

      setScreenState("scanning");
      setDisplayText("Please Scan QR Code");
      setSelectedColor("");
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (stations.length === 0) return;

    fetchDisplayStatus();
    const interval = setInterval(fetchDisplayStatus, 1000);

    return () => clearInterval(interval);
  }, [stations, successUntil]);

  const backgroundColor =
    screenState === "success" ? "#2e7d32" : "#808080";

  const isSuccess = screenState === "success";

  const line1 = isSuccess ? "GO TO STATION" : displayText;
  const line2 = isSuccess ? selectedColor?.toUpperCase() : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div>
        <h1
          style={{
            color: "white",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: "bold",
            margin: 0,
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {line1}
        </h1>

        {isSuccess && (
          <h2
            style={{
              color: selectedColor?.toLowerCase() || "white",
              fontSize: "clamp(5rem, 14vw, 12rem)",
              fontWeight: "900",
              margin: 0,
              textTransform: "uppercase",
              textShadow: "0 6px 25px rgba(0,0,0,0.6)",
            }}
          >
            {line2}
          </h2>
        )}
      </div>
    </div>
  );
}