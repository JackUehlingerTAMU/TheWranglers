import "../App.css" // styling
import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; // switch pages
import NewChild from "../components/NewChild"; // adding a new child to parent account
import PlateUpdate from "../components/PlateUpdate"; // updating licence plate for parent
import QRcode from "../components/QRcode"; // QR code generator for designated parent
import { supabase } from "../supabaseClient"; // Database
import Header from "../components/header"; // Login/logout button
import Loading from "../components/loading"; // Spinning Loading Wheel
/**
 * Parent Portal Page
 * @returns Parent Portal Page (http://localhost:3000/parent-portal#)
 */
export default function ParentPortal(){
    const navigate = useNavigate();

    // buttons to pop up/hide different components on the side
    const [lpClicked, setIslpClicked] = useState(false); // License Plate Button
    const [newStudentClicked, setNewStudentClicked] = useState(false); // Add Student Button
    const [qrClicked, setQrClicked] = useState(false); // QR Button
    const [accountExpiration, setAccountExpiration] = useState(null); // Account expireation logic
    // Table Info
    const [loading, setLoading]= useState(true); // Don't display table while getting data
    const [parentName, setParentName] = useState();
    const [studentInfo, setStudentInfo] =useState(null);
    const [parent_id, setParent_id]=useState(null); // sent to other components so know which parent child is attached to
    
    


    // Login Protection:
    useEffect(() => {
        const checkUser = async () => {
            setLoading(true);// dont display the screen while checking info
            // get the user
            const { data: authData, error: authError } = await supabase.auth.getUser();
            if (!authData.user) {
                navigate("/"); // go back to the home page if the user is not logged in
            }
            if(authError){
                console.log(authError);
                return;
            }
        

            // Get Parent Name from Supabase Database
            const { data: parentData, error: parentError  } = await supabase
                .from("parent")// table name
                .select("id,parent_first_name,parent_last_name,plate_number,plate_state,account_expiration")// columns you want
                .eq("google_id", authData.user.id)
                .single(); // get a single record
            if (parentError){
                console.error(parentError);
                return;
            }
            else{
                //Parent exists so set the data of Parent for Screen
                setParentName(parentData.parent_first_name+ " " + parentData.parent_last_name);
                setParent_id(parentData.id);
                setAccountExpiration(parentData.account_expiration);
            }
        

            // Get Parent-Student Connections
            const {data: studentData, error: studentError} = await supabase
                .from("parent_student")
                .select("parent_id,student_id,pickup_status, students(student_first_name,student_middle_name,student_last_name,student_grade), parent(plate_number,plate_state)")
                .eq("parent_id", parentData.id);
            if (studentError){
                console.error(studentError);
            }
            else{
                setStudentInfo(studentData); 
            }
            setLoading(false); // all data collected, can now show the screen
            };
        checkUser();
    }, [navigate]);

    return (
        <div className="parent-portal">
            <Header />
            {loading ? (
                <Loading/> 
            ) : (
            <>
                {/* Parent Page Header */}
                <div className="parent-header-row">
                    <h1 className="parent-title">{parentName}'s Students:</h1>
                    <div className="expire-box">
                        <span className="expire-label">Account expires</span>
                        <span className="expire-date">
                            {accountExpiration ? new Date(accountExpiration).toLocaleDateString() : "—"}
                        </span>
                    </div>
                </div>

                 {/* Update Buttons */}
                <div className = "button-rows">
                    <button className="main-btn" onClick={() => {setIslpClicked(!lpClicked); setNewStudentClicked(false); setQrClicked(false); } } >Update License Plate</button>
                    <button className="main-btn" onClick={()=> {setNewStudentClicked(!newStudentClicked); setIslpClicked(false); setQrClicked(false);} }>Add a New Child</button>
                    <button className="main-btn" onClick={()=>{setQrClicked(!qrClicked); setIslpClicked(false);setNewStudentClicked(false);}}>Get QR Code</button> 
                </div>
                
                {/* Main Section of the Parent portal */}
                <div className="parent-row">
                    {/* Component Display Based on which button is pressed */}
                    <div className="sidebar">
                        {lpClicked === true && <PlateUpdate parent_id={parent_id}/>}
                        {newStudentClicked === true && <NewChild parent_id={parent_id}/>}
                        {qrClicked === true && <QRcode licensePlate={studentInfo[0].parent.plate_number + studentInfo[0].parent.plate_state }/>}
                    </div>

                    {/* Main Section of the Page */}
                    <div className = "mainSection">
                        <h2>My Students:</h2>
                        {/* Table of children */}
                        {loading? <Loading/>:
                            studentInfo && studentInfo.length === 0 ? 
                            // Parent With No Students
                            <p> No Students yet, please add them by clicking the add student button!</p> :
                            // Parent with Students, display table
                            <div className="table-container">
                                <table className="parent-table">
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Student Grade</th>
                                            <th>Pickup Status</th>
                                            <th>Approved Plate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentInfo.map(student =>
                                        <tr key={student.student_id}>
                                            <td> {student.students.student_first_name + " " +student.students.student_middle_name + " " + student.students.student_last_name} </td>
                                            <td>{student.students.student_grade}</td>
                                            <td>{student.pickup_status? "Approved":"Pending Approval"}</td>
                                            <td>{student.parent.plate_state + " " + student.parent.plate_number}</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        }   
                    </div>    
                </div>
            </>
            )}
        </div>
);
}