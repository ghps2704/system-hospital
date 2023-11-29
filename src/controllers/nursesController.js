const db = require('../db');

// Operação de leitura (get all nurses)
exports.getAllNurses = (req, res) => {
  db.query('SELECT * FROM Nurse', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Operação de criação (create nurse)
exports.createNurse = (req, res) => {
  const { name, shift } = req.body;

  if (!name || !shift) {
    return res.status(400).json({ error: 'Nome e turno são obrigatórios.' });
  }

  const newNurse = { name, shift };

  db.query('INSERT INTO Nurse SET ?', newNurse, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Enfermeiro criado com sucesso.', id: result.insertId });
    }
  });
};

// Operação de atualização (update nurse)
exports.updateNurse = (req, res) => {
  const { id } = req.params;
  const { name, shift } = req.body;

  if (!name || !shift) {
    return res.status(400).json({ error: 'Nome e turno são obrigatórios.' });
  }

  const updatedNurse = { name, shift };

  db.query('UPDATE Nurse SET ? WHERE id = ?', [updatedNurse, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Enfermeiro atualizado com sucesso.' });
    }
  });
};

// Operação de leitura específica (get one nurse)
exports.getOneNurse = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Nurse WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Enfermeiro não encontrado.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Operação de exclusão (delete nurse)
exports.deleteNurse = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Nurse WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Enfermeiro não encontrado.' });
    } else {
      res.status(200).json({ message: 'Enfermeiro excluído com sucesso.' });
    }
  });
};
