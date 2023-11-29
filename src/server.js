const express = require('express');
const bodyParser = require('body-parser');
const doctorsRoutes = require('./routes/doctors');
const nursesRoutes = require('./routes/nurses');
const patientRoutes = require('./routes/patients');
const tasksRoutes = require('./routes/tasks');
const medicationsRoutes = require('./routes/medications');
const patientStatusRoutes = require('./routes/patientStatus');
const adminRoutes = require('./routes/admins');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', doctorsRoutes);
app.use('/api', nursesRoutes);
app.use('/api', patientRoutes);
app.use('/api', tasksRoutes);
app.use('/api', medicationsRoutes);
app.use('/api', patientStatusRoutes);
app.use('/api', adminRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});