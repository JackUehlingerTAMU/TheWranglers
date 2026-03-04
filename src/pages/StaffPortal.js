import { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";


function StaffPortal() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const { data, error } = await supabase
        .from("parent_student")
        .select(`
          id,
          pickup_status,
          students (
            id,
            student_first_name,
            student_last_name,
            student_grade
          ),
          parent (
            id,
            parent_first_name,
            parent_last_name,
            plate_state,
            plate_number
          )
        `);

      if (error) throw error;

      console.log("Raw Supabase Data:", data);

      if (data) {
        const formattedData = data.map((row) => ({
          id: row.id,
          
          student_id: row.students?.id,
          parent_id: row.parent?.id,
          
          name: `${row.students?.student_first_name || 'N/A'} ${row.students?.student_last_name || ''}`,
          grade: row.students?.student_grade || '',
          parents: `${row.parent?.parent_first_name || 'N/A'} ${row.parent?.parent_last_name || ''}`,
          licensePlate: `${row.parent?.plate_state || ''} ${row.parent?.plate_number || 'No Plate'}`,
          
          student_first_name: row.students?.student_first_name || '',
          student_last_name: row.students?.student_last_name || '',
          student_grade: row.students?.student_grade || '',
          parent_first_name: row.parent?.parent_first_name || '',
          parent_last_name: row.parent?.parent_last_name || '',
          plate_state: row.parent?.plate_state || '',
          plate_number: row.parent?.plate_number || '',
          status: row.pickup_status ? "Approved" : "Pending",
        }));
        
        setStudents(formattedData);
      }
    } catch (error) {
      console.error("Error fetching student data:", error.message);
      alert("Error loading table data. Check the developer console for details.");
    }
  };

  const getVolunteerCode = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("volunteerCodeData");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        return parsed.code;
      }
    }

    const newCode = Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem(
      "volunteerCodeData",
      JSON.stringify({ code: newCode, date: today })
    );

    return newCode;
  };

  const volunteerCode = getVolunteerCode();

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    if (studentToEdit) {
      setEditFormData(studentToEdit);
      setIsModalOpen(true);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    try {
      const { error: studentError } = await supabase
        .from('students')
        .update({
          student_first_name: editFormData.student_first_name,
          student_last_name: editFormData.student_last_name,
          student_grade: editFormData.student_grade
        })
        .eq('id', editFormData.student_id);
      
      if (studentError) throw studentError;

      const { error: parentError } = await supabase
        .from('parent')
        .update({
          parent_first_name: editFormData.parent_first_name,
          parent_last_name: editFormData.parent_last_name,
          plate_state: editFormData.plate_state,
          plate_number: editFormData.plate_number
        })
        .eq('id', editFormData.parent_id);

      if (parentError) throw parentError;

      const isApproved = editFormData.status === "Approved";
      const { error: statusError } = await supabase
        .from('parent_student')
        .update({ pickup_status: isApproved })
        .eq('id', editFormData.id);

      if (statusError) throw statusError;

      await fetchStudentData();
      setIsModalOpen(false);

    } catch (error) {
      console.error("Error updating records:", error.message);
      alert("Failed to save changes. Please check the console.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('parent_student')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setStudents(students.filter((student) => student.id !== id));
      
    } catch (error) {
      console.error("Error deleting record:", error.message);
    }
  };

  return (
    <div className="staff-portal">
      
      {/* Volunteer Code Box */}
      <div className="volunteer-code-box">
        Volunteer Code: <strong>{volunteerCode}</strong>
      </div>

      <h1 className="portal-title">Staff Portal</h1>

      <div className="portal-top-bar">
        <div className="left-buttons">
          <button className="main-btn" onClick={() => navigate("/kids-pickup")}>
            Kids Pickup
          </button>
          <button className="main-btn" onClick={() => navigate("/pickup-station")}>
            Station Screen
          </button>
        </div>

        <button className="main-btn logout-btn">Logout</button>
      </div>

        <div className="child-table">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Parent(s)</th>
              <th>Parent License Plate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.parents}</td>
                <td>{student.licensePlate}</td>
                <td>{student.status}</td>
                <td>
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEdit(student.id)}
                  >
                    ✏
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(student.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && editFormData && (
        <div className="modal-overlay" style={{ overflowY: 'auto', paddingTop: '50px' }}>
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <h2>Edit Record</h2>
            
            <form onSubmit={handleSaveEdit}>
              <h3 style={{ borderBottom: '1px solid #000000', paddingBottom: '5px' }}>Student Info</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>First Name:</label>
                  <input type="text" name="student_first_name" value={editFormData.student_first_name} onChange={handleFormChange} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Last Name:</label>
                  <input type="text" name="student_last_name" value={editFormData.student_last_name} onChange={handleFormChange} required />
                </div>
                
                <div className="form-group" style={{ width: '100px' }}>
                  <label>Grade:</label>
                  <select 
                    name="student_grade" 
                    value={editFormData.student_grade} 
                    onChange={handleFormChange} 
                    required
                  >
                    <option value="" disabled>Select</option>
                    <option value="KG">KG</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              
              {/* Parent Section */}
              <h3 style={{ borderBottom: '1px solid #000000', paddingBottom: '5px', marginTop: '20px' }}>Parent Info</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>First Name:</label>
                  <input type="text" name="parent_first_name" value={editFormData.parent_first_name} onChange={handleFormChange} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Last Name:</label>
                  <input type="text" name="parent_last_name" value={editFormData.parent_last_name} onChange={handleFormChange} required />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ width: '100px' }}>
                  <label>Plate State:</label>
                  <input type="text" name="plate_state" value={editFormData.plate_state} onChange={handleFormChange} maxLength={2} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Plate Number:</label>
                  <input type="text" name="plate_number" value={editFormData.plate_number} onChange={handleFormChange} required />
                </div>
              </div>

              {/* Status Section */}
              <h3 style={{ borderBottom: '1px solid #000000', paddingBottom: '5px', marginTop: '20px' }}>Pickup Status</h3>
              <div className="form-group">
                <select id="status" name="status" value={editFormData.status} onChange={handleFormChange}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>

              <div className="modal-actions" style={{ marginTop: '30px' }}>
                <button type="submit" className="main-btn">Save All Changes</button>
                <button type="button" className="main-btn logout-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffPortal;