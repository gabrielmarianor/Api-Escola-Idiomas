const express = require('express');
const db = require('../config/db');

const router = express.Router();

function erroBanco(res, err) {
  console.error('Erro de banco:', err.code || err.message);
  const indisponivel = ['ECONNREFUSED', 'PROTOCOL_CONNECTION_LOST', 'ER_ACCESS_DENIED_ERROR', 'ER_BAD_DB_ERROR', 'ETIMEDOUT', 'ENOTFOUND'];
  if (indisponivel.includes(err.code)) {
    return res.status(503).json({ erro: 'Banco de dados indisponível', detalhe: err.code });
  }
  return res.status(500).json({ erro: 'Erro ao executar operação no banco', detalhe: err.code || err.message });
}

function validar(body) {
  const campos = ['nome', 'idioma', 'nivel'];
  return campos.filter((c) => typeof body[c] !== 'string' || body[c].trim() === '');
}

function idValido(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

// GET /estudante - lista todos
router.get('/', (req, res) => {
  db.query('SELECT id, nome, idioma, nivel FROM estudante ORDER BY id', (err, rows) => {
    if (err) return erroBanco(res, err);
    res.status(200).json(rows);
  });
});

// GET /estudante/:id - busca um
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido' });

  db.query('SELECT id, nome, idioma, nivel FROM estudante WHERE id = ?', [id], (err, rows) => {
    if (err) return erroBanco(res, err);
    if (rows.length === 0) return res.status(404).json({ erro: 'Estudante não encontrado' });
    res.status(200).json(rows[0]);
  });
});

// POST /estudante - cria
router.post('/', (req, res) => {
  const faltando = validar(req.body);
  if (faltando.length) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes ou inválidos', campos: faltando });
  }
  const nome = req.body.nome.trim();
  const idioma = req.body.idioma.trim();
  const nivel = req.body.nivel.trim();

  db.query('INSERT INTO estudante (nome, idioma, nivel) VALUES (?, ?, ?)', [nome, idioma, nivel], (err, result) => {
    if (err) return erroBanco(res, err);
    res.status(201).json({
      mensagem: 'Estudante criado com sucesso',
      estudante: { id: result.insertId, nome, idioma, nivel }
    });
  });
});

// PUT /estudante/:id - atualiza
router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido' });

  const faltando = validar(req.body);
  if (faltando.length) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes ou inválidos', campos: faltando });
  }
  const nome = req.body.nome.trim();
  const idioma = req.body.idioma.trim();
  const nivel = req.body.nivel.trim();

  db.query('UPDATE estudante SET nome = ?, idioma = ?, nivel = ? WHERE id = ?', [nome, idioma, nivel, id], (err, result) => {
    if (err) return erroBanco(res, err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Estudante não encontrado' });
    res.status(200).json({
      mensagem: 'Estudante atualizado com sucesso',
      estudante: { id: Number(id), nome, idioma, nivel }
    });
  });
});

// DELETE /estudante/:id - remove
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido' });

  db.query('DELETE FROM estudante WHERE id = ?', [id], (err, result) => {
    if (err) return erroBanco(res, err);
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Estudante não encontrado' });
    res.status(200).json({ mensagem: 'Estudante removido com sucesso' });
  });
});

module.exports = router;
