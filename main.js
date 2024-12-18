const express = require('express');
const cors = require('cors')
const app = express();
const db = require('./db/database');
const categoryRouter = require('./routes/categoryRouter');
const postRouter = require('./routes/postRouter');

// Middleware to parse JSON request bodies
const corsOptions = {
    origin: 'http://localhost:3000', // Set to your frontend origin
    credentials: true // Allow cookies to be sent
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/category', categoryRouter);
app.use('/api/post', postRouter);


app.get('/', (req, res) =>{
    res.json('Welcome')
});

app.get('/', (req, res) =>{
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
    });
});

app.post('/', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    console.log("inside")
    db.run(query, [name, email], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, name, email });
      }
    });
});


// Get a user by ID
app.get('/:id', (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(row);
    }
  });
});

// Delete a user by ID
app.delete('/:id', (req, res) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.run(query, [req.params.id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});


app.listen(8000, () =>{
    console.log("Server is running on PORT 8000...");
})