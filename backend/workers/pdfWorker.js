const { Worker } = require('bullmq');
const { processPDF } = require('../services/pdfService');

const worker = new Worker('pdfQueue', async job => {
  const { projectId, pdfUrl } = job.data;
  await processPDF(projectId, pdfUrl);
}, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

worker.on('completed', (job) => {
  console.log(`Job completed with result ${job.returnvalue}`);
});

worker.on('failed', (job, err) => {
  console.log(`Job failed with error ${err.message}`);
});
