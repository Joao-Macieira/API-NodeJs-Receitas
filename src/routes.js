const { Router } = require('express');

const router = Router();

const CategoryController = require('./app/controllers/CategoryController');
const LoginController = require('./app/controllers/LoginController');
const RecipesController = require('./app/controllers/RecipesController');
const UserController = require('./app/controllers/UserController');

const loginRequired = require('./app/Middleware/loginRequired');

router.get('/', (request, response) => response.json('Funcionou !'));

// Rotas de Login
router.post('/login', LoginController.index);

// Rotas de Categorias
router.get('/category', CategoryController.index);

// Rotas de Usuários
router.get('/users', UserController.index);
router.post('/user', UserController.store);

// Rotas de Receitas
router.get('/recipes', RecipesController.index);
router.post('/recipe', RecipesController.store);
router.get('/recipe/:id', loginRequired, RecipesController.show);
router.put('/recipe/:id', RecipesController.update);
router.delete('/recipe/:id', RecipesController.delete);

module.exports = router;
