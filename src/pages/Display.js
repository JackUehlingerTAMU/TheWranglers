import "../App.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Display() {
  const API_BASE = "https://wranglers-capstone.onrender.com";

  const [stations, setStations] = useState([]);
  const [screenState, setScreenState] = useState("scanning");
  const [displayText, setDisplayText] = useState("Scanning QR Code");

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
        setScreenState("scanning");
        setDisplayText("Scanning QR Code");
        return;
      }

      // Grey screen state
      if (result.includes("Please Scan QR Code")) {
        setScreenState("scanning");
        setDisplayText("Scanning QR Code");
        return;
      }

      // Green screen state
      if (result.includes("Please Pull Forward To")) {
        const match = result.match(/To\s*(\d+)\s*Station/i);

        if (match) {
          const stationNumber = Number(match[1]);
          const matchedStation = stations.find((s) => s.id === stationNumber);
          const stationColor = matchedStation?.color || `Station ${stationNumber}`;

          setScreenState("success");
          setDisplayText(`Go to station ${stationColor}`);
          return;
        }
      }

      // fallback
      setScreenState("scanning");
      setDisplayText("Scanning QR Code");
    } catch (error) {
      console.error("Display fetch error:", error);
      setScreenState("scanning");
      setDisplayText("Scanning QR Code");
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  useEffect(() => {
    if (stations.length === 0) return;

    fetchDisplayStatus();
    const interval = setInterval(fetchDisplayStatus, 5000);

    return () => clearInterval(interval);
  }, [stations]);

  const backgroundColor = screenState === "success" ? "#2e7d32" : "#808080";

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
      <h1
        style={{
          color: "white",
          fontSize: "clamp(2rem, 6vw, 5rem)",
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {displayText}
      </h1>
    </div>
  );
}