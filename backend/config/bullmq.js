const { Queue, Worker, QueueScheduler } = require('bullmq');

const pdfQueue = new Queue('pdfQueue');
const queueScheduler = new QueueScheduler('pdfQueue');

const worker = new Worker('pdfQueue', async job => {
  const { processPDF } = require('../services/pdfService');
  await processPDF(job.data.pdfId);
}, {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
});

module.exports = { pdfQueue };
