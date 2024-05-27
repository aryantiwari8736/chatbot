const pool = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  const upload = multer({ storage: storage }).single('pdfFile');
  
exports.createProject = async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res.status(500).json({ error: 'Error uploading file' });
      } else if (err) {
        // Other errors
        return res.status(500).json({ error: err.message });
      }
  
      // File uploaded successfully, continue with project creation
      const { title, description } = req.body;
      const pdfFilePath = req.file ? req.file.path : null; // Get the file path if uploaded, null otherwise
  
      try {
        // Insert project details into the database
        const result = await pool.query(
          'INSERT INTO projects (title, description, pdf_path, status) VALUES ($1, $2, $3, $4) RETURNING *',
          [title, description, pdfFilePath, 'creating']
        );
  
        res.status(201).json(result.rows[0]); // Return the created project
      } catch (error) {
        // Error inserting into database
        res.status(500).json({ error: error.message });
      }
    });
  };

exports.getProjects = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects');
        res.status(200).json(result.rows);
    } catch (error) {
        res.staus(200).json({ error: error.message });
    }
}