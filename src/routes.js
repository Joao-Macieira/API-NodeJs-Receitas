const { Router } = require('express');

const router = Router();

const CategoryController = require('./app/controllers/CategoryController');
const LoginController = require('./app/controllers/LoginController');
const RecipesController = require('./app/controllers/RecipesController');
const UserController = require('./app/controllers/UserController');
const UserRecipesController = require('./app/controllers/UserRecipesController');

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
router.post('/recipe', loginRequired, RecipesController.store);
router.get('/recipe/:id', loginRequired, RecipesController.show);
router.put('/recipe/:id', loginRequired, RecipesController.update);
router.delete('/recipe/:id', loginRequired, RecipesController.delete);

// Rotas User-Recipes
router.get('/myrecipes', loginRequired, UserRecipesController.index);

module.exports = router;
