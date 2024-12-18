const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path =  require('path');

const dbPath = path.join(__dirname, 'data', 'database.sqlite');

// Initialize the SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, dbPath), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

module.exports = db;
