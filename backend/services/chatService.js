const pool = require('../config/db');
const { getLLMResponse } = require('../utils/llmUtils');
const { processPDF } = require('./pdfService');

const checkVectorsExistInDB = async (projectId) => {
  try {
    const result = await pool.query('SELECT COUNT(*) > 0 AS vectors_exist FROM vectors WHERE project_id = $1', [projectId]);
    return result.rows[0].vectors_exist;
  } catch (error) {
    console.log(error);
  }
};
const getVectorsFromDB = async (projectId) => {
  try {
    const result = await pool.query('SELECT vectors FROM vectors WHERE project_id = $1', [projectId]);
    if (result.rows.length === 0) {
      throw new Error('No vectors found for the provided projectId');
    }
    return result.rows[0].vectors;
  } catch (error) {
  console.log(error);
  }
};


const getChatResponse = async (projectId, filePath,question) => {
  try {
    const vectorsExist = await checkVectorsExistInDB(projectId);
    if (!vectorsExist) {
      // Process the PDF to generate vectors if they don't exist
      await processPDF(projectId, filePath);
    }
    const vectorsResult = await pool.query('SELECT vector FROM vectors WHERE project_id = $1', [projectId]);
   console.log(vectorsResult);
   const mytext = await pool.query('SELECT textdata FROM vectors WHERE project_id = $1 ',[projectId])
    const vectors = vectorsResult.rows[0].vector;

    const response = await getLLMResponse(vectors, question,mytext);
    
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = { getChatResponse };
