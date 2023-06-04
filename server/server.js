const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({ debug: true, override: false }); // Load environment variables from .env file

const app = express();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
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

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
        if (error) {
            console.error('Error retrieving user from the database:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const user = result.rows[0];
            if (user && user.password === password) {
                res.json({ success: true, email: user.email });
            } else {
                res.status(401).json({ error: "Invalid email or password" });
            }
        }
    });
});

app.post("/api/register", (req, res) => {
    const { email, password } = req.body;

    pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, password],
        (error, result) => {
            if (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ message: 'Registration successful' });
            }
        }
    );
});

app.post("/api/profile", (req, res) => {
    const { email } = req.body.user; // Access email property from req.body.user
    console.log(req.body);
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
        if (error) {
            console.error('Error retrieving user from the database:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(result.rows[0]);
        }
    });
});

app.post("/api/profile/updateName", (req, res) => {
    const { email, name } = req.body;
    console.log(email, name, req.body);
    // Perform validation checks if required

    // Update the name in the database
    pool.query('UPDATE users SET name = $1 WHERE email = $2', [name, email], (error, result) => {
        if (error) {
            console.error('Error updating name:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ success: true });
        }
    });
});

app.post("/api/profile/updateAge", (req, res) => {
    const { email, age } = req.body;
    console.log(email, age);
    // Perform validation checks if required

    // Update the age in the database
    pool.query('UPDATE users SET age = $1 WHERE email = $2', [age, email], (error, result) => {
        if (error) {
            console.error('Error updating age:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ success: true });
        }
    });
});

app.post("/api/profile/updateAboutMe", (req, res) => {
    const { email, about_me } = req.body;

    pool.query('UPDATE users SET about_me = $1 WHERE email = $2', [about_me, email], (error, result) => {
        if (error) {
            console.error('Error updating About Me:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ success: true });
        }
    });
});

app.get('/api/games', (req, res) => {
    const limit = 10; // Number of games to fetch
    const query = 'SELECT * FROM games LIMIT $1';
    const values = [limit];

    // Execute the SQL query
    pool.query(query, values, (error, result) => {
        if (error) {
            console.error('Error fetching games:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const games = result.rows;
            res.json({ games });
        }
    });
});

app.get('/api/games/:id', (req, res) => {
    const gameId = parseInt(req.params.id);
    const query = 'SELECT * FROM games WHERE id = $1';
    const values = [gameId];
  
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('Error fetching game details:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const game = result.rows[0];
        if (!game) {
          res.status(404).json({ error: 'Game not found' });
        } else {
          res.json(game);
        }
      }
    });
  });
  

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
