const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@1234",
  database: "student_register"
});

con.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
    return;
  }
  console.log("Database connected successfully!");
});

app.get('/getStudentDetails', (req, res) => {
  const selectSqlQuery = `SELECT * FROM Student_table WHERE isDelete=0 ORDER BY ID DESC`;
  con.query(selectSqlQuery, (err, result) => {
    if (err) {
      console.log("Error executing query:", err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(result);
  });
});

app.get("/getStudent/:id", (req, res) => {
  console.log("Fetching student with ID:", req.params.id);

  const sqlQuery = "SELECT * FROM student_table WHERE id = ?";
  con.query(sqlQuery, [req.params.id], (err, result) => {
      if (err) {
          console.error("Error fetching student:", err);
          return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
          return res.status(404).json({ message: "Student not found" });
      }

      res.json(result[0]); 
  });
});


app.post('/createStudentDetails', (req, res) => {
  const { name, age, phoneno } = req.body;

  const ageValue = age === "" ? null : age;

  const insertSqlQuery = `INSERT INTO student_table (NAME, age, phoneno) VALUES (?, ?, ?)`;
  const insertSqlParams = [name, ageValue, phoneno];

  con.query(insertSqlQuery, insertSqlParams, (err, result) => {
    if (err) {
      console.log("Error executing query:", err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(result);
  });
});

app.put("/updateStudent/:id", (req, res) => {
  console.log("Received ID:", req.params.id);
  console.log("Received Data:", req.body);

  const { name, age, phoneno } = req.body;
  
  if (!name || !phoneno) {
      return res.status(400).json({ message: "Name and Phone Number are required" });
  }

  const updateQuery = "UPDATE student_table SET NAME=?, age=?, phoneno=? WHERE id=?";
  con.query(updateQuery, [name, age || null, phoneno, req.params.id], (err, result) => {
      if (err) {
          console.error("Error updating student:", err);
          return res.status(500).json({ message: "Server error" });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Student not found" });
      }

      res.json({ message: "Student updated successfully" });
  });
});


app.put('/delete/:id', (req, res) => {
  const isDelete = 1;
  const { id } = req.params;

  const updateSqlQuery = `UPDATE student_table SET isDelete=? WHERE id=?`;
  const updateSqlParams = [isDelete, id];

  con.query(updateSqlQuery, updateSqlParams, (err, result) => {
    if (err) {
      console.log("Error executing query:", err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student marked as deleted successfully" });
  });
});


app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});