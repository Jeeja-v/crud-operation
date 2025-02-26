import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Deleteaction from './DeleteAction';

function Details() {
    const [students, setStudents] = useState([]);
    const [deleteForm, setDeleteForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios.get('http://localhost:8081/getStudentDetails')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleDeleteStudentClick = (student) => {
      setDeleteForm(true);
      setSelectedStudent(student);

  };

  const handleFormDelete = () => {  
    Deleteaction(selectedStudent.id,
        () => {
            setDeleteForm(false);
            fetchStudents();
        },
    );
};


  const handleCloseDelete = () => {
      setDeleteForm(false);
  };

    return (
        <div className="container">
            <Link to="/add-student" className="btn btn-success btn-sm add-btn">
                Add Student
            </Link>

            <h2>Student List</h2>
            <div className="table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>SL.NO</th>
                            <th>NAME</th>
                            <th>AGE</th>
                            <th>PHONE NO</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                    <td>{student.phoneno}</td>
                                    <td>
                                        <Link to={`/edit-student/${student.id}`} className="btn btn-info btn-sm">
                                            Edit
                                        </Link>

                                        <Button className="btn btn-danger btn-sm" onClick={() => handleDeleteStudentClick(student)}>Delete</Button>
                                        <Modal show={deleteForm} onHide={handleCloseDelete}  backdrop="static" centered >
                                          <Modal.Header closeButton>
                                            <Modal.Title>Delete Student</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            Are you sure you want to delete this Student Record?
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <Button variant="primary" onClick={handleFormDelete}>Confirm</Button>
                                            <Button variant="secondary" onClick={handleCloseDelete}>Cancel</Button>
                                          </Modal.Footer>
                                        </Modal>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Details;
