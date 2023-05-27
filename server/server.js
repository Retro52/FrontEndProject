const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({"users" : ["One", "Two", "Three"]});
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    // if (email === "Admin" && password === "12345") {
    if (email === "Retro52") {
        res.json({ success: true, name: email });
    } else {
        res.status(401).json({ error: "Invalid email or password" });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
