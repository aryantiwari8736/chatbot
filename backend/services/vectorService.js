const axios = require('axios');
const pool = require('../config/db');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const utf8ByteSize = (str) => new TextEncoder().encode(str).length;
const openaiApiKey = 'AIzaSyCuHedq2c4Nox9UAzSGEE8lKROBt7_wXIg';
const generateVectors = async (textContent, maxRetries = 3, delay = 1000, byteLimit = 500) => {
  const chunks = [];
  let startIndex = 0;

  // Split the textContent into chunks
  while (startIndex < textContent.length) {
    let endIndex = startIndex + byteLimit;
    let chunk = textContent.slice(startIndex, endIndex);

    // Ensure the chunk is within byte limit
    while (utf8ByteSize(chunk) > byteLimit) {
      endIndex--;
      chunk = textContent.slice(startIndex, endIndex);
    }

    chunks.push(chunk);
    startIndex = endIndex;
  }

  

  const fetchChunkEmbedding = async (chunk) => {
    let retries = 0;
    while (retries < maxRetries) {
       try {
      //   const response = await axios.post(
      //     'https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent',
      //     {
      //       input: chunk,
      //       model: 'embedding-001',
      //     },
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': `Bearer ${openaiApiKey}`, // Replace with the actual API key variable
      //       },
      //     }
      //   );

      const genAI = new GoogleGenerativeAI(openaiApiKey);
      const model = genAI.getGenerativeModel({ model: "embedding-001"});
      const response = await model.embedContent(chunk);

        return response.embedding.values;
      }catch (error) {  
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        }

        if (error.response && error.response.status === 429) {
          console.warn('Rate limited. Retrying after delay...');
          await new Promise(resolve => setTimeout(resolve, delay));
          retries++;
        } else {
          console.error('Error generating vectors:', error);
          throw error;
        }
      }
    }
    
    throw new Error('Max retries exceeded. Unable to generate vectors for chunk.');
  };

  try {
    const allVectors = [];
    for (const chunk of chunks) {
      const chunkVectors = await fetchChunkEmbedding(chunk);
      allVectors.push(...chunkVectors);
    }
    console.log(allVectors);
    return allVectors;
  } catch (error) {
    console.error('Error generating vectors:', error);
    throw error;
  }
};

const saveVectorsToDB = async (projectId, vectors,pdfContent) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const vectorInsertQuery = 'INSERT INTO vectors (project_id, vector,textdata) VALUES ($1, $2,$3) RETURNING *';
console.log(vectors);
    
      const formattedVector = `{${vectors.join(',')}}`; 
      await client.query(vectorInsertQuery, [projectId, formattedVector,pdfContent]);
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving vectors to database:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { generateVectors, saveVectorsToDB };
