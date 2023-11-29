const db = require('../db');

// Create (Criação)
exports.createAdmin = (req, res) => {
  const { user_id, name, contact_info } = req.body;

  db.query(
    'INSERT INTO Admin (user_id, name, contact_info) VALUES (?, ?, ?)',
    [user_id, name, contact_info],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar um novo administrador.' });
      } else {
        res.status(201).json({ message: 'Administrador criado com sucesso.', adminId: result.insertId });
      }
    }
  );
};

// Read (Leitura)
exports.getAllAdmins = (req, res) => {
  db.query('SELECT * FROM Admin', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao obter os administradores.' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getAdminById = (req, res) => {
  const adminId = req.params.id;

  db.query('SELECT * FROM Admin WHERE user_id = ?', [adminId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao obter o administrador.' });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'Administrador não encontrado.' });
      }
    }
  });
};

// Update (Atualização)
exports.updateAdmin = (req, res) => {
  const adminId = req.params.id;
  const { name, contact_info } = req.body;

  db.query(
    'UPDATE Admin SET name = ?, contact_info = ? WHERE user_id = ?',
    [name, contact_info, adminId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar o administrador.' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Administrador atualizado com sucesso.' });
        } else {
          res.status(404).json({ message: 'Administrador não encontrado.' });
        }
      }
    }
  );
};

// Delete (Exclusão)
exports.deleteAdmin = (req, res) => {
  const adminId = req.params.id;

  db.query('DELETE FROM Admin WHERE user_id = ?', [adminId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao excluir o administrador.' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Administrador excluído com sucesso.' });
      } else {
        res.status(404).json({ message: 'Administrador não encontrado.' });
      }
    }
  });
};
