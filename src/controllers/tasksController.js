const db = require('../db');

// Operação de leitura (get all tasks)
exports.getAllTasks = (req, res) => {
  db.query('SELECT * FROM Task', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Operação de criação (create task)
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ error: 'Título, descrição e status são obrigatórios.' });
  }

  const newTask = { title, description, status };

  db.query('INSERT INTO Task SET ?', newTask, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Tarefa criada com sucesso.', id: result.insertId });
    }
  });
};

// Operação de atualização (update task)
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ error: 'Título, descrição e status são obrigatórios.' });
  }

  const updatedTask = { title, description, status };

  db.query('UPDATE Task SET ? WHERE id = ?', [updatedTask, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });
    }
  });
};

// Operação de leitura específica (get one task)
exports.getOneTask = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Task WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Tarefa não encontrada.' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

// Operação de exclusão (delete task)
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Task WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Tarefa não encontrada.' });
    } else {
      res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
    }
  });
};
