import React from "react";
import "./App.css";
import {Routes,Route} from  "react-router-dom"
import ParentPortal from "./pages/ParentPortal";
import StaffPortal from "./pages/StaffPortal";
import KidsPickup from "./pages/KidsPickup";
import Home from "./pages/Home"

function App() {
  return ( <>
      {/* Moved login page code to Home.js so that Routes would work correctly */}
      {/* ROUTES */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parent-portal" element={<ParentPortal/>}/>
      <Route path="/staff-portal" element={<StaffPortal/>}/>
      <Route path="/kids-pickup" element={<KidsPickup />} />
      </Routes>
    </>
    
  );
}

export default App;


