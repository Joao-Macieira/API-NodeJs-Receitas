const Recipes = require('../models/Recipes');

class RecipesController {
  async index(request, response) {
    const recipes = await Recipes.findAll();

    return response.json(recipes);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!id) return response.status(400);

    const recipe = await Recipes.findById(id);

    if (recipe.length === 0) {
      return response.json({ error: 'Receita não encontrada' });
    }

    return response.json(recipe);
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

    if (!method) return response.json({ error: 'Descreva como preparar sua receita' });

    const createdAt = new Date();

    const recipe = await Recipes.create(
      userId, categoryId, name, preparationTime, portions, method, ingredients, createdAt,
    );

    const newRecipe = await Recipes.findById(recipe.insertId);

    return response.json(newRecipe);
  }

  async update(request, response) {
    const {
      userId,
      categoryId,
      name,
      preparationTime,
      portions,
      method,
      ingredients,
    } = request.body;

    const { id } = request.params;

    const updatedAt = new Date();

    if (!id) return response.status(400);

    const recipeExists = await Recipes.findById(id);

    if (recipeExists.length === 0) return response.json({ error: 'Receita não encontrada' });

    if (!userId) return response.json({ error: 'Dados inválidos' });

    if (!categoryId) return response.json({ error: 'Selecione a categoria da sua receita' });

    if (!method) return response.json({ error: 'Descreva como preparar sua receita' });

    await Recipes.update(
      id, userId, categoryId, name, preparationTime, portions, method, ingredients, updatedAt,
    );

    const newRecipe = await Recipes.findById(id);

    return response.json(newRecipe);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) return response.status(400);

    const recipeExists = await Recipes.findById(id);

    if (recipeExists.length === 0) return response.json({ error: 'Receita não encontrada' });

    await Recipes.delete(id);

    return response.json({ success: 'Receita excluída com sucesso' });
  }
}

module.exports = new RecipesController();
