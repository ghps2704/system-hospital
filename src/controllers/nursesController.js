const db = require('../db');

const handleErrors = (res, err, errorMessage) => {
  console.error(err);
  res.status(500).json({ error: errorMessage });
};

exports.getAllNurses = (req, res) => {
  db.query('SELECT * FROM Nurse', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.createNurse = async (req, res) => {
  try {
    const { user_id, name, qualification } = req.body;

    const query = 'INSERT INTO Nurse (user_id, name, qualification) VALUES (?, ?, ?)';
    const values = [user_id, name, qualification];

    const [result] = await db.promise().execute(query, values);
    console.log('Resultado do INSERT:', result);

    res.status(201).json({ id: result.insertId, name, qualification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar uma enfermeira.' });
  }
};

exports.updateNurse = async (req, res) => {
  try {
    const { user_id, name, qualification } = req.body;

    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'O ID da enfermeira é obrigatório e deve ser um número.' });
    }

    const updateFields = [];
    const values = [];

    if (name) {
      updateFields.push('name = ?');
      values.push(name);
    }

    if (qualification) {
      updateFields.push('qualification = ?');
      values.push(qualification);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    const updateQuery = `UPDATE Nurse SET ${updateFields.join(', ')} WHERE user_id = ?`;
    values.push(user_id);

    const [result] = await db.promise().execute(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enfermeira não encontrada para atualização.' });
    }

    res.status(200).json({ message: 'Enfermeira atualizada com sucesso.', updatedNurseId: user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a enfermeira.' });
  }
};

exports.deleteNurse = async (req, res) => {
  try {
    const { nurseId } = req.params;

    if (!nurseId || isNaN(nurseId)) {
      return res.status(400).json({ error: 'O ID da enfermeira é obrigatório e deve ser um número.' });
    }

    const deleteQuery = 'DELETE FROM Nurse WHERE user_id = ?';
    const [result] = await db.promise().execute(deleteQuery, [nurseId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enfermeira não encontrada para exclusão.' });
    }

    res.status(200).json({ message: 'Enfermeira excluída com sucesso.', deletedNurseId: nurseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a enfermeira.' });
  }
};