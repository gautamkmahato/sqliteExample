const db = require('../db/database');

async function getAllposts(req, res) {
    const query = 'SELECT * FROM posts';
    db.all(query, [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
    });
}

async function addPost(req, res) {
    const { title, content, user_id, category_id, image_url } = req.body;
    console.log(title, content, user_id, category_id, image_url)
    const query = 'INSERT INTO posts (title, content, user_id, category_id, image_url) VALUES (?, ?, ?, ?, ?)';

    db.run(query, [title, content, user_id, category_id, image_url], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, title, content, user_id, category_id, image_url, status: "Successfully Created" });
      }
    });
}

async function getPostById(req, res) {
    const id = req.params.id;
    const query = 'SELECT * FROM posts WHERE id = ?';
    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Not found error' });
        } else {
            res.json(row);
        }
    });
}

async function deletePost(req, res) {
    const id = req.params.id;
    const query = 'DELETE FROM posts WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    });
}

async function getPostByCategory(req, res) {
    const category = req.params.category;
    const query = 'SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, posts.image_url, posts.created_at, posts.updated_at, categories.name AS category_name FROM posts JOIN categories ON posts.category_id = categories.id WHERE categories.name = ? ORDER BY posts.created_at DESC;';
    db.all(query, [category], (err, rows) =>{
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    })
}

async function getPostWithCategory(req, res) {
    const query = 'SELECT posts.id AS post_id, posts.title AS post_title, posts.content AS post_content, posts.image_url, posts.created_at, posts.updated_at, categories.name AS category_name FROM posts JOIN categories ON posts.category_id = categories.id ORDER BY categories.name, posts.created_at DESC;';
    db.all(query, [], (err, rows) =>{
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    })
}

module.exports = { getAllposts, addPost, getPostById, deletePost, getPostByCategory, getPostWithCategory };
