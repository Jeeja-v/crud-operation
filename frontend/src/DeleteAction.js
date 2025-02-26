import axios from 'axios';

const Deleteaction = (studentId, onSuccess) => {
    axios.put(`http://localhost:8081/delete/${studentId}`)
        .then(res => {
            alert('Student Deleted successfully!');
            if (onSuccess) onSuccess();
        })
        .catch(error => {
            alert('Error Deleteing Details');
            console.error("Error deleting student:", error.response ? error.response.data : error.message);
        });
};

export default Deleteaction;
