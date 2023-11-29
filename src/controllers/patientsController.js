const db = require('../db');

// Operação de leitura (get all patients)
exports.getAllPatients = (req, res) => {
  db.query('SELECT * FROM Patient', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Operação de criação (create patient)
exports.createPatient = (req, res) => {
  const { name, age, diagnosis } = req.body;

  if (!name || !age || !diagnosis) {
    return res.status(400).json({ error: 'Nome, idade e diagnóstico são obrigatórios.' });
  }

  const newPatient = { name, age, diagnosis };

  db.query('INSERT INTO Patient SET ?', newPatient, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Paciente criado com sucesso.', id: result.insertId });
    }
  });
};

// Operação de atualização (update patient)
exports.updatePatient = (req, res) => {
  const { id } = req.params;
  const { name, age, diagnosis } = req.body;

  if (!name || !age || !diagnosis) {
    return res.status(400).json({ error: 'Nome, idade e diagnóstico são obrigatórios.' });
  }

  const updatedPatient = { name, age, diagnosis };

  db.query('UPDATE Patient SET ? WHERE id = ?', [updatedPatient, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Paciente atualizado com sucesso.' });
    }
  });
};

// Operação de leitura específica (get one patient)
exports.getOnePatient = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Patient WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Paciente não encontrado.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Operação de exclusão (delete patient)
exports.deletePatient = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Patient WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Paciente não encontrado.' });
    } else {
      res.status(200).json({ message: 'Paciente excluído com sucesso.' });
    }
  });
};
