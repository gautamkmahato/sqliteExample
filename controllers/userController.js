const db = require('../db/database');

async function getAllUsers(req, res) {
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
    });
}

async function addUser(req, res) {
    const { username, email, clerk_id } = req.body;
    console.log(username, email, clerk_id)
    const query = 'INSERT INTO users (username, email, clerk_id) VALUES (?, ?, ?);';

    db.run(query, [username, email, clerk_id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID,  username, email, clerk_id, status: "Successfully Created" });
      }
    });
}

module.exports = { getAllUsers, addUser }