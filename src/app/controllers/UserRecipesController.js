const Recipes = require('../models/Recipes');
const User = require('../models/User');

class UserRecipesController {
  async index(request, response) {
    const { login } = request.query;

    const userExists = await User.findByLogin(login);

    if (!userExists) return response.json({ error: 'requisição inválida' });

    const myRecipes = await Recipes.findByLogin(login);

    console.log(myRecipes);

    return 0;
  }
}

module.exports = new UserRecipesController();
