const express = require('express');
const router = express.Router();

// Importa o controller com as funções do CRUD
const {
  getClientes,
  addCliente,
  updateCliente,
  deleteCliente
} = require('../controllers/clientesController');

// Importa o middleware de cache
const { cacheMiddleware } = require('../middlewares/cache');

// ✅ Rota GET com cache ativado
router.get('/', cacheMiddleware, getClientes);

// Outras rotas sem cache (POST, PUT, DELETE)
router.post('/', addCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

module.exports = router;
