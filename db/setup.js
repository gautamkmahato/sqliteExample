const db = require('./database');

// Run table creation queries
db.serialize(() => {
  // Create "users" table
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS categories (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT NOT NULL UNIQUE,
  //     description TEXT
  //   )`, (err) => {
  //   if (err) {
  //     console.error('Error creating table:', err.message);
  //   } else {
  //     console.log('Users table created successfully.');
  //   }
  // });

  // db.run(`
  //   CREATE TABLE IF NOT EXISTS posts (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     title TEXT NOT NULL,
  //     content TEXT NOT NULL,
  //     user_id INTEGER NOT NULL,
  //     category_id INTEGER NOT NULL,
  //     image_url TEXT,
  //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     FOREIGN KEY (category_id) REFERENCES categories(id)
  //   )`, (err) => {
  //   if (err) {
  //     console.error('Error creating table:', err.message);
  //   } else {
  //     console.log('Users table created successfully.');
  //   }
  // });

  // db.run(`
  //   CREATE TABLE IF NOT EXISTS tags (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT NOT NULL UNIQUE
  //   )`, (err) => {
  //   if (err) {
  //     console.error('Error creating table:', err.message);
  //   } else {
  //     console.log('Users table created successfully.');
  //   }
  // });

  // db.run(`
  //   CREATE TABLE IF NOT EXISTS post_tags  (
  //     post_id INTEGER NOT NULL,
  //     tag_id INTEGER NOT NULL,
  //     PRIMARY KEY (post_id, tag_id),
  //     FOREIGN KEY (post_id) REFERENCES posts(id),
  //     FOREIGN KEY (tag_id) REFERENCES tags(id)
  //   )`, (err) => {
  //   if (err) {
  //     console.error('Error creating table:', err.message);
  //   } else {
  //     console.log('Users table created successfully.');
  //   }
  // });

  // db.run(`
  //   CREATE TABLE IF NOT EXISTS comments (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     content TEXT NOT NULL,
  //     user_id INTEGER NOT NULL,
  //     post_id INTEGER NOT NULL,
  //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     FOREIGN KEY (post_id) REFERENCES posts(id)
  //   )`, (err) => {
  //   if (err) {
  //     console.error('Error creating table:', err.message);
  //   } else {
  //     console.log('Users table created successfully.');
  //   }
  // });

  db.run(`
      CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      clerk_id TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Users table created successfully.');
    }
  });

});

db.close();
