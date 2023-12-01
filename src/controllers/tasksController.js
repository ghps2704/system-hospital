const express = require('express');
const db = require('../db');

const handleErrors = (res, err, errorMessage) => {
  console.error(err);
  res.status(500).json({ error: errorMessage });
};

exports.getAllTasks = (req, res) => {
  db.query('SELECT * FROM Task', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.createTasks = async (req, res) => {
  try {
    const { id, doctor_id, description, status, due_date } = req.body;

    const query = 'INSERT INTO Task (id, doctor_id, description, status, due_date) VALUES (?, ?, ?, ?, ?)';
    const values = [id, doctor_id, description, status, due_date];

    const [result] = await db.promise().execute(query, values);
    console.log('Resultado do INSERT:', result);

    res.status(201).json({ id: result.insertId, description, status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar uma tarefa.' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, doctor_id, description, status, due_date } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'O ID da tarefa é obrigatório e deve ser um número.' });
    }

    const dueDate = new Date(due_date);
    
    if (isNaN(dueDate.getTime())) {
      return res.status(400).json({ error: 'A data fornecida não é válida.' });
    }

    const formattedDueDate = dueDate.toISOString().split('T')[0];

    const query = 'UPDATE Task SET doctor_id = ?, description = ?, status = ?, due_date = ? WHERE id = ?';
    const values = [doctor_id, description, status, formattedDueDate, id];

    const [result] = await db.promise().execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada para atualização.' });
    }

    res.status(200).json({ message: 'Tarefa atualizada com sucesso.', updatedTaskId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({ error: 'O ID da tarefa é obrigatório e deve ser um número.' });
    }

    const deleteQuery = 'DELETE FROM Task WHERE id = ?';
    const [result] = await db.promise().execute(deleteQuery, [taskId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada para exclusão.' });
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso.', deletedTaskId: taskId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a tarefa.' });
  }
};