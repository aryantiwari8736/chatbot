const pool = require('../config/db');

const createPDFTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pdfs (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id),
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('PDFs table created successfully');
  } catch (err) {
    console.error('Error creating PDFs table', err);
  }
};

module.exports = { createPDFTable };
