const db = require('../db');

// Operação de leitura (get all medications)
exports.getAllMedications = (req, res) => {
  db.query('SELECT * FROM Medication', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Operação de criação (create medication)
exports.createMedication = (req, res) => {
  const { name, dosage } = req.body;

  if (!name || !dosage) {
    return res.status(400).json({ error: 'Nome e dosagem são obrigatórios.' });
  }

  const newMedication = { name, dosage };

  db.query('INSERT INTO Medication SET ?', newMedication, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Medicamento criado com sucesso.', id: result.insertId });
    }
  });
};

// Operação de atualização (update medication)
exports.updateMedication = (req, res) => {
  const { id } = req.params;
  const { name, dosage } = req.body;

  if (!name || !dosage) {
    return res.status(400).json({ error: 'Nome e dosagem são obrigatórios.' });
  }

  const updatedMedication = { name, dosage };

  db.query('UPDATE Medication SET ? WHERE id = ?', [updatedMedication, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Medicamento atualizado com sucesso.' });
    }
  });
};

// Operação de leitura específica (get one medication)
exports.getOneMedication = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Medication WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Medicamento não encontrado.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Operação de exclusão (delete medication)
exports.deleteMedication = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Medication WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Medicamento não encontrado.' });
    } else {
      res.status(200).json({ message: 'Medicamento excluído com sucesso.' });
    }
  });
};
