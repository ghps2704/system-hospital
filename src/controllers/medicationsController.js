const db = require('../db');

const handleErrors = (res, err, errorMessage) => {
  console.error(err);
  res.status(500).json({ error: errorMessage });
};

exports.getAllMedications = (req, res) => {
  db.query('SELECT * FROM Medication', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.createMedication = async (req, res) => {
  try {
    const { id, name, description, stock_quantity } = req.body;

    const query = 'INSERT INTO Medication (id, name, description, stock_quantity) VALUES (?, ?, ?, ?)';
    const values = [id, name, description, stock_quantity];

    const [result] = await db.promise().execute(query, values);
    console.log('Resultado do INSERT:', result);

    res.status(201).json({ id: result.insertId, name, stock_quantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar um novo remédio.' });
  }
};

exports.updateMedication = async (req, res) => {
  try {
    const { id, name, description, stock_quantity } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'O ID da medicação é obrigatório e deve ser um número.' });
    }

    const updateFields = [];
    const values = [];

    if (name) {
      updateFields.push('name = ?');
      values.push(name);
    }

    if (description) {
      updateFields.push('description = ?');
      values.push(description);
    }

    if (!isNaN(stock_quantity)) {
      updateFields.push('stock_quantity = ?');
      values.push(stock_quantity);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    const updateQuery = `UPDATE Medication SET ${updateFields.join(', ')} WHERE id = ?`;
    values.push(id);

    const [result] = await db.promise().execute(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Medicação não encontrada para atualização.' });
    }

    res.status(200).json({ message: 'Medicação atualizada com sucesso.', updatedMedicationId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a medicação.' });
  }
};

exports.deleteMedication = async (req, res) => {
  try {
    const { medicationId } = req.params;

    if (!medicationId || isNaN(medicationId)) {
      return res.status(400).json({ error: 'O ID da medicação é obrigatório e deve ser um número.' });
    }

    const deleteQuery = 'DELETE FROM Medication WHERE id = ?';
    const [result] = await db.promise().execute(deleteQuery, [medicationId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Medicação não encontrada para exclusão.' });
    }

    res.status(200).json({ message: 'Medicação excluída com sucesso.', deletedMedicationId: medicationId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a medicação.' });
  }
};