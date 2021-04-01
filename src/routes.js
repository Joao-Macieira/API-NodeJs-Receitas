const { Router } = require('express');

const router = Router();

const CategoryController = require('./app/controllers/CategoryController');
const UserController = require('./app/controllers/UserController');

router.get('/', (request, response) => response.json('Funcionou !'));

// Rotas de Categorias
router.get('/category', CategoryController.index);

// Rotas de Usuários
router.get('/users', UserController.index);
router.post('/user', UserController.store);

module.exports = router;
