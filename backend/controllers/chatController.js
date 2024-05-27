const pool = require('../config/db');
const { getChatResponse } = require('../services/chatService');

exports.chatWithPDF = async (req, res) => {
  const { projectId, question } = req.body;
  try {
    // Fetch the file path from the projects table
    const pathQuery = 'SELECT pdf_path FROM projects WHERE id = $1';
    const pathResult = await pool.query(pathQuery, [projectId]);
    const filePath = pathResult.rows[0].pdf_path;

    // Call getChatResponse with the retrieved file path
    const response = await getChatResponse(projectId, filePath, question);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};
