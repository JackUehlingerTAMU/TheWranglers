import React from "react";
import "./App.css";
import {Routes,Route} from  "react-router-dom"
import ParentPortal from "./pages/ParentPortal";
import Home from "./pages/Home"

function App() {
  return ( <>
      {/* Moved login page code to Home.js so that Routes would work correctly */}
      {/* ROUTES */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parent-portal" element={<ParentPortal/>}/>
      </Routes>
    </>
    
  );
}

export default App;


