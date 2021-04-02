const Recipes = require('../models/Recipes');

class RecipesController {
  async index(request, response) {
    const recipes = await Recipes.findAll();

    return response.json({ recipes });
  }

  async store(request, response) {
    const {
      userId,
      categoryId,
      name,
      preparationTime,
      portions,
      method,
      ingredients,
    } = request.body;

    if (!userId) return response.json({ error: 'Dados inválidos' });

    if (!categoryId) return response.json({ error: 'Selecione a categoria da sua receita' });

    if (!method) return response.json({ error: 'Descreva coo preparar sua receita' });

    const newRecipe = await Recipes.create(
      userId, categoryId, name, preparationTime, portions, method, ingredients,
    );

    return response.json({ newRecipe });
  }
}

module.exports = new RecipesController();
