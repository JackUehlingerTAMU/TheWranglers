import "../App.css"

export default function ParentPortal(){
    return(<div className="parent-portal">
        <h1>Parent Name's Students:</h1>
        <div className= "wholeScreen">
            <div className = "mainSection">
                {/* Table of children */}
                <table className="parent-table">
                    <tr>
                        <th className="parent-table">Student Name</th>
                        <th>Pickup Status</th>
                        <th>Approved Licence Plate</th>
                    </tr>
                    <tr>
                        <td>Student </td>
                        <td>Pickup Status</td>
                        <td>Approved LP</td>
                    </tr>
                </table>

                {/* Update Buttons */}
                <div className = "button-row">
                    <button className="main-btn">Update License Plate</button>
                    <button className="main-btn">Add a New Child</button>
                </div>
            </div>
            <div className="sidebar">
                
            </div>
        </div>
        
    </div>
    );
}