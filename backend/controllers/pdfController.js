const fs = require('fs');
const path = require('path');

exports.uploadPDF = async (req, res) => {
  const { projectId, file } = req.body; 
  const uploadsDir = path.join(__dirname, '..', 'uploads'); 

  try {
  
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    
    const filePath = path.join(uploadsDir, file.name);
    fs.writeFileSync(filePath, file.data);

    await pool.query('INSERT INTO projects (id, pdf_path) VALUES ($1, $2)', [projectId, filePath]);

    res.status(200).json({ message: 'PDF uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
