const db = require('../db');

const handleErrors = (res, err, errorMessage) => {
  console.error(err);
  res.status(500).json({ error: errorMessage });
};

exports.getAllPatientStatus = (req, res) => {
  db.query('SELECT * FROM Patient_Status', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.createPatientStatus = async (req, res) => {
  try {
    const { id, nurse_id, patient_name, status, last_updated } = req.body;

    const query = 'INSERT INTO Patient_Status (id, nurse_id, patient_name, status, last_updated) VALUES (?, ?, ?, ?, ?)';
    const values = [id, nurse_id, patient_name, status, last_updated];

    const [result] = await db.promise().execute(query, values);
    console.log('Resultado do INSERT:', result);

    res.status(201).json({ id: result.insertId, patient_name, status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar um novo status de Paciente.'});
  }
};

exports.updatePatientStatus = async (req, res) => {
  try {
    const { id, nurse_id, patient_name, status, last_updated } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'O ID do status do paciente é obrigatório e deve ser um número.' });
    }

    const updateFields = [];
    const values = [];

    if (nurse_id) {
      updateFields.push('nurse_id = ?');
      values.push(nurse_id);
    }

    if (patient_name) {
      updateFields.push('patient_name = ?');
      values.push(patient_name);
    }

    if (status) {
      updateFields.push('status = ?');
      values.push(status);
    }

    if (last_updated) {
      updateFields.push('last_updated = ?');
      values.push(last_updated);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    const updateQuery = `UPDATE Patient_Status SET ${updateFields.join(', ')} WHERE id = ?`;
    values.push(id);

    const [result] = await db.promise().execute(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Status do paciente não encontrado para atualização.' });
    }

    res.status(200).json({ message: 'Status do paciente atualizado com sucesso.', updatedPatientStatusId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o status do paciente.' });
  }
};