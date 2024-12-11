import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles
import './ViewStudents.css';
import AdminNavbar from './AdminNavbar';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editStudent, setEditStudent] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('customId'); // Default sort by Student ID

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/students');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to fetch student data. Please try again later.');
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
      toast.error("Student Deleted Successfully");
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error("Error deleting student");
    }
  };

  const handleEdit = (student) => {
    setEditStudent({ ...student });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/students/${editStudent.id}`, editStudent);
      setStudents(students.map(student => student.id === editStudent.id ? editStudent : student));
      setEditStudent(null);
      toast.success("Student updated successfully!");
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error("Error updating student");
    }
  };

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortColumn(column);

    const sortedStudents = [...students].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a[column] < b[column] ? -1 : 1;
      } else {
        return a[column] > b[column] ? -1 : 1;
      }
    });
    setStudents(sortedStudents);
  };

  if (loading) return <p className="loading-message">Loading students...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <AdminNavbar />
      <div className="view-students-container">
        <h2>List of Students</h2>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort('customId')}>Student ID</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('email')}>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  {editStudent?.id === student.id ? (
                    <input
                      type="text"
                      value={editStudent.customId}
                      onChange={(e) => setEditStudent({ ...editStudent, customId: e.target.value })}
                    />
                  ) : (
                    student.customId
                  )}
                </td>
                <td>
                  {editStudent?.id === student.id ? (
                    <input
                      type="text"
                      value={editStudent.name}
                      onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editStudent?.id === student.id ? (
                    <input
                      type="text"
                      value={editStudent.email}
                      onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td>
                  {editStudent?.id === student.id ? (
                    <>
                      <button className="save-button" onClick={handleUpdate}>Save</button>
                      <button className="cancel-button" onClick={() => setEditStudent(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="update-button" onClick={() => handleEdit(student)}>Update</button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Toastify container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default ViewStudents;
