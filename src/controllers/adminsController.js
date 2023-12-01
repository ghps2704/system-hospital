// adminCrudController.js
const db = require('../db');

const handleErrors = (res, err, errorMessage) => {
  console.error(err);
  res.status(500).json({ error: errorMessage });
};

// Read (Leitura)
exports.getAllAdmins = (req, res) => {
  db.query('SELECT * FROM Admin', (err, results)=> {
    if(err){
      res.status(500).json({error: err.message});
    }else{
      res.status(200).json(results);
    }
 })
};

exports.createAdmins = async (req, res) => {
  try {
    const { user_id, name, contact_info } = req.body;

    const query = 'INSERT INTO Admin (user_id, name, contact_info) VALUES (?, ?, ?)';
    const values = [user_id, name, contact_info];

    const [result] = await db.promise().execute(query, values);
    console.log('Resultado do INSERT:', result);

    res.status(201).json({ id: result.insertId, name, contact_info });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar um novo administrador.' });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { user_id, name, contact_info } = req.body;

    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ error: 'O ID do administrador é obrigatório e deve ser um número.' });
    }

    const updateFields = [];
    const values = [];

    if (name) {
      updateFields.push('name = ?');
      values.push(name);
    }

    if (contact_info) {
      updateFields.push('contact_info = ?');
      values.push(contact_info);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo fornecido para atualização.' });
    }

    const updateQuery = `UPDATE Admin SET ${updateFields.join(', ')} WHERE user_id = ?`;
    values.push(user_id);

    const [result] = await db.promise().execute(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Administrador não encontrado para atualização.' });
    }

    res.status(200).json({ message: 'Administrador atualizado com sucesso.', updatedAdminId: user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o administrador.' });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    if (!adminId || isNaN(adminId)) {
      return res.status(400).json({ error: 'O ID do administrador é obrigatório e deve ser um número.' });
    }

    const deleteQuery = 'DELETE FROM Admin WHERE user_id = ?';
    const [result] = await db.promise().execute(deleteQuery, [adminId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Administrador não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Administrador excluído com sucesso.', deletedAdminId: adminId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o administrador.' });
  }
};