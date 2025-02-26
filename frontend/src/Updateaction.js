import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Updateaction() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: "", age: "", phoneno: "" });

    useEffect(() => {
        axios.get(`http://localhost:8081/getStudent/${id}`)
            .then(response => setStudent(response.data))
            .catch(error => console.error("Error fetching student:", error));
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        
        const updatedData = {
            name: student.name,  
            age: student.age ? student.age : null, 
            phoneno: student.phoneno
        };
    
        console.log("Updating Student:", updatedData);  
    
        axios.put(`http://localhost:8081/updateStudent/${id}`, updatedData, {
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            alert("Student updated successfully!");
            navigate("/");
        })
        .catch((error)=>{
            alert("Error updating Details");
            console.error("Error updating student:", error);
        })
    };
    
    

    return (
        <div className="container">
            <h2>Edit Student</h2>
            <form onSubmit={handleUpdate} className="border p-4 rounded shadow">
                <div>
                    <label>Name: </label><br/>
                    <input 
                        type="text" 
                        name="name" 
                        value={student.name} 
                        onChange={handleChange}
                        autoComplete="off"

                    />
                </div>
                <br />
                <div>
                    <label>Age: </label><br/>
                    <input 
                        type="number" 
                        name="age" 
                        value={student.age} 
                        onChange={handleChange} 
                        autoComplete="off"

                         
                    />
                </div>
                <br />
                <div>
                    <label>Phone No: </label><br/>
                    <input 
                        type="number" 
                        name="phoneno" 
                        value={student.phoneno} 
                        onChange={handleChange}  
                        autoComplete="off"

                    />
                </div>
                <br />
                <div className="d-flex justify-content-center" style={{ gap: "10px" }}>
                    <Button type="submit" variant="primary">Update</Button>
                    <Button variant="secondary" onClick={() => navigate("/")}>Cancel</Button>
                </div>            
            </form>
        </div>
    );
}

export default Updateaction;
