const db = require('../db');

// Operação de leitura (get all doctors)
exports.getAllDoctors = (req, res) => {
  db.query('SELECT * FROM Doctor', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Operação de criação (create doctor)
exports.createDoctor = (req, res) => {
  const { name, specialty } = req.body;

  if (!name || !specialty) {
    return res.status(400).json({ error: 'Nome e especialidade são obrigatórios.' });
  }

  const newDoctor = { name, specialty };

  db.query('INSERT INTO Doctor SET ?', newDoctor, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Médico criado com sucesso.', id: result.insertId });
    }
  });
};

// Operação de atualização (update doctor)
exports.updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, specialty } = req.body;

  if (!name || !specialty) {
    return res.status(400).json({ error: 'Nome e especialidade são obrigatórios.' });
  }

  const updatedDoctor = { name, specialty };

  db.query('UPDATE Doctor SET ? WHERE id = ?', [updatedDoctor, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Médico atualizado com sucesso.' });
    }
  });
};

// Operação de leitura específica (get one doctor)
exports.getOneDoctor = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Doctor WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Médico não encontrado.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Operação de exclusão (delete doctor)
exports.deleteDoctor = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Doctor WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Médico não encontrado.' });
    } else {
      res.status(200).json({ message: 'Médico excluído com sucesso.' });
    }
  });
};
