const db = require('../db');

// Operação de leitura (get all patient status)
exports.getAllPatientStatus = (req, res) => {
  db.query('SELECT * FROM Patient_Status', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Operação de criação (create patient status)
exports.createPatientStatus = (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'O status é obrigatório.' });
  }

  const newPatientStatus = { status };

  db.query('INSERT INTO Patient_Status SET ?', newPatientStatus, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Status do paciente criado com sucesso.', id: result.insertId });
    }
  });
};

// Operação de atualização (update patient status)
exports.updatePatientStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'O status é obrigatório.' });
  }

  const updatedPatientStatus = { status };

  db.query('UPDATE Patient_Status SET ? WHERE id = ?', [updatedPatientStatus, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Status do paciente atualizado com sucesso.' });
    }
  });
};

// Operação de leitura específica (get one patient status)
exports.getOnePatientStatus = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Patient_Status WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Status do paciente não encontrado.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Operação de exclusão (delete patient status)
exports.deletePatientStatus = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Patient_Status WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Status do paciente não encontrado.' });
    } else {
      res.status(200).json({ message: 'Status do paciente excluído com sucesso.' });
    }
  });
};
