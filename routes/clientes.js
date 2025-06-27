const express = require('express');
const router = express.Router();
const { getClientes, addCliente, updateCliente, deleteCliente } = require('../controllers/clientesController');
const { cacheMiddleware } = require('../middlewares/cache'); // 

router.get('/', cacheMiddleware, getClientes); 

router.post('/', addCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

module.exports = router;
