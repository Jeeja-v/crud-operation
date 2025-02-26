import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Submitaction() {
    const navigate = useNavigate();
    const [student, setStudent] = useState({ name: "", age: "", phoneno: "" });

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const studentData = {
            name: student.name,
            phoneno: student.phoneno,
            ...(student.age ? { age: student.age } : {})  
        };
    
        console.log("Sending Data:", studentData); 
    
        axios.post(`http://localhost:8081/createStudentDetails`, studentData, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            alert("Student Added successfully!")
            console.log("Response:", response.data); 
            navigate("/");
        })
        .catch((error) => {
            alert("Error Creating New Details")
            console.error("Error Creating student:", error);
        })
    };


    return (
        <div className="container mt-4">
            <h2 className="text-center">Add Student</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div>
                <label >Name: <span style={{ color: "red" }}>*</span></label><br/>
                <input 
                        type="text" 
                        name="name" 
                        value={student.name || ""} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <br />

                <div>
                    <label>Age: </label><br/>
                    <input 
                        type="number" 
                        name="age" 
                        value={student.age || ""} 
                        onChange={handleChange} 
                         
                    />
                </div>
                <br />

                <div>
                    <label>Phone No: <span style={{ color: "red" }}>*</span> </label><br/>
                    <input 
                        type="number" 
                        name="phoneno" 
                        value={student.phoneno || ""} 
                        onChange={handleChange} 
                        required 

                    />
                </div>
                <br />

                <div className="d-flex justify-content-center" style={{ gap: "10px" }}>
                    <Button type="submit" variant="primary">Submit</Button>
                    <Button variant="secondary" onClick={() => navigate("/")}>Cancel</Button>
                </div>            
            </form>
        </div>
    );
}

export default Submitaction;
