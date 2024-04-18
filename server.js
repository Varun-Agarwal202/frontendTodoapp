const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
const bodyParser = require("body-parser");
app.use(bodyParser.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Demand123+',
    database: 'todo'
})

app.get('/', (re, res) => {
    return res.json("From Backend Side");
})

app.post('/addTodo', (req, res) => {
    const task = req.body.task;
    const sql = "INSERT INTO todo (task) VALUES (?)";
    db.query(sql, [task], (err, result) => {
      if (err) return res.json(err);
      // Retrieve the inserted todo from the database
      const insertedTodoId = result.insertId;
      const selectSql = "SELECT * FROM todo WHERE id = ?";
      db.query(selectSql, [insertedTodoId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
      });
    });
  });
  
  // Delete a todo from the database
  app.delete('/deleteTodo/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM todo WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.json(err);
      return res.json({ message: "Todo deleted successfully" });
    });
  });
app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM todo";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
    console.log("HIII");
});
app.listen(8081, () => {
    console.log('listening')
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});