const pool = require('../config/db');

const createProjectTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        pdf_url VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Projects table created successfully');
  } catch (err) {
    console.error('Error creating Projects table', err);
  }
};

module.exports = { createProjectTable };
