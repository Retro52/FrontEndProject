const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
});

// Assert the database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    release();
    console.log('Connected to the database');
});

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) {
            console.error('Error retrieving users from the database:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(result.rows);
        }
    });
});

// app.post("/api/login", (req, res) => {
//     const { email, password } = req.body;
//     // if (email === "Admin" && password === "12345") {
//     if (email === "Retro52") {
//         res.json({ success: true, name: email });
//     } else {
//         res.status(401).json({ error: "Invalid email or password" });
//     }
// });

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
        if (error) {
            console.error('Error retrieving user from the database:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const user = result.rows[0];
            if (user && user.password === password) {
                res.json({ success: true, name: user.name });
            } else {
                res.status(401).json({ error: "Invalid email or password" });
            }
        }
    });
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
