const express = require('express');
const router = express.Router();
const { getClientes, addCliente, updateCliente, deleteCliente } = require('../controllers/clientesController');
const { cacheMiddleware } = require('../middlewares/cache'); // ✅ certifique-se disso

// ⛔ ERRADO:
router.get('/', getClientes);

// ✅ CERTO:
router.get('/', cacheMiddleware, getClientes);

module.exports = router;