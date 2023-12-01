const db = require('../db');

const handleErrors = (res, err, errorMessage) => {
  console.error(err);
  res.status(500).json({ error: errorMessage });
};

exports.getAllDoctors = (req, res) => {
  db.query('SELECT * FROM Doctor', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.createDoctors = async (req, res) => {
  try {
    const { user_id, name, specialization, CRM } = req.body;

    const query = 'INSERT INTO Doctor (user_id, name, specialization, CRM) VALUES (?, ?, ?, ?)';
    const values = [user_id, name, specialization, CRM];

    const [result] = await db.promise().execute(query, values);
    console.log('Resultado do INSERT:', result);

    res.status(201).json({ id: result.insertId, name, CRM });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar um novo doutor.' });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { user_id, name, specialization, CRM } = req.body;

    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'O ID do médico é obrigatório e deve ser um número.' });
    }

    const updateFields = [];
    const values = [];

    if (name) {
      updateFields.push('name = ?');
      values.push(name);
    }

    if (specialization) {
      updateFields.push('specialization = ?');
      values.push(specialization);
    }

    if (CRM) {
      updateFields.push('CRM = ?');
      values.push(CRM);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    const updateQuery = `UPDATE Doctor SET ${updateFields.join(', ')} WHERE user_id = ?`;
    values.push(user_id);

    const [result] = await db.promise().execute(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Médico não encontrado para atualização.' });
    }

    res.status(200).json({ message: 'Médico atualizado com sucesso.', updatedDoctorId: user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o médico.' });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId || isNaN(doctorId)) {
      return res.status(400).json({ error: 'O ID do médico é obrigatório e deve ser um número.' });
    }

    const deleteQuery = 'DELETE FROM Doctor WHERE user_id = ?';
    const [result] = await db.promise().execute(deleteQuery, [doctorId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Médico não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Médico excluído com sucesso.', deletedDoctorId: doctorId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o médico.' });
  }
};