const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors());

const projectRoutes = require('../routes/projectRoutes');
const pdfRoutes = require('../routes/pdfRoutes');
const chatRoutes = require('../routes/chatRoutes');
app.use('/api/projects',projectRoutes);
app.use('/api/pdfs',pdfRoutes);
app.use('/api/chat',chatRoutes);
module.exports = app;