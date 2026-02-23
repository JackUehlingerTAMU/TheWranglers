import "../App.css"
import NewChild from "../components/NewChild";
import PlateUpdate from "../components/PlateUpdate";
import { useState } from "react";
import QRcode from "../components/QRcode";

export default function ParentPortal(){
    const [lpClicked, setIslpClicked] = useState(false);
    const [newStudentClicked, setNewStudentClicked] = useState(false);
    const [qrClicked, setQrClicked] = useState(false);

    return(<div className="parent-portal">
        <h1>Parent Name's Students:</h1>
        <div className= "row">
            <div className = "mainSection">
                <h2>My Students:</h2>
                {/* Table of children */}
                <table className="parent-table">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Grade</th>
                        <th>Pickup Status</th>
                        <th>Approved Licence Plate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Student </td>
                        <td>Student Grade</td>
                        <td>Pickup Status</td>
                        <td>Approved LP</td>
                    </tr>
                    <tr>
                        <td>Student </td>
                        <td>Student Grade</td>
                        <td>Pickup Status</td>
                        <td>Approved LP</td>
                    </tr>
                    </tbody>
                </table>

                {/* Update Buttons */}
                <div className = "btn-row">
                    <button className="main-btn" onClick={() => setIslpClicked(!lpClicked)} >Update License Plate</button>
                    <button className="main-btn" onClick={()=>setNewStudentClicked(!newStudentClicked)}>Add a New Child</button>
                    <button className="main-btn" onClick={()=>setQrClicked(!qrClicked)}>Get QR Code</button> 
                </div>
            </div>
            <div className="sidebar">
                 {lpClicked === true && <PlateUpdate/>}
                 {newStudentClicked === true && <NewChild/>}
                 {qrClicked === true && <QRcode/>}
              
            </div>
        </div>
        
    </div>
    );
}