const { Router } = require('express');

const router = Router();

const CategoryController = require('./app/controllers/CategoryController');

router.get('/', (request, response) => response.json('Funcionou !'));

// Rotas de Categorias
router.get('/category', CategoryController.index);

module.exports = router;
