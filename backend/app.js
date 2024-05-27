const app = require('./config/index');
const { createProjectTable } = require('./models/Project');
const { createPDFTable } = require('./models/Pdf');
const { createVectorTable } = require('./models/Vectors');

const PORT = process.env.PORT || 5000;

const initializeTables = async () => {
    await createProjectTable();
    await createPDFTable();
    await createVectorTable();
  };
  initializeTables().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });