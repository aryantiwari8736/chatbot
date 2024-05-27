const pool = require('../config/db');
const fs = require('fs')
const { generateVectors, saveVectorsToDB } = require('./vectorService');

const processPDF = async (projectId, filePath) => {
  try {
  
  
    const pdfContent = fs.readFile(filePath, (err, fileBuffer) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      // Process fileBuffer as needed
      console.log('File buffer:', fileBuffer);
    });
    // Generate vectors from extracted text
    const vectors = await generateVectors(pdfContent);

    // Save vectors to database
    await saveVectorsToDB(projectId, vectors,pdfContent);

    // Save PDF content to the database
     await pool.query('INSERT INTO pdfs (project_id, content) VALUES ($1, $2)', [projectId, textContent]);

    // Update project status to 'created'
    await pool.query('UPDATE projects SET status = $1 WHERE id = $2', ['created', projectId]);
  } catch (error) {
    // Update project status to 'failed' if there is an error
    await pool.query('UPDATE projects SET status = $1 WHERE id = $2', ['failed', projectId]);
    throw error;
  }
};

module.exports = { processPDF };
