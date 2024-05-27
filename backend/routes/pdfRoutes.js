const express = require('express');
const router = express.Router();
const pdfController= require('../controllers/pdfController');

router.post('/upload', pdfController.uploadPDF);

module.exports = router;
