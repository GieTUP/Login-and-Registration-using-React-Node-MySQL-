const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'signup',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

// Signup route
app.post('/signup', (req, res) => {
  const sql = 'INSERT INTO login (`name`,`email`,`password`) VALUES (?)';
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error('Error inserting data:', err.message);  // Log the detailed error
      return res.status(500).json({ error: 'Database error' }); // Send more detailed error message
    }
    console.log('User added successfully:', data);
    return res.status(200).json({ message: 'User created successfully.' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE `email` = ? AND `password` = ?';
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error('Error fetching data:', err); // Log the error
      return res.json('Error');
    }
    if (data.length > 0) { // Check if user exists
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.listen(8081, () => {
  console.log('Server listening on port 8081');
});