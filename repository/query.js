const db = require('../db/database');

// Run table creation queries
db.serialize(() => {
  // Create "users" table
  db.run(`
    INSERT INTO comments (content, user_id, post_id)
VALUES
  ('Great introduction to React! Very helpful.', 2, 1),
  ('I cant wait for the new JavaScript features!', 3, 2),
  ('Fitness tips are great. I will try them!', 4, 3),
  ('I love solo traveling! Great tips.', 1, 8),
  ('The recipe for steak looks amazing!', 5, 5),
  ('Great read about mindful eating. I will try to be more mindful.', 2, 7),
  ('Love this post! I have been wanting to visit these destinations.', 3, 4),
  ('Next.js is awesome! Cant wait to try building an app.', 4, 6),
  ('This guide on cooking is spot on, thanks for the tips!', 5, 9),
  ('Continuous learning is so important. Great post!', 1, 10);




    )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Users table created successfully.');
    }
  });

});

db.close();
