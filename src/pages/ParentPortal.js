import "../App.css"
import NewChild from "../components/NewChild";
import PlateUpdate from "../components/PlateUpdate";
import { useState, useEffect } from "react";
import QRcode from "../components/QRcode";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Header from "../components/header";


export default function ParentPortal(){
    const navigate = useNavigate();
    const [lpClicked, setIslpClicked] = useState(false);
    const [newStudentClicked, setNewStudentClicked] = useState(false);
    const [qrClicked, setQrClicked] = useState(false);
    const [parentName, setParentName] = useState();
    const [studentInfo, setStudentInfo] =useState([]);
 
    
    

    // Login Protection:
    useEffect(() => {
        const checkUser = async () => {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (!authData.user) {
            navigate("/");
        }
        if(authError){
            console.log(authError);
        }

        // Get Parent Name
        const { data: parentData, error: parentError  } = await supabase
            .from("parent")       // replace with your table name
            .select("id,parent_first_name,parent_last_name")    // columns you want
            .eq("google_id", authData.user.id)
            .single();             // get a single record

        if (parentError){
            console.log(parentError);
            return;
        }
        else{
            setParentName(parentData.parent_first_name+ " " + parentData.parent_last_name);
        }

        // Get Parent-Student Connections
        const {data: studentData, error: studentError} = await supabase
            .from("parent_student")
            .select("parent_id,student_id,pickup_status, students(student_first_name,student_middle_name,student_last_name,student_grade), parent(plate_number,plate_state)")
            .eq("parent_id", parentData.id);

        if (studentError){
            console.log(studentError);
        }
        else{
            setStudentInfo(studentData);
            console.log(studentData);
        }

        };
        
        checkUser();
    }, [navigate]);

    
    



    return(<div className="parent-portal">
        <Header/>
        <h1>{parentName}'s Students:</h1>
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
                    {studentInfo.map(student =>
                    <tr>
                        <td> {student.students.student_first_name + " " +student.students.student_middle_name + " " + student.students.student_last_name} </td>
                        <td>{student.students.student_grade}</td>
                        <td>{student.pickup_status? "Approved":"Pending Approval"}</td>
                        <td>{student.parent.plate_state + " " + student.parent.plate_number}</td>
                    </tr>
                    )}
                    
                    </tbody>
                </table>

                {/* Update Buttons */}
                <div className = "button-rows">
                    <button className="main-btn" onClick={() => {setIslpClicked(!lpClicked); setNewStudentClicked(false); setQrClicked(false); } } >Update License Plate</button>
                    <button className="main-btn" onClick={()=> {setNewStudentClicked(!newStudentClicked); setIslpClicked(false); setQrClicked(false);} }>Add a New Child</button>
                    <button className="main-btn" onClick={()=>{setQrClicked(!qrClicked); setIslpClicked(false);setNewStudentClicked(false);}}>Get QR Code</button> 
               
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