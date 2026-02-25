import React from "react";
import "./App.css";
import {Routes,Route} from  "react-router-dom"
import ParentPortal from "./pages/ParentPortal";
import StaffPortal from "./pages/StaffPortal";
import KidsPickup from "./pages/KidsPickup";
import Home from "./pages/Home"
import CreateAccount from "./pages/CreateAccount";
import { useEffect} from "react";
import { supabase } from "./supabaseClient";

function App() {
  // Database check
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*");

      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Data:", data);
      }
    };

    fetchData();
  }, []);

  
  return ( <>
      {/* Moved login page code to Home.js so that Routes would work correctly */}
      {/* ROUTES */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parent-portal" element={<ParentPortal/>}/>
      <Route path="/staff-portal" element={<StaffPortal/>}/>
      <Route path="/kids-pickup" element={<KidsPickup />} />
      <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </>
    
  );
}

export default App;


