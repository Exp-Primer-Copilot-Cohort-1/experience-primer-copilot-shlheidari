// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create connection to database
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'reddit'
});

// Connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Use body-parser
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Create comment
app.post('/comments', (req, res) => {
    let sql = `INSERT INTO comments (comment, post_id, user_id) VALUES ('${req.body.comment}', ${req.body.post_id}, ${req.body.user_id})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update comment
app.put('/comments/:id', (req, res) => {
    let sql = `UPDATE comments SET comment = '${req.body.comment}', post_id = ${req.body.post_id}, user_id = ${req.body.user_id} WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Listen on port 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});