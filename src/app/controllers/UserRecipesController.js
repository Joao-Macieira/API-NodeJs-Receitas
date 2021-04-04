const Recipes = require('../models/Recipes');
const User = require('../models/User');

class UserRecipesController {
  async index(request, response) {
    const { categoria } = request.query;

    const { userId } = request;

    const userExists = await User.findById(userId);

    if (!userExists) return response.json({ error: 'requisição inválida' });

    const myRecipes = await Recipes.findByUserId(userId, categoria);

    return response.json(myRecipes);
  }
}

module.exports = new UserRecipesController();
