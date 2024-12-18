const db = require('../db/database');

async function getAllCategories(req, res) {
    const query = 'SELECT * FROM categories';
    db.all(query, [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
    });
}

async function addCategory(req, res) {
    const { name, description } = req.body;
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';

    db.run(query, [name, description], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, name, description, status: "Successfully Created" });
      }
    });
}

module.exports = { getAllCategories, addCategory};