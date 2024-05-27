const pool = require('../config/db');
const createVectorTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vectors (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id),
        vector FLOAT8[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Vectors table created successfully');
  } catch (err) {
    console.error('Error creating Vectors table', err);
  }
};

module.exports = { createVectorTable };